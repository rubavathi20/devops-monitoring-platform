#!/bin/bash

# DevOps Monitoring Platform
# System Monitoring Script

REPORT="reports/system_metrics.txt"

echo "======================================"
echo "      DEVOPS SYSTEM MONITOR"
echo "======================================"
echo ""

# CPU Usage
CPU=$(top -bn1 | awk '/Cpu\(s\)/ {print 100 - $8}')

# Memory Usage
MEMORY=$(free | awk '/Mem:/ {printf "%.1f", ($3/$2)*100}')

# Disk Usage
DISK=$(df -h / | awk 'NR==2 {print $5}')

# System Uptime
UPTIME=$(uptime -p)

# Hostname
HOSTNAME=$(hostname)

echo "Hostname       : $HOSTNAME"
echo "CPU Usage      : ${CPU}%"
echo "Memory Usage   : ${MEMORY}%"
echo "Disk Usage     : ${DISK}"
echo "System Uptime  : $UPTIME"
echo ""

echo "Docker Containers"
echo "-----------------"

docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""

echo "======================================"
echo "Monitoring completed"
echo "======================================"

# Save report

{
    echo "DevOps Monitoring Report"
    echo "========================"
    echo "Hostname      : $HOSTNAME"
    echo "CPU Usage     : ${CPU}%"
    echo "Memory Usage  : ${MEMORY}%"
    echo "Disk Usage    : ${DISK}"
    echo "System Uptime : $UPTIME"
    echo ""
    echo "Docker Containers"
    echo "-----------------"
    docker ps --format "{{.Names}} | {{.Status}}"
} > "$REPORT"

echo ""
echo "Report saved to: $REPORT"
