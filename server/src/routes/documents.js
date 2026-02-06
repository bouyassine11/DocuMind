import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import Document from '../models/Document.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and text files are allowed'), false);
    }
  }
});

// Upload document
router.post('/upload', authenticateToken, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let content = '';
    
    // Extract text based on file type
    if (req.file.mimetype === 'application/pdf') {
      const pdfData = await pdfParse(req.file.buffer);
      content = pdfData.text;
    } else if (req.file.mimetype === 'text/plain') {
      content = req.file.buffer.toString('utf-8');
    }

    if (!content.trim()) {
      return res.status(400).json({ error: 'Could not extract text from document' });
    }

    const document = new Document({
      title: req.body.title || req.file.originalname,
      filename: req.file.originalname,
      content,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      userId: req.user.id
    });

    await document.save();
    res.status(201).json({ message: 'Document uploaded successfully', document });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

// Get user's documents
router.get('/', authenticateToken, async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user.id })
      .select('-content')
      .sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Get specific document
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    res.json(document);
  } catch (error) {
    console.error('Get document error:', error);
    res.status(500).json({ error: 'Failed to fetch document' });
  }
});

// Delete document
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const document = await Document.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Delete document error:', error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

export default router;