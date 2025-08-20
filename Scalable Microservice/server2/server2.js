import express from "express";
import morgan from "morgan";
import os from "os";
import cluster from "cluster";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    const app = express();
    app.use(morgan("dev"));

    app.get("/", (req, res) => {
        for (let i = 0; i < 1000000000; i++) {
            // Simulate heavy computation
        }
        res.send("Hello world");
    });

    app.listen(3002, () => {
        console.log(`Worker ${process.pid} running on http://localhost:3002`);
    })
}


