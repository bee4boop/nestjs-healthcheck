import { HealthModuleOptions, HealthResponse } from './health.types';
export declare class HealthService {
    private readonly options;
    constructor(options?: HealthModuleOptions);
    getHealth(): Promise<HealthResponse>;
}
