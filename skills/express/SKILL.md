# Express Skill

> Fast, unopinionated, minimalist web framework for Node.js.

## Ecosystem Graph

```mermaid
graph LR
  express["Express"]
  express -- "alternative to" --> fastapi
  express -- "alternative to" --> hono
  express -- "alternative to" --> nestjs
  express -- "works well with" --> redis
```

## Quick Start
Express is the most mature Node.js HTTP framework. It utilizes a simple middleware chain architecture.

```bash
npm install express cors
```

## Production Patterns
### Controller Pattern
Do not write massive anonymous functions inside your `app.get()` routes. Extract business logic into dedicated controller files (e.g., `user.controller.js`) and pass them to the Express router.

## Architecture & Scaling
### Middleware Chains
Express executes middleware sequentially. Always ensure your JSON body parser (`express.json()`) is registered *before* the routes that need to read `req.body`. Ensure you call `next()` to pass control.

## Error Recovery
Express 4 does not automatically catch asynchronous errors. You must wrap your async route handlers in a `try/catch` block and pass the error to `next(err)`. (Note: Express 5 changes this behavior). Always register a global error handler at the very bottom of your middleware chain.

## Security Notes
Install and configure `helmet` to automatically set secure HTTP headers. Rate limit endpoints using `express-rate-limit` backed by Redis to prevent brute-force attacks.

## Relationships
**Alternatives**: [fastapi](/skills/fastapi), [hono](/skills/hono), [nestjs](/skills/nestjs)

**Works Well With**: [redis](/skills/redis)

## References
- [Express Docs](https://expressjs.com/)
