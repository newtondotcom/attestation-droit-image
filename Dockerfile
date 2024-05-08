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

RUN |
    echo "MINIO_ENDPOINT=$(cat /run/secrets/MINIO_ENDPOINT)" >> .env && \
    echo "MINIO_PORT=$(cat /run/secrets/MINIO_PORT)" >> .env && \
    echo "MINIO_ACCESS_KEY=$(cat /run/secrets/MINIO_ACCESS_KEY)" >> .env && \
    echo "MINIO_SECRET_KEY=$(cat /run/secrets/MINIO_SECRET_KEY)" >> .env && \
    echo "MAIL_HOST=${{ secrets.MAIL_HOST }}" >> .env && \
    echo "MAIL_PORT=${{ secrets.MAIL_PORT }}" >> .env && \
    echo "MAIL_SSL=${{ secrets.MAIL_SSL }}" >> .env && \
    echo "MAIL_USER=${{ secrets.MAIL_USER }}" >> .env && \
    echo "MAIL_PWD=${{ secrets.MAIL_PWD }}" >> .env && \
    echo "DISCORD_WEBHOOK=${{ secrets.DISCORD_WEBHOOK }}" >> .env

CMD ["node","build/index.js"]