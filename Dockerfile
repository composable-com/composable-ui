FROM node:18-bookworm
# For an in depth guide on configuring the base node image, see the official Next.js with-docker example here:
# https://github.com/vercel/next.js/tree/canary/examples/with-docker

RUN npm install -g pnpm

COPY . /cui
WORKDIR /cui
RUN pnpm i -r
WORKDIR /cui/composable-ui

CMD ["pnpm", "dev"]
EXPOSE 3000
