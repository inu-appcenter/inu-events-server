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
        "/src/entity/**/*.ts"
    ],
    migrations: [
        "/src/migration/**/*.ts"
    ],
    subscribers: [
        "/src/subscriber/**/*.ts"
    ],
    cli: {
        "entitiesDir": "/src/entity",
        "migrationsDir": "/src/migrations",
        "subscribersDir": "/src/subscriber"
    },
    namingStrategy: new SnakeNamingStrategy()
};
