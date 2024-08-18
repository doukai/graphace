FROM node:18-alpine

# RUN npm install -g pnpm

WORKDIR /app
# COPY . .
# RUN pnpm install --frozen-lockfile
# RUN pnpm run build

COPY ../../node_modules ./node_modules
COPY ./node_modules ./graphence/node_modules
COPY ./build ./graphence/build
COPY ./package.json ./graphence/package.json

WORKDIR /app/graphence
# This is the command that will be run inside the image when you tell Docker to start the container
CMD ["node","build/index.js"]