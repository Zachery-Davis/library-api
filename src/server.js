import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swagger from 'swagger-ui-express';
import YAML from 'yamljs';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: 'https://library-api-mz6y.onrender.com',
  })
);
app.use(express.json());
app.use(morgan('tiny'));

const specs = YAML.load('./public/bundled.yaml');
app.use('/api-docs', swagger.serve, swagger.setup(specs));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/books', bookRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
