"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
const common_1 = require("@nestjs/common");
const format_duration_1 = require("./format-duration");
const health_constants_1 = require("./health.constants");
const os_1 = __importDefault(require("os"));
let HealthService = class HealthService {
    constructor(options = {}) {
        this.options = options;
    }
    async getHealth() {
        const systemSeconds = Math.floor(os_1.default.uptime());
        const processSeconds = Math.floor(process.uptime());
        let database = 'OK';
        if (this.options.databaseCheck) {
            try {
                const result = await this.options.databaseCheck();
                database = result ?? 'OK';
            }
            catch {
                database = 'DOWN';
            }
        }
        return {
            uptime: {
                system: systemSeconds,
                process: processSeconds,
                formatted: {
                    system: (0, format_duration_1.formatDuration)(systemSeconds),
                    process: (0, format_duration_1.formatDuration)(processSeconds),
                },
            },
            database,
        };
    }
};
exports.HealthService = HealthService;
exports.HealthService = HealthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(health_constants_1.HEALTH_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], HealthService);
