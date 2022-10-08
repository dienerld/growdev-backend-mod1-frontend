FROM node:16.16.0-alpine

WORKDIR /app

COPY . .

ENV NODE_ENV=development
RUN yarn

ENTRYPOINT [ "tail", "-f", "/dev/null" ]

EXPOSE 5173
