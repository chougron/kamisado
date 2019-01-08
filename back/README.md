# Medway API

## Migrations

To create a new migration, you can use the following command : `make db.migrate.create`

To run the migrations, use this command : `make db.migrate.run`

To rollback the last migration, use this command : `make db.migrate.rollback`

## Running

```
npm run build

POSTGRES_HOST=localhost POSTGRES_PORT=5432 POSTGRES_PASSWORD=medway POSTGRES_USER=medway POSTGRES_DB=medway APP_PORT=3000 npm run start
```
