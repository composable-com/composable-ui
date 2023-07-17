FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /
COPY /package.json /pnpm-lock.yaml /pnpm-workspace.yaml ./
RUN pnpm i
COPY / .

WORKDIR /composable-ui
CMD ["pnpm", "dev"]

EXPOSE 3000
