FROM maven:3.9.0-eclipse-temurin-17-alpine
EXPOSE 13373
WORKDIR /app
COPY spring/ .
RUN mvn clean package
CMD [ "./mvnw", "spring-boot:run" ]