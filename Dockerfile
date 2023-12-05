FROM node:18-alpine
LABEL Developers="Robin Augereau"
USER node:node
EXPOSE 3000
WORKDIR /app
COPY --chown=node:node . .env app/
RUN npm install
RUN npm run build
RUN rm -rf src/ static/ Dockerfile
CMD ["node","build/index.js"]