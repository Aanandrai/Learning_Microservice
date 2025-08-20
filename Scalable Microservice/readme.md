# Scalable Microservice Architecture

This folder demonstrates a simple Node.js microservice architecture with four components:

- **gateway/**: Main entry point for all requests. Routes calls to backend services.  
- **server1/**: Handles `/stress-test` requests. Designed to run locally and scaled using Node.js clustering.
- **server2/**: Handles `/` requests. Runs on a remote machine, accessible via port forwarding, and also uses clustering.  
- **test/**: Contains a script for stress testing the gateway using `autocannon`.

----

## How It Works

- All requests go to the **gateway** server (port 3000).
- Requests to `/stress-test` are forwarded to **server1** (`http://localhost:3001`).
- Requests to `/` are forwarded to **server2** (remote, via port forwarding).



---

## Scalability Features

- **server1** and **server2** uses Node.js `cluster` and `os` modules to utilize all CPU cores, allowing it to handle more concurrent requests efficiently.
- Each service is independent, allowing for isolated scaling, updates, and deployments.
- The gateway acts as a reverse proxy, enabling centralized routing and potential load balancing.

---




## Stress Test Results

Example output from the test script:
**URL: http://localhost:3000/**  
**Number of requests:  26432**
**Duration (seconds): 30.03**


**URL: http://localhost:3000/stress-test**
**Number of requests:  27131**
**Duration (seconds): 30.03**

While raw speed improvements may not be immediately apparent, the architecture excels in scalability and modularity. Individual services can be optimized or scaled as needed, without impacting the rest of the system.


## Running the Services

1. Start **server1**:
```sh
   cd server1
   node server1.js
```


2. Start server2 (on remote machine, ensure port forwarding is set up):
```sh
   cd server2
   node server2.js
````

3. Start **gateway**:
```sh
    cd gateway
    node gateway.service.js
```

4. Run the stress test:
```sh
   cd test
   node stress-test.js
```
--------

## Key Concepts for Learning & Revision

- **Microservices**: Build applications as a set of small, independent services that communicate over APIs.
- **Clustering**: Use Node.js cluster module to scale services across multiple CPU cores.
- **API Gateway**: Centralizes routing, authentication, and monitoring for all incoming requests.
- **Port Forwarding**: Allows remote services to be accessed as if they were local.
- **Scalability**: Each service can be scaled independently based on demand.
- **Fault Isolation**: Failures in one service do not affect others, improving reliability.
- **Stress Testing**: Use tools like `autocannon` to measure performance and identify bottlenecks.

---


**Notes**  
- Ensure port forwarding for server2 if running on a remote machine. 