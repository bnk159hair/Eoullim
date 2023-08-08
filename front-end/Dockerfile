FROM node:16.20.1-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM node:16.20.1-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
ENTRYPOINT ["serve", "-s", "build"]
