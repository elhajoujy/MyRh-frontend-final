FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]
# Stage 2
#FROM nginx:alpine
#COPY --from=builder /app/dist/comp-lib /usr/share/nginx/html


#https://dev.to/rodrigokamada/creating-and-running-an-angular-application-in-a-docker-container-40mk
#1- #docker build -t angular-docker .
#2- #docker run -p 4200:4200 angular-docker
