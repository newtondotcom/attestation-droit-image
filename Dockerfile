FROM node:18-alpine
LABEL Developers="Robin Augereau"
USER node:node
EXPOSE 3000
WORKDIR /app
COPY --chown=node:node . .
COPY --chown=node:node .env .
RUN yarn
RUN yarn build
RUN rm -rf src/ Dockerfile

CMD ["node","build/index.js"]