const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'MyMath MCP Service',
    timestamp: new Date().toISOString()
  });
});

// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    // Simulate AI response for now
    const responses = {
      student: [
        'مرحباً! كيف يمكنني مساعدتك في دراسة الرياضيات اليوم؟',
        'هل تحتاج مساعدة في حل مسألة معينة؟',
        'يمكنني شرح أي مفهوم رياضي تجده صعباً.'
      ],
      teacher: [
        'مرحباً أستاذ! كيف يمكنني مساعدتك في إدارة فصلك؟',
        'هل تريد اقتراحات لأنشطة تعليمية جديدة؟',
        'يمكنني مساعدتك في إعداد خطط الدروس.'
      ],
      admin: [
        'مرحباً! كيف يمكنني مساعدتك في إدارة المنصة؟',
        'هل تحتاج تقارير عن أداء الطلاب أو المدرسين؟',
        'يمكنني تحليل البيانات وتقديم إحصائيات مفيدة.'
      ]
    };
    
    const contextResponses = responses[context] || responses.student;
    const randomResponse = contextResponses[Math.floor(Math.random() * contextResponses.length)];
    
    res.json({
      success: true,
      response: randomResponse,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'حدث خطأ في الخدمة'
    });
  }
});

// Math problem solver endpoint
app.post('/api/solve', async (req, res) => {
  try {
    const { problem, type } = req.body;
    
    // Simulate math problem solving
    const solutions = {
      algebra: 'الحل: x = 5',
      geometry: 'المساحة = 25 متر مربع',
      calculus: 'المشتقة = 2x + 3'
    };
    
    res.json({
      success: true,
      solution: solutions[type] || 'يرجى تحديد نوع المسألة',
      steps: [
        'الخطوة 1: تحديد المعطيات',
        'الخطوة 2: تطبيق القانون المناسب',
        'الخطوة 3: الحصول على النتيجة'
      ],
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in solve endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'حدث خطأ في حل المسألة'
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🤖 MCP Service running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;

