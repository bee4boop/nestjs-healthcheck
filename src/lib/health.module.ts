import { DynamicModule, Module } from '@nestjs/common'
import { HEALTH_MODULE_OPTIONS } from './health.constants'
import { HealthController } from './health.controller'
import { HealthService } from './health.service'
import { HealthModuleOptions } from './health.types'

@Module({})
export class HealthModule {
	static forRoot(options?: HealthModuleOptions): DynamicModule {
		return {
			module: HealthModule,
			controllers: [HealthController],
			providers: [
				{
					provide: HEALTH_MODULE_OPTIONS,
					useValue: options ?? {},
				},
				{
					provide: HealthService,
					useFactory: (opts: HealthModuleOptions) => new HealthService(opts),
					inject: [HEALTH_MODULE_OPTIONS],
				},
			],
			exports: [HealthService],
		}
	}
}
