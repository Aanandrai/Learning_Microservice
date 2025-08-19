## Case1

### for this loop

**for(let i=0;i<1000000;i++)**

10 connections (default)


**condition 1**

Only one route of "/"

URL: http://localhost:3000
Number of requests:  31K
Duration (seconds): 30.03

_________________________

**condition 2**

With two route "/" and "/stress-test"

URL: http://localhost:3000
Number of requests:  17001
Duration (seconds): 30.03
URL: http://localhost:3000/stress-test
Number of requests:  17240
Duration (seconds): 30.01

_________________________________
_________________________________

### for loop
**for(let i=0;i<1000000000;i++)**

With two route "/" and "/stress-test"

URL: http://localhost:3000
Number of requests:  13
Duration (seconds): 30.23
URL: http://localhost:3000/stress-test
Number of requests:  0
Duration (seconds): 30.22
