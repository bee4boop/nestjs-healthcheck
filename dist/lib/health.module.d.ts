import { DynamicModule } from '@nestjs/common';
import { HealthModuleOptions } from './health.types';
export declare class HealthModule {
    static forRoot(options?: HealthModuleOptions): DynamicModule;
}
