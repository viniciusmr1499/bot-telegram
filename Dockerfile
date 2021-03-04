FROM node:lts-alpine AS build
WORKDIR /src
COPY . .
RUN yarn install --silent --ignore-optional --no-progress
# RUN yarn install --silent --ignore-optional --no-progress && yarn build

FROM node:lts-alpine
WORKDIR /src
# COPY --from=build /src/dist /src/dist
COPY --from=build /src/node_modules /src/node_modules
COPY --from=build /src/package.json ./
CMD yarn start