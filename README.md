# request-endpoint-as-a-queue

###### Nodejs application wich implements the requests to the
###### /api/amount/queue endpoint as a queue.
#
###### Understanding
###### Let's say you have a system wich rents houses and there are
###### 5 houses left now. What would happen if many, 200 or
###### more requests are made at once for an endpoint wich its access
###### is not through FIFO order to rent 1 house? They all would
###### read 5 from the database and decrement 1 but they all read
###### at the same time and decrement will worth nothing. Now you
###### have 200 users seeing that there is a house for renting.
#
###### A solution is to send the user data sent in the request
###### for /api/rent to a queue (a job to a queue).
###### The other part of the application (worker) will process
###### each job in the queue wich means reserve and decrement the 
###### amount available. The first 5 in line would get the reserve
###### and the rest will receive a message that there are no more
###### houses.
#
###### I am not considering reserving for an amount of time and if
###### the user does not pay within this time, remove the reservation
###### and other things. The focus here is a way of implementing a
###### queue for the endpoint.
#
###### For a better visualization, the example application will make
###### 400 requests to increment a column in the database. Its
###### initial value is 0 and each request will increment 1.
###### When you do the requests to the non-queue endpoint you may
###### expect the amount in database to be 400 but no because the
###### requests read 0 atthe same time and increment 1.
###### With queue endpoint (FIFO order), a request read 0 and
###### increment 1, the next read 1 and increment 1 (now is 2)
###### and so on.

###### The jobs are stored in the Redis Database

### Dependencies in your machine
- Nodejs
- Docker

### Installation
1. Clone project with
```git clone https://github.com/arthurgithub123/request-endpoint-as-a-queue.git```

### Running the application
1. Start Docker
2. Go to project root folder
3. Execute ```docker compose up``` command to create the containers
4. Once the containers are running you can make the requests
5. An example of script for making the requests:
```
const axios = require('axios');
const requests = [];
// /api/amount/queue

for(let i=0; i < 400; i++) {
  requests.push(
  axios.post('http://localhost:15000/api/amount/no_queue')
    .catch(err => console.log(err))
  );
}

Promise.all(requests)
  .then(() => console.log('Requests sent'))
  .catch(err => console.log(err));
```
