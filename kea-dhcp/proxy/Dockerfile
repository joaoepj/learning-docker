# Debugging Docker Build
# docker build node-http-proxy --progress=plain --no-cache -t joaoepj/node-http-proxy:1
FROM node:lts-alpine
ENV NODE_ENV=production
#WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --omit=dev && mv node_modules ../
COPY express-index.js index.js
#COPY http-proxy-index.js index.js
EXPOSE 7000
#RUN chown -R node /usr/src/app
USER node
CMD ["node", "index.js"]
