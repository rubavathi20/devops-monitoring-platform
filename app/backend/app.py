from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
import socket
import os

app = Flask(__name__)
CORS(app)

REPORT_FILE = "/app/reports/system_metrics.txt"


@app.route("/")
def home():
    return jsonify({
        "application": "DevOps Monitoring Platform",
        "status": "running"
    })


@app.route("/health")
def health():
    return jsonify({
        "status": "healthy",
        "hostname": socket.gethostname(),
        "timestamp": datetime.now().isoformat()
    })


@app.route("/api/status")
def status():
    return jsonify({
        "application": "DevOps Monitoring Platform",
        "status": "healthy",
        "service": "backend",
        "hostname": socket.gethostname()
    })


@app.route("/api/metrics")
def metrics():

    if not os.path.exists(REPORT_FILE):
        return jsonify({
            "error": "Monitoring report not found"
        }), 404

    metrics_data = {}

    with open(REPORT_FILE, "r") as file:
        for line in file:
            if ":" in line:
                key, value = line.split(":", 1)

                key = key.strip()
                value = value.strip()

                if key == "Hostname":
                    metrics_data["hostname"] = value

                elif key == "CPU Usage":
                    metrics_data["cpu"] = value

                elif key == "Memory Usage":
                    metrics_data["memory"] = value

                elif key == "Disk Usage":
                    metrics_data["disk"] = value

                elif key == "System Uptime":
                    metrics_data["uptime"] = value

    return jsonify({
        "status": "success",
        "metrics": metrics_data
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )
