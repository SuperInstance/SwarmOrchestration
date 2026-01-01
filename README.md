# Swarm Orchestration

Multi-agent orchestration system for coordinating AI swarms and distributed task execution.

## Overview

Swarm Orchestration is a backend system for managing large-scale AI agent swarms. It provides coordination, load balancing, fault tolerance, and communication patterns for distributed agent systems.

### Key Features

- **Agent Registry** - Dynamic discovery and registration of agents
- **Task Distribution** - Intelligent routing based on agent capabilities
- **Communication Bus** - Pub/sub messaging between agents
- **Health Monitoring** - Heartbeat and failure detection
- **Load Balancing** - Distribute workload across available agents
- **Fault Tolerance** - Automatic retry and failover
- **Scaling** - Horizontal scaling support
- **State Management** - Shared state across the swarm

## Architecture

```
                    ┌─────────────────────────┐
                    │   Orchestrator API      │
                    │   (REST + WebSocket)    │
                    └───────────┬─────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
┌───────▼───────┐     ┌────────▼────────┐     ┌───────▼───────┐
│ Agent Registry│     │  Task Scheduler │     │ Communication │
│  & Discovery  │     │   & Dispatcher  │     │     Bus       │
└───────┬───────┘     └────────┬────────┘     └───────┬───────┘
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
                    ┌──────────▼─────────┐
                    │  Message Queue     │
                    │  (Redis/NATS/JetStream)
                    └────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
┌───────▼───────┐     ┌────────▼────────┐     ┌───────▼───────┐
│ Agent Node 1  │     │  Agent Node 2   │     │ Agent Node N  │
│ (Worker)      │     │  (Worker)       │     │  (Worker)     │
└───────────────┘     └─────────────────┘     └───────────────┘
```

## Quick Start

### Prerequisites

- Node.js 18+
- Docker (for Redis)
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/SuperInstance/SwarmOrchestration.git
cd SwarmOrchestration

# Install dependencies
pnpm install

# Start infrastructure (Redis)
docker-compose up -d

# Configure environment
cp .env.example .env

# Start the orchestrator
pnpm start

# Start an agent worker
pnpm start:worker
```

### Running in Production

```bash
# Build
pnpm build

# Start with PM2
npx pm2 start dist/orchestrator/index.js --name swarm-orchestrator

# Start multiple workers
npx pm2 start dist/worker/index.js --name swarm-worker-1
npx pm2 start dist/worker/index.js --name swarm-worker-2
```

## Project Structure

```
swarm-orchestration/
├── src/
│   ├── orchestrator/          # Main orchestrator service
│   ├── worker/                # Agent worker implementation
│   ├── registry/              # Agent registry
│   ├── scheduler/             # Task scheduling
│   ├── communication/         # Message bus
│   ├── monitoring/            # Health & metrics
│   └── types/                 # TypeScript definitions
├── docker/
│   └── docker-compose.yml
└── kubernetes/                # K8s manifests
```

## API Reference

### REST API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/agents` | GET | List all agents |
| `/api/agents/:id` | GET | Get agent details |
| `/api/tasks` | POST | Submit a task |
| `/api/tasks/:id` | GET | Get task status |
| `/api/queue/stats` | GET | Queue statistics |

### WebSocket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `agent:registered` | Server→Client | New agent registered |
| `agent:unregistered` | Server→Client | Agent disconnected |
| `task:submitted` | Client→Server | Submit task |
| `task:progress` | Server→Client | Task progress update |
| `task:completed` | Server→Client | Task finished |
| `task:failed` | Server→Client | Task failed |

## Technologies

- **Node.js 18+** - Runtime
- **TypeScript 5** - Type safety
- **Fastify** - Web framework
- **Redis** - Message queue and registry
- **WebSocket** - Real-time communication
- **Docker** - Containerization
- **Kubernetes** - Orchestration

## License

MIT

## Contributing

Contributions welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md)

## Support

- GitHub Issues: https://github.com/SuperInstance/SwarmOrchestration/issues
- Documentation: https://docs.superinstance.dev/swarm

---

**SuperInstance** - Modular toolkit ecosystem for intelligent applications.
