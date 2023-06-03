

## Development
Replace [the template env file](server/env.template) with a .env file with your setup.

Launch the app in development mode by running `docker-compose up --build` in the root folder.

### Init database tables

After launching the application in development mode initialize the Postgres database with

``` bash
docker exec tsoha-api poetry run python3 database/init_db.py
```

### View database in development

You can view database tables and interact with the database with

```bash
docker exec -it tsoha-db psql tsoha-db -U postgres -W
```

If you have changes the docker-compose.yml and your database strings in .env file the command will be in form

```bash
docker exec -it <container-name> psql <DB_NAME> -U <DB_USER> -W
```

You will be prompted the DB_PASSWORD when using this command

### Closing the application

Close the application with

```bash
docker compose down
```