#!/usr/bin/zsh
SERVICE_FILE=/etc/systemd/system/startpage.service


dir=$(cd "$(dirname "$0:A")" ; pwd -P)
DIRR="${pwd}"

service="[Unit]
Description=Service for startpage server
[Service]
WorkingDirectory=${dir}
ExecStart=deno run --allow-net --allow-read server.ts
[Install]
WantedBy=multi-user.target
"

printf $service > $SERVICE_FILE

systemctl enable startpage.service
systemctl start startpage.service

