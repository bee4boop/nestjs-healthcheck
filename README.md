## NestJS Healthcheck Lite

Simple NestJS module that adds a `/health` GET route returning application uptime and database status.

### Install

```bash
npm install @bee4boop/nestjs-healthcheck
# or
pnpm add @bee4boop/nestjs-healthcheck
```

### Usage

```ts
import { Module } from '@nestjs/common'
import { HealthModule } from '@bee4boop/nestjs-healthcheck'

@Module({
	imports: [
		// Optional: pass a custom database checker
		HealthModule.forRoot({
			databaseCheck: async () => 'OK',
		}),
	],
})
export class AppModule {}
```

The `/health` endpoint returns JSON like:

```json
{
	"uptime": {
		"system": 278724,
		"process": 368,
		"formatted": {
			"system": "3d 5h 25m",
			"process": "6m"
		}
	},
	"database": "OK"
}
```

### API

- `HealthModule.forRoot(options?)`
  - **databaseCheck**: optional `() => string | Promise<string>` returning database status. Default: `'OK'`. Throw to mark `'DOWN'`.

### Examples: databaseCheck

#### MongoDB (native driver)

```ts
// db/mongo.ts
import { MongoClient } from 'mongodb'

export const mongoClient = new MongoClient(process.env.MONGO_URI!)

export async function ensureMongoConnected() {
	if (!mongoClient.topology) {
		await mongoClient.connect()
	}
}
```

```ts
// app.module.ts
import { Module } from '@nestjs/common'
import { HealthModule } from '@bee4boop/nestjs-healthcheck'
import { ensureMongoConnected, mongoClient } from './db/mongo'

@Module({
	imports: [
		HealthModule.forRoot({
			databaseCheck: async () => {
				await ensureMongoConnected()
				await mongoClient.db().command({ ping: 1 })
				return 'OK'
			},
		}),
	],
})
export class AppModule {}
```

Note: with Mongoose you can use `await mongoose.connection.db.admin().ping()`.

#### PostgreSQL (pg)

```ts
// db/postgres.ts
import { Pool } from 'pg'

export const pgPool = new Pool({
	connectionString: process.env.DATABASE_URL,
})
```

```ts
// app.module.ts
import { Module } from '@nestjs/common'
import { HealthModule } from '@bee4boop/nestjs-healthcheck'
import { pgPool } from './db/postgres'

@Module({
	imports: [
		HealthModule.forRoot({
			databaseCheck: async () => {
				await pgPool.query('SELECT 1')
				return 'OK'
			},
		}),
	],
})
export class AppModule {}
```

Alternatives: TypeORM `await dataSource.query('SELECT 1')`, Prisma `await prisma.$queryRawUnsafe('SELECT 1')`.
