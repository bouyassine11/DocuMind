import express from 'express';
import { OpenAI } from 'openai';
import Document from '../models/Document.js';
import Chat from '../models/Chat.js';
import { authenticateToken } from '../middleware/auth.js';
import config from '../config/config.js';

const router = express.Router();

// Initialize OpenAI client with Hugging Face router
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: config.huggingface.apiKey,
});

// Call Qwen API using OpenAI SDK
const callQwenAPI = async (messages) => {
  try {
    console.log('Sending request to Qwen API via HF router...');
    
    const chatCompletion = await client.chat.completions.create({
      model: "Qwen/Qwen3-Coder-Next-FP8:together",
      messages: messages,
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 0.9,
    });
    
    console.log('API Response received');
    
    const responseMessage = chatCompletion.choices[0].message;
    return responseMessage.content;
    
  } catch (error) {
    console.error('API call error:', error.message);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    throw error;
  }
};

// Format messages for chat completion
const formatChatMessages = (conversationHistory, userMessage, document) => {
  const messages = [
    {
      role: "system",
      content: `You are a helpful assistant answering questions about documents. The current document is titled "${document.title}" (${document.fileType || 'file'}). 

Document Details:
- Type: ${document.fileType || 'Not specified'}
- Size: ${document.fileSize || 'Not specified'}
- Uploaded: ${document.uploadDate ? new Date(document.uploadDate).toLocaleDateString() : 'Recently'}

FULL DOCUMENT CONTENT:
${document.content}

Please provide helpful, accurate responses based on the document content above. If you cannot answer based on the available information, politely say so.`
    }
  ];
  
  // Add conversation history
  if (conversationHistory && conversationHistory.length > 0) {
    conversationHistory.forEach(msg => {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    });
  }
  
  // Add current user message
  messages.push({
    role: "user",
    content: userMessage
  });
  
  return messages;
};

// Test the model endpoint
const testQwenEndpoint = async () => {
  try {
    console.log('Testing Qwen endpoint...');
    
    const chatCompletion = await client.chat.completions.create({
      model: "Qwen/Qwen3-Coder-Next-FP8:together",
      messages: [
        {
          role: "user",
          content: "Please respond with 'API is working' if you receive this message."
        }
      ],
      max_tokens: 50,
      temperature: 0.1
    });
    
    const response = chatCompletion.choices[0].message;
    console.log('Test successful:', response);
    return { success: true, response: response.content };
    
  } catch (error) {
    console.error('Test error:', error.message);
    return { success: false, error: error.message };
  }
};

// Send message to AI about document
router.post('/:documentId/message', authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;
    const { documentId } = req.params;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Valid message is required' });
    }

    // Get document
    const document = await Document.findOne({
      _id: documentId,
      userId: req.user.id
    });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Get or create chat
    let chat = await Chat.findOne({
      documentId,
      userId: req.user.id
    });

    if (!chat) {
      chat = new Chat({
        documentId,
        userId: req.user.id,
        messages: []
      });
    }

    // Add user message
    chat.messages.push({
      role: 'user',
      content: message.trim(),
      timestamp: new Date()
    });

    // Get conversation history (last 6 messages)
    const conversationHistory = chat.messages.slice(-6, -1);

    // Format messages for chat completion
    const messages = formatChatMessages(conversationHistory, message, document);
    
    console.log('Formatted messages count:', messages.length);

    // Get AI response from Hugging Face
    let aiResponseText = '';
    
    try {
      aiResponseText = await callQwenAPI(messages);
      
      // Clean up the response
      aiResponseText = aiResponseText.trim();
      
      console.log('Response length:', aiResponseText.length);
      
      // Ensure we have a response
      if (!aiResponseText || aiResponseText === '') {
        aiResponseText = `I understand your question about "${document.title}". Based on the document information provided, I'm here to help answer your questions.`;
      }
      
    } catch (apiError) {
      console.error('Hugging Face API error:', apiError);
      
      // Fallback responses based on error type
      if (apiError.message.includes('401') || apiError.message.includes('403')) {
        aiResponseText = `I'm unable to connect to the AI service due to authentication issues. Please check your API key configuration. For now, I can tell you're asking about the document "${document.title}".`;
      } else if (apiError.message.includes('429')) {
        aiResponseText = `The AI service is currently rate-limited. Please try again in a moment. You asked about "${document.title}": "${message}".`;
      } else if (apiError.message.includes('503') || apiError.message.includes('loading')) {
        aiResponseText = `The AI model is currently loading. This usually takes 20-30 seconds. Please try again in a moment.`;
      } else {
        aiResponseText = `I'm experiencing technical difficulties connecting to the AI service. You're asking about the document "${document.title}": "${message}". Please try again shortly.`;
      }
    }

    // Add AI response to chat
    chat.messages.push({
      role: 'assistant',
      content: aiResponseText,
      timestamp: new Date()
    });

    // Save chat (limit messages to prevent infinite growth)
    if (chat.messages.length > 50) {
      chat.messages = chat.messages.slice(-40); // Keep last 40 messages
    }
    
    await chat.save();

    // Return response
    res.json({
      message: aiResponseText,
      chatId: chat._id,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Chat processing error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get chat history for document
router.get('/:documentId/history', authenticateToken, async (req, res) => {
  try {
    const { documentId } = req.params;

    const chat = await Chat.findOne({
      documentId,
      userId: req.user.id
    }).select('messages documentId updatedAt');

    if (!chat) {
      return res.json({ 
        messages: [], 
        documentId,
        exists: false 
      });
    }

    res.json({ 
      messages: chat.messages,
      documentId: chat.documentId,
      updatedAt: chat.updatedAt,
      exists: true
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// Clear chat history
router.delete('/:documentId/history', authenticateToken, async (req, res) => {
  try {
    const { documentId } = req.params;

    const result = await Chat.findOneAndDelete({
      documentId,
      userId: req.user.id
    });

    if (!result) {
      return res.status(404).json({ error: 'No chat history found' });
    }

    res.json({ 
      message: 'Chat history cleared successfully',
      cleared: true
    });
  } catch (error) {
    console.error('Clear chat history error:', error);
    res.status(500).json({ error: 'Failed to clear chat history' });
  }
});

// Test endpoint to verify API connectivity
router.get('/test-model', authenticateToken, async (req, res) => {
  try {
    const testResult = await testQwenEndpoint();
    
    if (testResult.success) {
      res.json({ 
        success: true, 
        message: 'Qwen model endpoint is working',
        response: testResult.response
      });
    } else {
      res.status(502).json({ 
        success: false, 
        message: 'Model endpoint is not accessible',
        error: testResult.error
      });
    }
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Test failed', 
      error: error.message 
    });
  }
});

// Get chat summary or statistics
router.get('/:documentId/summary', authenticateToken, async (req, res) => {
  try {
    const { documentId } = req.params;

    const chat = await Chat.findOne({
      documentId,
      userId: req.user.id
    });

    if (!chat) {
      return res.json({ 
        summary: 'No chat history for this document',
        messageCount: 0,
        lastActivity: null
      });
    }

    const userMessages = chat.messages.filter(msg => msg.role === 'user').length;
    const assistantMessages = chat.messages.filter(msg => msg.role === 'assistant').length;
    const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;

    res.json({
      summary: `Chat contains ${chat.messages.length} messages`,
      messageCount: chat.messages.length,
      userMessages,
      assistantMessages,
      lastActivity: lastMessage ? lastMessage.timestamp : null,
      documentId
    });
  } catch (error) {
    console.error('Get chat summary error:', error);
    res.status(500).json({ error: 'Failed to get chat summary' });
  }
});

export default router;