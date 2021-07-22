
# 도커허브에서 jdk 다운
FROM openjdk:8-jdk-alpine

#docker 내부에 app 폴더를 만듬
WORKDIR /app

#변수를 하나지정, 현재 내 폴더에서 target 폴더 안에 jar 파일을 찾아서, 
ARG JAR_FILE=target/*.jar

#app.jar로 복사해서  /app 폴더 안에 위치
COPY ${JAR_FILE} app.jar

#위에 다하고 나서, prod profile을 참고해서 app.jar를 실행
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
