# Distilled

Dive into the world of Distilled and embark on an extraordinary whiskey crusade like no other. Unleash your inner whiskey adventurer, savor the flavors of the finest spirits, and connect with fellow enthusiasts who share your passion. Let Distilled be your compass, guiding you on a thrilling quest through the realms of golden nectar and everlasting memories.

License to sip, license to explore - Distillery Explorer is here to tantalize your senses and ignite your whiskey wanderlust!

🥃 Cheers to new horizons and the remarkable journeys that await! 🥃

## Stacx

The Distillery Application is built using the following technologies:

- **Backend Magic**: Python, Flask, SQLAlchemy, SQL
- **Frontend Wizardry**: React, React Query, Tailwind Css
- **Database Enchantment**: PostgreSQL
- **Mapping Mayhem**: Mapbox API
- **Authentication Sorcery**: JWT
- **Validation Anarchy**: Zod, Marshmallow
- **Environment**: Docker, docker compose

## Development

Initialize the project environment variables with

```bash
npm run init
```

in the root folder.

** OR **

Replace [the template backend env file](src/server/.env.template) with a .env file with your setup.
Also provide your mapbox access token [to the template frontend env file](src/client/.env.template).

Launch the app in development mode with

```bash
npm run start:dev
```

in the root folder.

This will start the frontend, backend and db in their own containers.

Access the application at `http://localhost:3000/`

You can also access the rest api at `http://localhost:5000/`. Be sure to check out the available endpoints from the routes file.

### View database in development

You can view database tables and interact with the database with

```bash
docker exec -it distillery-db psql distillery-db -U postgres -W
```

If you have changes the docker-compose.yml and your database strings in .env file the command will be in form

```bash
docker exec -it <container-name> psql <DB_NAME> -U <DB_USER> -W
```

You will be prompted the DB_PASSWORD when using this command

### Installing new packages

Now the docker compose volumes are configured so that the client node_modules are not shared with local and container space.

This is because of development in ARM chips causes some packages to be transpiled as non compatible for Linux systems or whatever so the container can not run the application.

If you are developing using Linux you could change the [docker-compose.dev.yml]() app services volumes to

```yml
volumes:
  - ./src/client:/usr/src/app
  - ./src/client/node_modules:/usr/src/app/node_modules
```

This way the node_modules are shared across the container and local.

Otherwise you must rebuild the image after new package installations

### Closing the application

Close the application with

```bash
docker compose -f docker-compose.dev.yml down
```

## Production

On the project root run

```bash
npm run build
```

to build the frontend and serve the files to the Flask backend.

If you get permission error for the build script just run the following command that
changes the execution permissions for the script

```bash
chmod +x build-script.sh
```

Launch the production build with

```
npm start
```

Access the application at `http://localhost:5000/`

## Features

- **Distillery Map**: View distilleries on an interactive map, making it easy to locate distilleries in different regions.
- **Search Functionality**: Search for distilleries based on name
- **Detailed Distillery Information**: Access comprehensive details about each distillery, including its name, location, year of establishment, website, and whiskeys produced.
- **Whiskey Listings**: Browse a wide range of whiskeys, with information on their names, types, ages, and descriptions.
- **User Ratings and Comments**: Users can rate distilleries and leave comments to share their experiences and opinions.
- **User Registration and Authentication**: Allow users to register accounts and log in

## License

The Distillery Application is released under the [MIT License](LICENSE).
