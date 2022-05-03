FROM postgres

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=1234
ENV POSTGRES_DB=amount

# https://hub.docker.com/_/postgres  -> see "Initialization scripts" section
COPY ./initial-data.sql /docker-entrypoint-initdb.d
