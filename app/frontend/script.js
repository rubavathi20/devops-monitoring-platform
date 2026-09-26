// ============================================
// DevOps Monitoring Platform
// Frontend JavaScript
// ============================================

const API_URL = "http://localhost:5000";

// ============================================
// Backend Health Check
// ============================================

async function checkBackend() {
    const statusElement = document.getElementById("backend-status");
    const systemStatus = document.getElementById("system-status");

    try {
        if (statusElement) {
            statusElement.textContent = "Checking...";
        }

        const response = await fetch(`${API_URL}/health`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "healthy") {
            if (statusElement) {
                statusElement.textContent = "Healthy";
            }

            if (systemStatus) {
                systemStatus.textContent = "Healthy";
            }
        } else {
            if (statusElement) {
                statusElement.textContent = "Unhealthy";
            }

            if (systemStatus) {
                systemStatus.textContent = "Unhealthy";
            }
        }

    } catch (error) {
        console.error("Backend health check failed:", error);

        if (statusElement) {
            statusElement.textContent = "Offline";
        }

        if (systemStatus) {
            systemStatus.textContent = "Backend Offline";
        }
    }
}


// ============================================
// Load System Metrics
// ============================================

async function loadMetrics() {
    try {
        const response = await fetch(`${API_URL}/api/metrics`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        console.log("Metrics API response:", data);

        const metrics = data.metrics;

        if (!metrics) {
            throw new Error("Metrics data not found");
        }

        // CPU
        const cpuElement = document.getElementById("cpu");

        if (cpuElement) {
            cpuElement.textContent =
                metrics.cpu !== undefined
                    ? `${metrics.cpu}%`
                    : "--%";
        }

        // Memory
        const memoryElement = document.getElementById("memory");

        if (memoryElement) {
            memoryElement.textContent =
                metrics.memory !== undefined
                    ? `${metrics.memory}%`
                    : "--%";
        }

        // Disk
        const diskElement = document.getElementById("disk");

        if (diskElement) {
            diskElement.textContent =
                metrics.disk !== undefined
                    ? `${metrics.disk}%`
                    : "--%";
        }

        // Uptime
        const uptimeElement = document.getElementById("uptime");

        if (uptimeElement) {
            uptimeElement.textContent =
                metrics.uptime !== undefined
                    ? metrics.uptime
                    : "--";
        }

    } catch (error) {
        console.error("Failed to load system metrics:", error);

        const cpuElement = document.getElementById("cpu");
        const memoryElement = document.getElementById("memory");
        const diskElement = document.getElementById("disk");
        const uptimeElement = document.getElementById("uptime");

        if (cpuElement) {
            cpuElement.textContent = "--%";
        }

        if (memoryElement) {
            memoryElement.textContent = "--%";
        }

        if (diskElement) {
            diskElement.textContent = "--%";
        }

        if (uptimeElement) {
            uptimeElement.textContent = "--";
        }
    }
}


// ============================================
// Manual Health Check
// ============================================

async function checkHealth() {
    const result = document.getElementById("health-result");

    if (!result) {
        console.error("health-result element not found");
        return;
    }

    result.textContent = "Checking...";

    try {
        const response = await fetch(`${API_URL}/health`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "healthy") {
            result.textContent = "System is healthy ✓";
        } else {
            result.textContent = "System is unhealthy ✗";
        }

    } catch (error) {
        console.error("Health check failed:", error);

        result.textContent =
            "System health check failed ✗";
    }
}


// ============================================
// Refresh Dashboard
// ============================================

async function refreshDashboard() {
    await checkBackend();
    await loadMetrics();
}


// ============================================
// Page Loaded
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("DevOps Monitoring Platform loaded");

    refreshDashboard();
});


// ============================================
// Automatic Refresh
// ============================================

setInterval(() => {
    refreshDashboard();
}, 10000);
