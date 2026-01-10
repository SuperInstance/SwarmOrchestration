/**
 * Swarm Worker - Agent worker entry point
 */

import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty'
  } : undefined
});

async function main() {
  logger.info('Swarm Worker starting...');

  const workerId = `worker-${process.pid}-${Date.now()}`;
  logger.info({ workerId }, 'Worker initialized');

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);

  logger.info('Worker ready');
}

async function gracefulShutdown() {
  logger.info('Shutting down gracefully...');
  process.exit(0);
}

main().catch((err) => {
  logger.error(err);
  process.exit(1);
});
