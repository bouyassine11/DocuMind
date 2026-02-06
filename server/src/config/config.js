import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/documind',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default_jwt_secret_change_in_production',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    baseUrl: process.env.BASE_URL || 'http://localhost:5000'
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY
  },
  huggingface: {
    apiKey: process.env.HUGGINGFACE_API_KEY
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY
  }
};
