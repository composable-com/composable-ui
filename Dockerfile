FROM node:18-alpine

RUN npm install -g pnpm

COPY . /cui
WORKDIR /cui
RUN pnpm i -r
WORKDIR /cui/composable-ui

CMD ["pnpm", "dev"]
EXPOSE 3000
