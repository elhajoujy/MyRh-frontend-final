# Stage 1
FROM node:18.10 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN ls
# Stage 2
#FROM nginx:alpine
#COPY --from=builder /app/dist/comp-lib /usr/share/nginx/html

#docker build -t elhjoujy/angular-app .
#docker run -d -it -p 80:80/tcp --name angular-app elhjoujy/angular-app:latest
