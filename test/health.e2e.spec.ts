import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import 'reflect-metadata'
import request from 'supertest'
import { HealthModule } from '../src/lib/health.module'

describe('HealthModule /health (e2e)', () => {
	let app: INestApplication

	afterEach(async () => {
		if (app) await app.close()
	})

	it('returns default OK status and uptime fields', async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [HealthModule.forRoot()],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()

		const res = await request(app.getHttpServer()).get('/health').expect(200)
		expect(res.body).toHaveProperty('uptime')
		expect(res.body.uptime).toHaveProperty('system')
		expect(res.body.uptime).toHaveProperty('process')
		expect(res.body.uptime).toHaveProperty('formatted')
		expect(res.body).toHaveProperty('database', 'OK')
	})

	it('returns custom database status', async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [
				HealthModule.forRoot({
					databaseCheck: async () => 'GREEN',
				}),
			],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()

		const res = await request(app.getHttpServer()).get('/health').expect(200)
		expect(res.body.database).toBe('GREEN')
	})

	it('marks database as DOWN on checker error', async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [
				HealthModule.forRoot({
					databaseCheck: async () => {
						throw new Error('db failed')
					},
				}),
			],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()

		const res = await request(app.getHttpServer()).get('/health').expect(200)
		expect(res.body.database).toBe('DOWN')
	})
})
