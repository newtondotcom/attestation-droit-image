FROM node:18-alpine
LABEL Developers="Robin Augereau"

RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake


USER node:node

EXPOSE 3000
WORKDIR /app
COPY --chown=node:node . .
COPY --chown=node:node .env .
RUN yarn
RUN yarn build
RUN rm -rf src/ Dockerfile

CMD ["node","build/index.js"]