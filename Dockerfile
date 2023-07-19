FROM node:18-alpine

RUN npm install -g pnpm

COPY . .
WORKDIR /composable-ui
RUN pnpm i -r

CMD ["pnpm", "dev"]
EXPOSE 3000