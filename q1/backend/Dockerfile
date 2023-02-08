FROM golang:1.19.5-alpine

WORKDIR server

COPY . .

RUN go build -o build/serve

CMD ["./build/serve"]