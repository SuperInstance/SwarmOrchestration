# Contributing to Swarm Orchestration

Thank you for your interest in contributing!

## Development Setup

```bash
# Clone the repository
git clone https://github.com/SuperInstance/SwarmOrchestration.git
cd SwarmOrchestration

# Install dependencies
pnpm install

# Start Redis (required)
docker-compose up -d redis

# Run in development
pnpm dev
```

## Running Tests

```bash
# Run tests
pnpm test

# Run with coverage
pnpm test:coverage

# Watch mode
pnpm test --watch
```

## Code Style

- Use TypeScript for all new code
- Follow existing code patterns
- Add JSDoc for exported functions
- Keep functions small and focused

## Submitting Changes

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request
