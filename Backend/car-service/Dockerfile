FROM openjdk:17
ARG JAR_FILE=build/libs/car-service.jar
COPY ${JAR_FILE} car-service.jar
ENTRYPOINT ["java", "-jar", "/car-service.jar"]