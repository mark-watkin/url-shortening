# Our container for building the UI
FROM node:18-alpine3.14 as build

WORKDIR /working

COPY ./ ./

RUN npm install
RUN CI=ture npm test
RUN CI=ture npm run build

# Our final container for serving the UI
FROM nginx:1.21.6

COPY --from=build /working/build /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf:ro