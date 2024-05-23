FROM openjdk:17
ARG JAR_FILE=build/libs/eureka-service.jar
COPY ${JAR_FILE} eureka-service.jar
ENTRYPOINT ["java", "-jar", "/eureka-service.jar"]