## NestJS Healthcheck Lite

Simple NestJS module that adds a `/health` GET route returning application uptime and database status.

### Install

```bash
npm install nestjs-healthcheck-lite
# or
pnpm add nestjs-healthcheck-lite
```

### Usage

```ts
import { Module } from '@nestjs/common'
import { HealthModule } from 'nestjs-healthcheck-lite'

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

### Publish

This package is compatible with both npm and pnpm.

```bash
npm publish --access public
# or
pnpm publish --access public
```
