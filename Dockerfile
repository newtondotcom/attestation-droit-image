FROM node:18-alpine
LABEL Developers="Robin Augereau"
USER node:node
EXPOSE 3000
WORKDIR /app
COPY --chown=node:node . .
COPY --chown=node:node .env .
RUN yarn
RUN yarn build
RUN rm -rf src/ static/ Dockerfile

RUN --mount=type=secret,id=MINIO_ENDPOINT \
    --mount=type=secret,id=MINIO_PORT \
    --mount=type=secret,id=MINIO_ACCESS_KEY \
    --mount=type=secret,id=MINIO_SECRET_KEY \
    echo "MINIO_ENDPOINT=$(cat /run/secrets/MINIO_ENDPOINT)" >> .env && \
    echo "MINIO_PORT=$(cat /run/secrets/MINIO_PORT)" >> .env && \
    echo "MINIO_ACCESS_KEY=$(cat /run/secrets/MINIO_ACCESS_KEY)" >> .env && \
    echo "MINIO_SECRET_KEY=$(cat /run/secrets/MINIO_SECRET_KEY)" >> .env

CMD ["node","build/index.js"]