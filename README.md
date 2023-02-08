# CHLai Developer Test

### For Q1

**Docker Method**

1. Clone the repo to get `.env` and `docker-compose.yml` files
> There is some credential of database writing in the `docker-compose.yml` file, make sure the ``MYSQL`` environment database, username and password is identical with *`q1-backend`* environment values. 

2. Change the **`SERVER_URL`** in `.env` file to make sure *`q1-frontend`* can send request to the correct endpoint.
> *http://localhost:9901/api/v1* will do normally if serving up and browsing service on the same host, and didn't change **PORT** config in `docker-compose.yml`

3. `External docker network` has been using in `docker-compose.yml`, therefore need to create the network before you starting up the containers.
> Command to create required network: `docker network create gp-network` *(change the gp-network to something else if you wish to, kindly remember to change all the network value under each container in docker-compose.yml too.)*

4. Run `docker-compose up -d`, making sure you run this command at the same directory that holding the `docker-compose.yml` and `.env` file

5. **q1-backend** do come with a swagger page, which can accessible on *`http://localhost:9901/docs`*

6. **q1-frontend** is accessible on *`http://localhost:9900`*, kindly change accordingly if made any changes on either **`HOST`** or **`PORT`**


### For Q2

**Docker Method**

1. Clone the repo to get `.env` and `docker-compose.yml` files

2. Make sure you follow the instruction No3 in **For Q1 - Docker Method** section to create required network

3. Run `docker-compose up -d`, making sure you run this command at the same directory that holding the `docker-compose.yml` and `.env` file

4. **q2-frontend** is accessible on *`http://localhost:9902`*, kindly change accordingly if made any changes on either **`HOST`** or **`PORT`**
