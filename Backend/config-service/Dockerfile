FROM openjdk:17
ARG JAR_FILE=build/libs/config-service.jar
COPY ${JAR_FILE} config-service.jar
ENTRYPOINT ["java", "-jar", "/config-service.jar"]