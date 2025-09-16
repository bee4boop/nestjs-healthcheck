export interface HealthModuleOptions {
	databaseCheck?: () => string | Promise<string>
}

export interface UptimeFormatted {
	system: string
	process: string
}

export interface UptimePayload {
	system: number // seconds
	process: number // seconds
	formatted: UptimeFormatted
}

export interface HealthResponse {
	uptime: UptimePayload
	database: string
}
