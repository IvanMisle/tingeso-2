FROM openjdk:17
ARG JAR_FILE=build/libs/gateway-service.jar
COPY ${JAR_FILE} gateway-service.jar
ENTRYPOINT ["java", "-jar", "/gateway-service.jar"]