# LiveUnity

![Nazirs Live Unity Project](./Nazirs%20Live%20Unity%20Project%20-%202023-1.webp)

##  My Motivation

##  Websites Purpose

## What I learned
- I learned how to use Socket.io RTC technology

##  Performance Reports

# Technologies and Tools Used

- HTML
- CSS
- JavaScript
- React
- Vite
- Node.js
- Docker
- Socket.io
- Express


Deployed Application: 

GitHub Repo: https://github.com/Batking74/LiveUnity




docker build -t batking74/liveunity:1.0 .

<!-- Run Each server in a container from the image -->
docker run -d --name server1 -p 8000:8000 
docker run -d --name server2 -p 7000:7000 
docker run -d --name server3 -p 9000:9000 

docker push batking74/liveunity:1.0


docker-compose up
