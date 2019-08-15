FROM node
COPY package.json /app/
WORKDIR /app
RUN yarn
COPY . /app/
​
ENTRYPOINT [ "yarn", "gulp" ]