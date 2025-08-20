# Node.js Architecture Comparison: Monolith, Microservice, and Scalable Microservice

This repository demonstrates three different Node.js architectures, each in its own folder:

- **MonolithServer/**: A simple monolithic server with two routes, highlighting bottlenecks under stress.  
- **Microservice/**: A basic microservice setup with gateway routing and independent services, showing modularity but still facing bottlenecks.  
- **Scalable Microservice/**: An improved microservice architecture using Node.js clustering and OS modules for better scalability.  

---

## 1. MonolithServer

A single Node.js server with two routes:

- `/` and `/stress-test`
- Both routes simulate heavy computation using a for-loop.

### Stress Testing

- Test script in `test/` uses [autocannon](https://github.com/mcollina/autocannon) for benchmarking.
- Two test conditions:
  1. Loop of `10^6` iterations.
  2. Loop of `10^9` iterations.

#### Bottleneck

- Under heavy load (`10^9`), the server becomes unresponsive, demonstrating the limitations of monolithic architecture.

```
URL: http://localhost:3000
Number of requests: 13
Duration (seconds): 30.23

URL: http://localhost:3000/stress-test
Number of requests: 0
Duration (seconds): 30.22
```

---

## 2. Microservice

A modular architecture split into four folders:

- **gateway/**: Routes requests to backend services.
- **server1/**: Handles `/stress-test` locally.
- **server2/**: Handles `/` on a remote machine (accessed via port forwarding).
- **test/**: Stress testing using autocannon.

### Stress Testing

- Requests to `/stress-test` go to server1.
- Requests to `/` go to server2.
- Bottlenecks persist under heavy load, but services are modular and independently deployable.

#### Bottleneck

- Under heavy load (`10^9`), the server becomes unresponsive, demonstrating the limitations of monolithic architecture.

```
URL: http://localhost:3000/
Number of requests: 39
Duration (seconds): 30.27

URL: http://localhost:3000/stress-test
Number of requests: 40
Duration (seconds): 30.29
```



---

## 3. Scalable Microservice

Similar to Microservice, but with enhanced scalability:

- **server1/** and **server2/** use Node.js `cluster` and `os` modules to utilize all CPU cores also both are on seperate machine.
- Each service can handle more concurrent requests.
- **gateway/** routes requests as before.
- **test/** performs stress testing.

### Stress Testing

- Improved concurrency and resilience.
- Bottlenecks are reduced, but not eliminated for extremely heavy computation.


```
URL: http://localhost:3000/ 
Number of requests:  26432  
Duration (seconds): 30.03 

URL: http://localhost:3000/stress-test  
Number of requests:  27131
Duration (seconds): 30.03  

```


---

## How to Run Each Project

### MonolithServer

```sh
cd MonolithServer
node app.js
cd test
node test.js
```

### Microservice

Start each service in separate terminals (server2 may require port forwarding):

```sh
cd Microservice/server1
node server1.js

cd Microservice/server2
node server2.js

cd Microservice/gateway
node gateway.service.js

cd Microservice/test
node test.js
```

### Scalable Microservice

Start each service in separate terminals (server2 may require port forwarding):

```sh
cd "Scalable Microservice"/server1
node server1.js

cd "Scalable Microservice"/server2
node server2.js

cd "Scalable Microservice"/gateway
node gateway.service.js

cd "Scalable Microservice"/test
node test.js
```

---

## Key Learnings

- **Monoliths** are simple but suffer from bottlenecks under load.
- **Microservices** offer modularity and independent scaling, but bottlenecks can persist if services are not optimized.
- **Scalable Microservices** leverage clustering for better CPU utilization and scalability.

---

## Tools Used

- [Express](https://expressjs.com/)
- [Morgan](https://github.com/expressjs/morgan)
- [express-http-proxy](https://github.com/villadora/express-http-proxy)
- [autocannon](https://github.com/mcollina/autocannon)
- Node.js `cluster` and `os` modules

---

**Note:**  
For remote services, ensure port forwarding is properly configured.