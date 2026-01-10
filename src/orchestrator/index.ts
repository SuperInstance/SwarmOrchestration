/**
 * Swarm Orchestrator - Main entry point
 */

import Fastify from 'fastify';
import websocket from '@fastify/websocket';
import cors from '@fastify/cors';
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty'
  } : undefined
});

const fastify = Fastify({
  logger: logger as any,
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT || '3000', 10)
});

async function main() {
  await fastify.register(cors);
  await fastify.register(websocket);

  fastify.get('/health', async () => ({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  }));

  fastify.register((instance, opts, done) => {
    instance.get('/agents', async () => ({
      agents: [],
      total: 0,
      active: 0
    }));
    done();
  }, { prefix: '/api' });

  fastify.register(async function (fastify) {
    fastify.get('/ws', { websocket: true }, (connection, req) => {
      connection.socket.on('message', (message) => {
        connection.socket.send(JSON.stringify({
          type: 'echo',
          data: message.toString()
        }));
      });
    });
  });

  try {
    await fastify.listen({
      port: fastify.port,
      host: fastify.host
    });
    fastify.log.info(`Swarm Orchestrator listening on ${fastify.host}:${fastify.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
