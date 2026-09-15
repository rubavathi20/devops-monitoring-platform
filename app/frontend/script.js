// DevOps Monitoring Platform
// Frontend JavaScript

const API_URL = "http://localhost:5000";


// Check backend health
async function checkBackend() {

    const statusElement =
        document.getElementById("backend-status");

    const systemStatus =
        document.getElementById("system-status");

    try {

        statusElement.textContent = "Checking...";

        const response =
            await fetch(`${API_URL}/health`);

        if (!response.ok) {
            throw new Error("Backend unavailable");
        }

        const data =
            await response.json();

        if (data.status === "healthy") {

            statusElement.textContent = "Healthy";
            systemStatus.textContent = "Healthy";

        } else {

            statusElement.textContent = "Unhealthy";
            systemStatus.textContent = "Unhealthy";

        }

    } catch (error) {

        statusElement.textContent = "Offline";
        systemStatus.textContent = "Backend Offline";

        console.error(
            "Backend health check failed:",
            error
        );
    }
}


// Get real system metrics
async function loadMetrics() {

    try {

        const response =
            await fetch(`${API_URL}/api/metrics`);

        if (!response.ok) {
            throw new Error("Metrics API unavailable");
        }

        const data =
            await response.json();

        const metrics =
            data.metrics;

        // CPU
        document.getElementById("cpu").textContent =
            metrics.cpu || "--%";

        // Memory
        document.getElementById("memory").textContent =
            metrics.memory || "--%";

        // Disk
        document.getElementById("disk").textContent =
            metrics.disk || "--%";

        console.log("System metrics:", metrics);

    } catch (error) {

        console.error(
            "Failed to load system metrics:",
            error
        );

        document.getElementById("cpu").textContent =
            "--%";

        document.getElementById("memory").textContent =
            "--%";

        document.getElementById("disk").textContent =
            "--%";
    }
}


// Health check button
async function checkHealth() {

    const result =
        document.getElementById("health-result");

    try {

        const response =
            await fetch(`${API_URL}/health`);

        if (!response.ok) {
            throw new Error("Health check failed");
        }

        const data =
            await response.json();

        result.textContent =
            `System is ${data.status} ✓`;

    } catch (error) {

        result.textContent =
            "System health check failed ✗";
    }
}


// Run when page loads
document.addEventListener("DOMContentLoaded", () => {

    checkBackend();

    loadMetrics();

});
