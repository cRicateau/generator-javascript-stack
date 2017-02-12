## Installation

### Local dev server

```
cd client && webpack-dev-server --config config/webpack.config.js --content-base ../src/ --hot --no-info --colors --open --port 3000
```

### Install backend

- Launch VM: `vagrant up`

- Start server:
```
vagrant ssh
sudo su - www-data
cd <your-app>/current/client && npm rebuild node-sass
NODE_ENV=production npm run compile
npm start
```

## Tests
- Backend tests: `NODE_ENV=test ./node_modules/.bin/istanbul cover ./node_modules/.bin/mocha -- tests/backend/**/*.js -R spec`

- Frontend tests: `cd client && npm test`


## Database

Create the database:

```
createdb -U <databaseUser> -d <databaseName>
```

### Migrations:

- Create: `./node_modules/.bin/db-migrate create --sql-file`
- Down: `./node_modules/.bin/db-migrate down -e $NODE_ENV`
- Up: `./node_modules/.bin/db-migrate up -e $NODE_ENV`
