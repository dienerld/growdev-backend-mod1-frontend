FROM node:16.16.0-alpine

WORKDIR /app

COPY . .

RUN yarn global add serve
RUN yarn --frozen-lockfile
RUN yarn build
RUN yarn install --production --frozen-lockfile

ENTRYPOINT ["serve", "-p", "7777", "-s","dist"]
