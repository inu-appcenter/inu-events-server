import {SnakeNamingStrategy} from 'typeorm-naming-strategies';
import {ConnectionOptions} from 'typeorm';

export default <ConnectionOptions>{
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'inu_events',
    synchronize: true,
    logging: false,
    entities: [
        __dirname + "/entity/**/*"
    ],
    migrations: [
        __dirname + "/migration/**/*"
    ],
    cli: {
        "entitiesDir": "entity",
        "migrationsDir": "migrations",
    },
    namingStrategy: new SnakeNamingStrategy()
};
