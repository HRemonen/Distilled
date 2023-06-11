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

Replace [the template env file](server/env.template) with a .env file with your setup.

Launch the app in development mode by running `docker-compose up --build` in the root folder.

This will start the frontend, backend and db in their own containers.

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

### Closing the application

Close the application with

```bash
docker compose down
```

## Features

- **Distillery Map**: View distilleries on an interactive map, making it easy to locate distilleries in different regions.
- **Search Functionality**: Search for distilleries or whiskeys based on name, location, type, or other criteria.
- **Detailed Distillery Information**: Access comprehensive details about each distillery, including its name, location, year of establishment, website, and whiskeys produced.
- **Whiskey Listings**: Browse a wide range of whiskeys, with information on their names, types, ages, and descriptions.
- **User Ratings and Comments**: Users can rate whiskeys and leave comments to share their experiences and opinions.
- **User Registration and Authentication**: Allow users to register accounts and log in

## License

The Distillery Application is released under the [MIT License](LICENSE).
