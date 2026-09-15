# 🚀 DevOps Monitoring Platform

A containerized DevOps monitoring platform that collects system health and resource metrics, exposes them through a Flask REST API, and displays them on a web-based monitoring dashboard.

The project demonstrates practical DevOps concepts including **Linux monitoring, Bash scripting, Docker, Docker Compose, REST APIs, containerization, and CI/CD preparation**.

---

## 📌 Project Overview

The DevOps Monitoring Platform monitors a Linux system and provides information about:

- CPU usage
- Memory usage
- Disk usage
- System uptime
- Hostname
- Backend health
- Docker container status

The monitoring script generates a system report, which is shared with the Flask backend through a Docker volume. The backend provides REST API endpoints, and the frontend displays the monitoring information through a dashboard.

---

## 🏗️ Architecture

```text
                    ┌─────────────────────────┐
                    │     Linux / WSL Host    │
                    │                         │
                    │     monitor.sh          │
                    │          │              │
                    │          ▼              │
                    │     reports/            │
                    │ system_metrics.txt      │
                    └────────────┬────────────┘
                                 │
                            Docker Volume
                                 │
                                 ▼
              ┌──────────────────────────────────┐
              │          Docker Compose          │
              │                                  │
              │  ┌────────────────────────────┐  │
              │  │      Flask Backend         │  │
              │  │                            │  │
              │  │  /health                   │  │
              │  │  /api/status               │  │
              │  │  /api/metrics              │  │
              │  └─────────────┬──────────────┘  │
              │                │                 │
              │                │ REST API        │
              │                ▼                 │
              │  ┌────────────────────────────┐ │
              │  │      Nginx Frontend        │ │
              │  │                            │ │
              │  │      Monitoring Dashboard  │ │
              │  └────────────────────────────┘ │
              └──────────────────────────────────┘
