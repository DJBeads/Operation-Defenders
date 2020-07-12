FROM database
COPY package.json /views
WORKDIR /app
RUN npm install
COPY . /app
CMD ["cmd", "start"]
