const { buildSkillV4 } = require('./build-skill-v4');

buildSkillV4({
  name: 'postgresql',
  displayName: 'PostgreSQL',
  description: "The world's most advanced open source relational database.",
  categories: ['Databases'],
  learningLevel: 'advanced',
  useCases: ['Relational Database', 'Data Warehouse'],
  deploymentTargets: ['neon', 'aws', 'gcp'],
  ecosystem: 'database',
  maintainers: ['postgresql'],
  stability: 'production',
  relationships: [
    { target: 'neon', type: 'extended_by' },
    { target: 'prisma', type: 'integrates_with' },
    { target: 'drizzle', type: 'integrates_with' },
    { target: 'mysql', type: 'alternative_to' },
  ],
  quickStart:
    'PostgreSQL is the gold standard for relational data. It supports advanced JSONB querying, vector similarity (pgvector), and complex window functions.\n\n```bash\ndocker run -d -p 5432:5432 -e POSTGRES_PASSWORD=secret postgres:16\n```',
  productionPatterns:
    "### Connection Pooling\nPostgres spawns a new OS process per connection (unlike MySQL's threads). In serverless environments, this quickly exhausts memory. You MUST use a connection pooler like PgBouncer or a managed serverless Postgres like Neon/Supabase to multiplex connections.",
  architecture:
    '### JSONB vs Relational\nUse `JSONB` for unstructured metadata (like user preferences), but do not store core domain entities in JSONB. You lose foreign key constraints and standard indexing performance.',
  errorRecovery:
    'If transactions frequently deadlock, ensure all your application transactions acquire locks in the exact same deterministic order, and keep transactions as short as possible.',
  securityNotes:
    'Never connect as the `postgres` superuser from your application. Create a dedicated application user with strictly limited schema access (`GRANT SELECT, INSERT ON ALL TABLES...`).',
  links: { 'PostgreSQL Docs': 'https://www.postgresql.org/docs/' },
  examples: {
    sql: {
      example: `CREATE TABLE users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email TEXT UNIQUE NOT NULL,\n  metadata JSONB DEFAULT '{}'::jsonb,\n  created_at TIMESTAMPTZ DEFAULT NOW()\n);\n\nCREATE INDEX idx_users_metadata ON users USING GIN (metadata);`,
    },
  },
});

buildSkillV4({
  name: 'mysql',
  displayName: 'MySQL',
  description: "The world's most popular open source database.",
  categories: ['Databases'],
  learningLevel: 'intermediate',
  useCases: ['Relational Database', 'Web Apps'],
  deploymentTargets: ['planetscale', 'aws', 'gcp'],
  ecosystem: 'database',
  maintainers: ['oracle'],
  stability: 'production',
  relationships: [
    { target: 'planetscale', type: 'extended_by' },
    { target: 'prisma', type: 'integrates_with' },
    { target: 'postgresql', type: 'alternative_to' },
  ],
  quickStart:
    'MySQL is highly optimized for read-heavy web workloads. The InnoDB storage engine provides robust ACID compliance.\n\n```bash\ndocker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret mysql:8\n```',
  productionPatterns:
    '### Index Optimizations\nMySQL heavily relies on clustered indexes (the Primary Key). Always define an auto-incrementing integer or sequential UUID (UUID v7) as your primary key to prevent massive index fragmentation and page splits during high-volume inserts.',
  architecture:
    "### Replication\nMySQL's asynchronous replication is the standard for scaling read traffic. Write to the Primary node, and read from Read Replicas, but ensure your application can handle the replication lag (milliseconds).",
  errorRecovery:
    "Use `EXPLAIN` to diagnose slow queries. If MySQL is performing a 'filesort' or full table scan, you are missing a critical composite index.",
  securityNotes:
    'Disable `local_infile` to prevent arbitrary file reading vulnerabilities. Ensure `sql_mode` includes `STRICT_ALL_TABLES` to prevent MySQL from silently truncating strings that exceed column lengths.',
  links: { 'MySQL Docs': 'https://dev.mysql.com/doc/' },
  examples: {
    sql: {
      example: `CREATE TABLE orders (\n  id BIGINT AUTO_INCREMENT PRIMARY KEY,\n  user_id BIGINT NOT NULL,\n  total DECIMAL(10,2) NOT NULL,\n  INDEX idx_user_id (user_id)\n) ENGINE=InnoDB;`,
    },
  },
});

buildSkillV4({
  name: 'sqlite',
  displayName: 'SQLite',
  description: 'Small, fast, reliable, embedded database.',
  categories: ['Databases'],
  learningLevel: 'beginner',
  useCases: ['Embedded App', 'Edge Computing', 'Testing'],
  deploymentTargets: ['turso', 'cloudflare'],
  ecosystem: 'database',
  maintainers: ['sqlite'],
  stability: 'production',
  relationships: [
    { target: 'turso', type: 'extended_by' },
    { target: 'drizzle', type: 'integrates_with' },
  ],
  quickStart:
    "SQLite is an embedded database. It doesn't run as a background service; it is just a C library that reads and writes directly to an ordinary disk file.\n\n```bash\nsqlite3 mydatabase.db\n```",
  productionPatterns:
    '### WAL Mode\nBy default, SQLite uses a rollback journal which blocks all readers during a write. For production web applications, you MUST execute `PRAGMA journal_mode=WAL;`. This enables Write-Ahead Logging, allowing concurrent readers and writers.',
  architecture:
    '### Edge Replication\nModern cloud-native platforms like Turso (libSQL) or Cloudflare D1 allow you to replicate SQLite files directly to edge nodes worldwide, enabling sub-millisecond local reads with global consistency.',
  errorRecovery:
    'If you receive `SQLITE_BUSY` errors, increase the busy timeout (`PRAGMA busy_timeout = 5000;`). This tells SQLite to wait for 5 seconds for a lock to clear before throwing the exception.',
  securityNotes:
    'SQLite files should never be placed in a public-facing web directory. Secure the file permissions to ensure only the application process owner can read or write the `.db` file.',
  links: { 'SQLite Docs': 'https://www.sqlite.org/docs.html' },
  examples: {
    sql: {
      example: `PRAGMA journal_mode=WAL;\nPRAGMA synchronous=NORMAL;\n\nCREATE TABLE posts (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  title TEXT NOT NULL\n);`,
    },
  },
});

buildSkillV4({
  name: 'drizzle',
  displayName: 'Drizzle ORM',
  description: 'Next generation TypeScript ORM.',
  categories: ['Databases', 'Developer Tools'],
  learningLevel: 'intermediate',
  useCases: ['TypeScript ORM', 'Edge Computing'],
  deploymentTargets: ['vercel', 'cloudflare'],
  ecosystem: 'typescript',
  maintainers: ['drizzle-team'],
  stability: 'production',
  relationships: [
    { target: 'postgresql', type: 'integrates_with' },
    { target: 'mysql', type: 'integrates_with' },
    { target: 'sqlite', type: 'integrates_with' },
    { target: 'prisma', type: 'alternative_to' },
    { target: 'neon', type: 'works_well_with' },
    { target: 'turso', type: 'works_well_with' },
  ],
  quickStart:
    'Drizzle is a headless TypeScript ORM. It generates pure SQL with zero runtime overhead, making it incredibly fast and compatible with Edge environments (Vercel Edge, Cloudflare Workers).\n\n```bash\nnpm i drizzle-orm\n```',
  productionPatterns:
    '### Relational Queries vs SQL-Like\nDrizzle supports both traditional SQL-like querying and a Prisma-like `db.query` syntax. Use the `db.query` API for deeply nested relational fetches, but stick to the SQL-like syntax for complex aggregations and joins for maximum performance.',
  architecture:
    '### Zero Dependencies\nUnlike Prisma, Drizzle does not require downloading a Rust binary engine. It is just JavaScript, meaning it natively supports serverless and edge functions without massive cold starts.',
  errorRecovery:
    'Always wrap multiple inserts/updates in a `db.transaction()`. If the underlying database driver throws an error, Drizzle will automatically issue the rollback.',
  securityNotes:
    'Drizzle utilizes prepared statements by default to completely mitigate SQL injection. Never concatenate raw strings inside `sql\`` template literals.',
  links: { 'Drizzle Docs': 'https://orm.drizzle.team/' },
  examples: {
    typescript: {
      schema: `import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';\nexport const users = pgTable('users', {\n  id: text('id').primaryKey(),\n  email: text('email').notNull(),\n  createdAt: timestamp('created_at').defaultNow(),\n});`,
      query: `const allUsers = await db.select().from(users).where(eq(users.email, 'test@example.com'));`,
    },
  },
});

buildSkillV4({
  name: 'prisma',
  displayName: 'Prisma',
  description: 'Next-generation Node.js and TypeScript ORM.',
  categories: ['Databases', 'Developer Tools'],
  learningLevel: 'intermediate',
  useCases: ['TypeScript ORM', 'Rapid Prototyping'],
  deploymentTargets: ['vercel', 'docker', 'railway'],
  ecosystem: 'typescript',
  maintainers: ['prisma'],
  stability: 'production',
  relationships: [
    { target: 'postgresql', type: 'integrates_with' },
    { target: 'mysql', type: 'integrates_with' },
    { target: 'drizzle', type: 'alternative_to' },
    { target: 'nextjs', type: 'works_well_with' },
  ],
  quickStart:
    'Prisma provides an intuitive data model definition format and auto-generates a fully type-safe database client.\n\n```bash\nnpm install prisma --save-dev\nnpx prisma init\n```',
  productionPatterns:
    '### Migration Workflows\nNever run `npx prisma db push` in production. Always use `npx prisma migrate deploy` to ensure a strict, version-controlled history of schema changes executes atomically.',
  architecture:
    '### The Rust Query Engine\nPrisma uses a Rust query engine running as a sidecar process. This provides advanced features but increases memory footprint and serverless cold starts. Ensure you use `@prisma/client/edge` if deploying to Edge runtimes.',
  errorRecovery:
    'Handle `PrismaClientKnownRequestError` specifically to catch and gracefully resolve common constraints (e.g., catching code `P2002` for unique constraint violations during user registration).',
  securityNotes:
    'Do not expose Prisma Studio (`npx prisma studio`) to the public internet. It provides full root access to your database.',
  links: { 'Prisma Docs': 'https://www.prisma.io/docs/' },
  examples: {
    prisma: {
      schema: `generator client {\n  provider = "prisma-client-js"\n}\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\nmodel User {\n  id    Int     @id @default(autoincrement())\n  email String  @unique\n  name  String?\n}`,
    },
    typescript: {
      query: `const user = await prisma.user.create({\n  data: { email: 'alice@prisma.io', name: 'Alice' },\n})`,
    },
  },
});
