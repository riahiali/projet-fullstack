// utils/durationUtils.js
function parseDuration(str) {
    const [hours, minutes] = str.split('h').map(part => part.trim().replace('m', ''));
    return parseInt(hours || 0) * 60 + parseInt(minutes || 0);
}

function formatDuration(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
}

module.exports = { parseDuration, formatDuration };
