FROM golang:1.20.1-alpine3.17

EXPOSE 13370

WORKDIR /app

COPY src ./

RUN go mod init webapp
RUN go build -o webapp

CMD [ "./webapp" ]