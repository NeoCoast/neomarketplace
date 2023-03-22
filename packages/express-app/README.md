## Express App

### Start server

>`yarn start`

### Create migration

>` prisma migrate dev --name {name}`

### Apply migration

>`yarn migrate`

### Delete data and tables from the database

>`yarn clean`

### Delete data, database, migrate, and seed all

>`yarn reset`

##### It excecutes the following steps in just one command

- yarn clean
- yarn migrate
- yarn seed
