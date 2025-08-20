# Microservice Architecture

This folder demonstrates a simple Node.js microservice architecture with four components:

- **gateway/**: Main entry point for all requests. Routes calls to backend services.  
- **server1/**: Handles `/stress-test` requests. Runs locally.  
- **server2/**: Handles `/` requests. Runs on a remote machine, accessible via port forwarding.  
- **test/**: Contains a script for stress testing the gateway using `autocannon`.

----

## How It Works

- All requests go to the **gateway** server (port 3000).
- Requests to `/stress-test` are forwarded to **server1** (`http://localhost:3001`).
- Requests to `/` are forwarded to **server2** (remote, via port forwarding).



## Stress Test Results

Example output from the test script:
```
URL: http://localhost:3000/  
Number of requests: 39 
Duration (seconds): 30.27


URL: http://localhost:3000/stress-test
Number of requests: 40
Duration (seconds): 30.29
```

Based on these results, there is no significant performance improvement observed from transitioning to a microservices architecture in terms of request handling speed under current test conditions. However, the key advantage lies not in immediate speed gains but in scalability and modularity. With a microservices setup, individual components can be scaled or optimized independently.


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

**Notes**
Ensure port forwarding for server2 if running on a remote machine.  
Each service can be scaled and deployed independently.