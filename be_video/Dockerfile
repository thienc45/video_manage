# Use an official OpenJDK 17 JDK Alpine image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged JAR file into the container
COPY target/BE-API-0.0.1-SNAPSHOT.jar BE-API-0.0.1-SNAPSHOT.jar

# Set the entry point for the container to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "BE-API-0.0.1-SNAPSHOT.jar"]