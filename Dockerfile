FROM node:16.16.0-alpine

WORKDIR /app

COPY . .



RUN yarn global add serve
RUN yarn
RUN yarn build
RUN yarn install --production --frozen-lockfile

ENV PORT=8080
ENV VITE_BASE_URL=https://dnr-todo-api.fly.dev/
ENTRYPOINT ["serve", "-p", "8080", "-s", "dist"]

EXPOSE $PORT
