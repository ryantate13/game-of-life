FROM ryantate13/node:build
RUN apk add pixman-dev cairo-dev pango-dev libjpeg-turbo-dev
# cache deps install as layer
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm i

COPY src /app/src
COPY public /app/public
COPY tsconfig.json /app/tsconfig.json

ENV CI=true
CMD ["npm", "start"]
