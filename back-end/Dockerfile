FROM openjdk:11 AS builder
WORKDIR /app
COPY ./ ./
#RUN ls -al
RUN chmod +x ./gradlew
RUN ./gradlew clean && ./gradlew build

FROM openjdk:11
#ARG JAR_FILE=target/*.jar
COPY --from=builder /app/build/libs/eoullim-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
