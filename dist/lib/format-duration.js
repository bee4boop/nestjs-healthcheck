"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDuration = formatDuration;
function pad(value) {
    return String(value);
}
function formatDuration(totalSeconds) {
    if (!Number.isFinite(totalSeconds) || totalSeconds < 0)
        totalSeconds = 0;
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const parts = [];
    if (days > 0)
        parts.push(`${pad(days)}d`);
    if (hours > 0 || days > 0)
        parts.push(`${pad(hours)}h`);
    parts.push(`${pad(minutes)}m`);
    return parts.join(' ');
}
