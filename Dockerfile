FROM node:slim as build
WORKDIR /app
COPY package.json .
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN /bin/ash -c 'set -ex && \
    ARCH=`uname -m`'

RUN 'if [ "$ARCH" == "x86_64" ]; then \
       echo "x86_64" && \
       apk add some-package; \
    else \
       echo "unknown arch" && \
       apk add some-other-package; fi'
# RUN apt-get update && apt-get install curl gnupg -y \
#   && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#   && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#   && apt-get update \
#   && apt-get install google-chrome-stable -y --no-install-recommends \
#   && rm -rf /var/lib/apt/lists/*

RUN npm install
COPY . .
RUN npm run build

CMD ["node", "build"]
