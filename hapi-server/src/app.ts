import { connectDB } from './config/db.js';
import { createServer } from './server.js';

async function bootstrap(): Promise<void> {
  await connectDB();

  const server = await createServer();
  await server.start();

  console.log(`Server running on ${server.info.uri}`);
  console.log(`Swagger docs: ${server.info.uri}/documentation`);

  process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
    process.exit(1);
  });

  process.on('SIGINT', async () => {
    await server.stop({ timeout: 10000 });
    console.log('Server stopped');
    process.exit(0);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
