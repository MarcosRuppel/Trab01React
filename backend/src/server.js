import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import 'dotenv/config';

// Import routes
import userRoutes from './routes/users.routes.js';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // serve arquivos

// Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
