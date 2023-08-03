FROM maven:3.6.3-openjdk-17-slim AS builder
WORKDIR /app
COPY ./ ./
#RUN ls -al
RUN mvn clean && mvn package

FROM openjdk:11
#ARG JAR_FILE=target/*.jar
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
