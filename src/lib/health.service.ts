import { Inject, Injectable } from '@nestjs/common'
import os from 'os'
import { formatDuration } from './format-duration'
import { HEALTH_MODULE_OPTIONS } from './health.constants'
import { HealthModuleOptions, HealthResponse } from './health.types'

@Injectable()
export class HealthService {
	constructor(
		@Inject(HEALTH_MODULE_OPTIONS)
		private readonly options: HealthModuleOptions = {}
	) {}

	async getHealth(): Promise<HealthResponse> {
		const systemSeconds = Math.floor(os.uptime())
		const processSeconds = Math.floor(process.uptime())

		let database = 'OK'
		if (this.options.databaseCheck) {
			try {
				const result = await this.options.databaseCheck()
				database = result ?? 'OK'
			} catch {
				database = 'DOWN'
			}
		}

		return {
			uptime: {
				system: systemSeconds,
				process: processSeconds,
				formatted: {
					system: formatDuration(systemSeconds),
					process: formatDuration(processSeconds),
				},
			},
			database,
		}
	}
}
