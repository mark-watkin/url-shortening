# Our container for building the UI
FROM node:18-alpine3.14 as build

WORKDIR /working

COPY ./ ./

RUN npm install
RUN npm test
RUN npm run build

# Our final container for serving the API
FROM node:18-alpine3.14

WORKDIR /app

COPY --from=build /working/dist /app
COPY --from=build /working/node_modules /app/node_modules

EXPOSE 5000
CMD [ "node", "index.js" ]