import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Chat = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchDocument();
    fetchChatHistory();
  }, [documentId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchDocument = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/documents/${documentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDocument(data);
      } else {
        navigate('/documents');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
      navigate('/documents');
    }
  };

  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/chat/${documentId}/history`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    const userMessage = newMessage.trim();
    setNewMessage('');
    setSending(true);

    // Add user message immediately
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/chat/${documentId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: userMessage })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        }]);
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const clearHistory = async () => {
    if (!confirm('Are you sure you want to clear the chat history?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/chat/${documentId}/history`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setMessages([]);
      }
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
          <div className="text-lg font-medium text-gray-700">Loading chat...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-indigo-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className="flex-1">
              <button
                onClick={() => navigate('/documents')}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-2 transition-colors"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Documents
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                {document?.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {messages.length} messages • AI-powered chat
              </p>
            </div>
            <button
              onClick={clearHistory}
              className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear History
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
                <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Start a conversation</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Ask questions, request summaries, or get insights from your document content.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-indigo-100">
                  <p className="text-sm text-gray-700">💡 "Summarize this document"</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-indigo-100">
                  <p className="text-sm text-gray-700">🔍 "What are the key points?"</p>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div className={`flex gap-3 max-w-3xl ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
                      : 'bg-gradient-to-br from-green-400 to-blue-500'
                  }`}>
                    {message.role === 'user' ? (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Message bubble */}
                  <div className={`px-5 py-3 rounded-2xl shadow-md ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-tr-sm'
                      : 'bg-white text-gray-900 rounded-tl-sm border border-gray-100'
                  }`}>
                    {message.role === 'user' ? (
                      <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                    ) : (
                      <div className="prose prose-sm max-w-none leading-relaxed">
                        <ReactMarkdown
                          components={{
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                            em: ({node, ...props}) => <em className="italic" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                            li: ({node, ...props}) => <li className="ml-2" {...props} />,
                            code: ({node, inline, ...props}) => 
                              inline ? 
                                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-indigo-600" {...props} /> :
                                <code className="block bg-gray-100 p-3 rounded-lg text-sm font-mono overflow-x-auto my-2" {...props} />,
                            h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-2" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-2" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-base font-bold mb-2" {...props} />,
                            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2" {...props} />,
                            a: ({node, ...props}) => <a className="text-indigo-600 hover:underline" {...props} />,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    )}
                    <div className={`text-xs mt-2 flex items-center gap-1 ${
                      message.role === 'user' ? 'text-indigo-100' : 'text-gray-500'
                    }`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {sending && (
            <div className="flex justify-start animate-fadeIn">
              <div className="flex gap-3 max-w-3xl">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="bg-white shadow-md border border-gray-100 px-5 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-gray-600 text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-indigo-100 sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <form onSubmit={sendMessage}>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask a question about your document..."
                  disabled={sending}
                  className="w-full px-5 py-3 pr-12 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                disabled={!newMessage.trim() || sending}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span className="hidden sm:inline">Send</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;