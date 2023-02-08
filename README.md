# CHLai Developer Test

### Docker Method

**For Q1**

1. Clone the repo to get `.env` and `docker-compose.yml` files
> There is some credential of database writing in the `docker-compose.yml` file, make sure the ``MYSQL`` environment database, username and password is identical with *`q1-backend`* environment values. 

2. Change the **`SERVER_URL`** in `.env` file to make sure *`q1-frontend`* can send request to the correct endpoint.
> *http://localhost:9901/api/v1* will do normally if serving up and browsing service on the same host, and didn't change **PORT** config in `docker-compose.yml`

3. `External docker network` has been using in `docker-compose.yml`, therefore need to create the network before you starting up the containers.
> Command to create required network: `docker network create gp-network` *(change the gp-network to something else if you wish to, kindly remember to change all the network value under each container in docker-compose.yml too.)*

4. Run `docker-compose up -d`, making sure you run this command at the same directory that holding the `docker-compose.yml` and `.env` file

5. **q1-backend** do come with a swagger page, which can accessible on *`http://localhost:9901/docs`*

6. **q1-frontend** is accessible on *`http://localhost:9900`*, kindly change accordingly if made any changes on either **`HOST`** or **`PORT`**


**For Q2**

1. Clone the repo to get `.env` and `docker-compose.yml` files

2. Make sure you follow the instruction No3 in **For Q1 - Docker Method** section to create required network

3. Run `docker-compose up -d`, making sure you run this command at the same directory that holding the `docker-compose.yml` and `.env` file

4. **q2-frontend** is accessible on *`http://localhost:9902`*, kindly change accordingly if made any changes on either **`HOST`** or **`PORT`**


---


### Non-Docker Method

**For Q1**

1. Go into `q1-backend` and run command below
> `go mod download`

2. Run command to build go package
> `go build -o build/serve` // notes that *build/serve* can be rename to something else, or remove `-o build/serve` to let Go handle by default

3. Serve up the package
> `./build/serve` // just run `./` following by the build output name will do

4. Go into `q1-frontend` and run command below
> `npm ci`

5. Run the following command if you wish to serve the build static file and you do not having any HTTP server tool running in the host
> `npm install --global serve`

6. This step is to build the app in production mode, kindly skip to No8 to skip build steps
> `npm run-script build`

7. Run the following command to serve the production react app
> `serve build`

8. Run the following command to run the app in development mode
> `npm run-script start`

9. **q1-backend** do come with a swagger page, which can accessible on *`http://localhost:9901/docs`*

10. **q1-frontend** is accessible on *`http://localhost:9900`*, kindly change accordingly if made any changes on either **`HOST`** or **`PORT`**



**For Q2**

1. Go into `q1-frontend` and run command below
> `npm ci`

2. Run the following command if you wish to serve the build static file and you do not having any HTTP server tool running in the host
> `npm install --global serve`

3. This step is to build the app in production mode, kindly skip to No8 to skip build steps
> `npm run-script build`

4. Run the following command to serve the production react app
> `serve build`

5. Run the following command to run the app in development mode
> `npm run-script start`

6. **q2-frontend** is accessible on *`http://localhost:3000`*, kindly change accordingly if made any changes on either **`HOST`** or **`PORT`**


---


> ## :warning: There is no custom PORT configuration implemented in manual serve method by the time. Kindly aware that serving both Q1 frontend and Q2 frontend might facing conflicts
