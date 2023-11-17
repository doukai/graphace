FROM node:16-alpine

WORKDIR /app

COPY ./node_modules ./node_modules
COPY ./apps/web/node_modules ./apps/web/node_modules
COPY ./apps/web/build ./apps/web/build
COPY ./apps/web/package.json ./apps/web/package.json

WORKDIR /app/apps/web
# This is the command that will be run inside the image when you tell Docker to start the container
CMD ["node","build/index.js"]