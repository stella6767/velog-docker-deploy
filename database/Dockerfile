FROM mysql

# 이미지 환경변수들 세팅
# 실전에서는 비밀번호 등을 이곳에 입력하지 말 것!
# 서버의 환경변수 등을 활용하세요.
ENV MYSQL_USER every
ENV MYSQL_PASSWORD apap5900
ENV MYSQL_ROOT_PASSWORD hodooai0000
ENV MYSQL_DATABASE every

# 도커환경에서 컨테이너 생성시 스크립트를 실행하는 폴더로
# 미리 작성된 스크립트들을 이동
# COPY ./scripts/ /docker-entrypoint-initdb.d/
RUN rm /etc/mysql/mysql.cnf
COPY ./mysql.cnf /etc/mysql