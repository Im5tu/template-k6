FROM loadimpact/k6
WORKDIR /app/
COPY . .
ENV K6_SCRIPT="index.js" K6_HOSTENV="qa" TERM="xterm-256color"
ENTRYPOINT [ "/bin/sh", "/app/run.sh" ]