import app from "./app.js";
import config from "./config/config.js";

const startServer = () => {
  try {
    app.listen(config.port, () => {
      console.log(`✅ Server running on port ${config.port}`);
      console.log(`🌍 Environment: ${config.nodeEnv}`);
      console.log(`💾 Database: ${config.mongodb.uri}`);
      console.log(`🔐 CORS Origin: ${config.cors.origin}`);
      
      if (config.google.clientId) {
        console.log('✅ Google OAuth configured');
      } else {
        console.log('⚠️  Google OAuth not configured');
      }
      
      if (config.huggingface.apiKey) {
        console.log('✅ Hugging Face configured');
      } else {
        console.log('⚠️  Hugging Face not configured - AI chat will not work');
      }
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
};

startServer();
