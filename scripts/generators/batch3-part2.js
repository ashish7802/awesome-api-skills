const { buildSkillV3 } = require('./build-skill-v3');

buildSkillV3({
  name: 'fastapi',
  displayName: 'FastAPI',
  description: 'High-performance Python web framework.',
  categories: ['Backend Frameworks'],
  learningLevel: 'intermediate',
  useCases: ['Microservices', 'AI Inference', 'REST APIs'],
  deploymentTargets: ['docker', 'render', 'railway'],
  ecosystem: 'python',
  maintainers: ['tiangolo'],
  stability: 'production',
  relationships: [
    { target: 'express', type: 'alternative_to' },
    { target: 'openai', type: 'integrates_with' },
    { target: 'docker', type: 'deploys_to' },
  ],
  quickStart:
    'FastAPI leverages Python type hints to generate OpenAPI documentation automatically and serialize data incredibly fast using Pydantic.\n\n```bash\npip install fastapi uvicorn pydantic\n```',
  productionPatterns:
    '### Dependency Injection\nUse the `Depends()` feature heavily. Inject database sessions, authenticators, and external clients directly into your route functions rather than relying on global state. This makes unit testing trivial by overriding dependencies.',
  architecture:
    '### Async vs Sync\nFastAPI handles both `def` and `async def` routes. If you are using a synchronous database driver (like `psycopg2`), declare the route as `def` so FastAPI runs it in an external threadpool. If using an asynchronous driver (like `asyncpg`), use `async def`.',
  errorRecovery:
    'Raise `HTTPException` inside your routes for expected errors (e.g., 404). For unexpected global errors, register a global exception handler via `@app.exception_handler` to sanitize the error response and log the stack trace to Sentry.',
  securityNotes:
    'Use `OAuth2PasswordBearer` for built-in token extraction. Never expose raw SQL queries; always use an ORM like SQLAlchemy or SQLModel to prevent SQL injection.',
  links: { 'FastAPI Docs': 'https://fastapi.tiangolo.com/' },
  examples: {
    python: {
      main: `from fastapi import FastAPI, Depends, HTTPException\nfrom pydantic import BaseModel\napp = FastAPI()\n\nclass Item(BaseModel):\n  name: str\n\n@app.post('/items/')\nasync def create_item(item: Item):\n  return item`,
      dependency: `def get_db():\n  db = SessionLocal()\n  try: yield db\n  finally: db.close()\n\n@app.get('/users/')\ndef get_users(db: Session = Depends(get_db)):\n  return db.query(User).all()`,
    },
  },
});

buildSkillV3({
  name: 'express',
  displayName: 'Express',
  description: 'Fast, unopinionated, minimalist web framework for Node.js.',
  categories: ['Backend Frameworks'],
  learningLevel: 'beginner',
  useCases: ['REST APIs', 'Microservices'],
  deploymentTargets: ['docker', 'render', 'railway'],
  ecosystem: 'javascript',
  maintainers: ['expressjs'],
  stability: 'production',
  relationships: [
    { target: 'fastapi', type: 'alternative_to' },
    { target: 'hono', type: 'alternative_to' },
    { target: 'nestjs', type: 'alternative_to' },
    { target: 'redis', type: 'works_well_with' },
  ],
  quickStart:
    'Express is the most mature Node.js HTTP framework. It utilizes a simple middleware chain architecture.\n\n```bash\nnpm install express cors\n```',
  productionPatterns:
    '### Controller Pattern\nDo not write massive anonymous functions inside your `app.get()` routes. Extract business logic into dedicated controller files (e.g., `user.controller.js`) and pass them to the Express router.',
  architecture:
    '### Middleware Chains\nExpress executes middleware sequentially. Always ensure your JSON body parser (`express.json()`) is registered *before* the routes that need to read `req.body`. Ensure you call `next()` to pass control.',
  errorRecovery:
    'Express 4 does not automatically catch asynchronous errors. You must wrap your async route handlers in a `try/catch` block and pass the error to `next(err)`. (Note: Express 5 changes this behavior). Always register a global error handler at the very bottom of your middleware chain.',
  securityNotes:
    'Install and configure `helmet` to automatically set secure HTTP headers. Rate limit endpoints using `express-rate-limit` backed by Redis to prevent brute-force attacks.',
  links: { 'Express Docs': 'https://expressjs.com/' },
  examples: {
    typescript: {
      app: `import express, { Request, Response, NextFunction } from 'express';\nconst app = express();\napp.use(express.json());\napp.get('/ping', (req, res) => res.json({ msg: 'pong' }));\n\napp.use((err: Error, req: Request, res: Response, next: NextFunction) => {\n  res.status(500).json({ error: err.message });\n});`,
      'async-wrapper': `const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {\n  Promise.resolve(fn(req, res, next)).catch(next);\n};`,
    },
  },
});

buildSkillV3({
  name: 'hono',
  displayName: 'Hono',
  description: 'Ultrafast web framework for the Edges.',
  categories: ['Backend Frameworks'],
  learningLevel: 'intermediate',
  useCases: ['Edge Computing', 'Microservices'],
  deploymentTargets: ['cloudflare', 'vercel', 'deno', 'bun'],
  ecosystem: 'javascript',
  maintainers: ['honojs'],
  stability: 'production',
  relationships: [
    { target: 'express', type: 'alternative_to' },
    { target: 'cloudflare', type: 'deploys_to' },
  ],
  quickStart:
    'Hono is designed specifically for Edge Runtimes (Cloudflare Workers, Deno, Bun, Fastly). It utilizes the standard Web Fetch API rather than Node.js specific APIs.\n\n```bash\nnpm create hono@latest\n```',
  productionPatterns:
    '### RPC (Remote Procedure Call)\nHono provides `hono/rpc` which allows you to share your backend route types with your frontend, enabling end-to-end type safety without generating OpenAPI schemas.',
  architecture:
    '### Web Standard APIs\nHono strictly uses the Web Standard `Request` and `Response` objects. You cannot use Node.js `res.send()` or `req.body`. Instead, you use `c.json()` and `await c.req.json()`.',
  errorRecovery:
    'Use `app.onError` to catch exceptions globally. Since Edge functions often fail due to network timeouts when communicating with external databases, implement retry mechanisms using libraries designed for the Web Fetch API.',
  securityNotes:
    'Hono includes built-in middleware for CSRF, CORS, and Basic Auth. When deploying to Cloudflare Workers, environment variables (secrets) are accessed via `c.env` rather than `process.env`.',
  links: { 'Hono Docs': 'https://hono.dev/' },
  examples: {
    typescript: {
      index: `import { Hono } from 'hono';\nconst app = new Hono();\napp.get('/', (c) => c.json({ message: 'Hello Edge!' }));\nexport default app;`,
      rpc: `// Backend\nconst route = app.post('/posts', (c) => c.json({ id: 1 }));\nexport type AppType = typeof route;\n\n// Frontend\nimport { hc } from 'hono/client';\nconst client = hc<AppType>('http://localhost');`,
    },
  },
});

buildSkillV3({
  name: 'nestjs',
  displayName: 'NestJS',
  description:
    'A progressive Node.js framework for building efficient, reliable and scalable server-side applications.',
  categories: ['Backend Frameworks'],
  learningLevel: 'advanced',
  useCases: ['Enterprise APIs', 'Microservices'],
  deploymentTargets: ['docker', 'kubernetes', 'railway'],
  ecosystem: 'typescript',
  maintainers: ['nestjs'],
  stability: 'production',
  relationships: [
    { target: 'express', type: 'extended_by' },
    { target: 'docker', type: 'deploys_to' },
    { target: 'kubernetes', type: 'deploys_to' },
  ],
  quickStart:
    'NestJS forces an Angular-like architecture (Modules, Controllers, Providers) onto Node.js. Under the hood, it uses Express by default but can be swapped to Fastify.\n\n```bash\nnpm i -g @nestjs/cli\nnest new project-name\n```',
  productionPatterns:
    '### Dependency Injection\nNever instantiate classes with `new`. Use the `@Injectable()` decorator and let the Nest IoC (Inversion of Control) container manage singletons. This makes mocking services during testing exceptionally easy.',
  architecture:
    '### Microservices\nNest natively supports microservice architectures. Instead of HTTP, you can easily configure a controller to listen to Kafka, NATS, or Redis Pub/Sub using the `@MessagePattern()` decorator without changing your business logic.',
  errorRecovery:
    'Use custom Exception Filters (`@Catch()`) to map domain-specific errors (like database connection failures) to standard HTTP responses globally.',
  securityNotes:
    'Utilize NestJS Guards (`@Injectable() implements CanActivate`) to handle Authorization (e.g., verifying JWTs or Role-Based Access Control). Guards execute before interceptors and pipes.',
  links: { 'NestJS Docs': 'https://docs.nestjs.com/' },
  examples: {
    typescript: {
      controller: `import { Controller, Get } from '@nestjs/common';\nimport { AppService } from './app.service';\n\n@Controller('cats')\nexport class AppController {\n  constructor(private readonly appService: AppService) {}\n  @Get()\n  getHello(): string { return this.appService.getHello(); }\n}`,
      service: `import { Injectable } from '@nestjs/common';\n@Injectable()\nexport class AppService {\n  getHello(): string { return 'Meow!'; }\n}`,
    },
  },
});

buildSkillV3({
  name: 'trpc',
  displayName: 'tRPC',
  description: 'End-to-end typesafe APIs made easy.',
  categories: ['Backend Frameworks', 'Developer Tools'],
  learningLevel: 'intermediate',
  useCases: ['Full Stack TypeScript'],
  deploymentTargets: ['vercel', 'docker'],
  ecosystem: 'typescript',
  maintainers: ['trpc'],
  stability: 'production',
  relationships: [
    { target: 'nextjs', type: 'works_well_with' },
    { target: 'react', type: 'works_well_with' },
  ],
  quickStart:
    'tRPC allows you to easily build & consume fully typesafe APIs without schemas or code generation. It relies on TypeScript inference to share types between your server and client.\n\n```bash\nnpm install @trpc/server @trpc/client @trpc/react-query @tanstack/react-query zod\n```',
  productionPatterns:
    '### Input Validation\ntRPC strongly integrates with Zod. Always define an `.input(z.object({...}))` schema for your mutations. tRPC will automatically reject invalid payloads before your resolver function ever executes.',
  architecture:
    '### Routers and Procedures\nGroup your endpoints into sub-routers (e.g., `userRouter`, `postRouter`) and merge them into an `appRouter`. This prevents your primary router file from becoming unmaintainable.',
  errorRecovery:
    'Throw `TRPCError` with specific codes (e.g., `UNAUTHORIZED`, `NOT_FOUND`). On the client, React Query will automatically catch these and expose them via the `error` object.',
  securityNotes:
    'Implement a `protectedProcedure` middleware. Extract the session from the context (`ctx`), verify it, and throw a `TRPCError` if invalid. Use this procedure for all secure endpoints instead of the standard `publicProcedure`.',
  links: { 'tRPC Docs': 'https://trpc.io/docs' },
  examples: {
    typescript: {
      server: `import { initTRPC } from '@trpc/server';\nimport { z } from 'zod';\nconst t = initTRPC.create();\nexport const appRouter = t.router({\n  getUser: t.procedure.input(z.string()).query((opts) => {\n    return { id: opts.input, name: 'Bilbo' };\n  }),\n});\nexport type AppRouter = typeof appRouter;`,
      client: `import { trpc } from '../utils/trpc';\nexport function UserProfile() {\n  const user = trpc.getUser.useQuery('id_123');\n  if (user.isLoading) return <div>Loading...</div>;\n  return <div>{user.data?.name}</div>;\n}`,
    },
  },
});
