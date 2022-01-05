import {SnakeNamingStrategy} from 'typeorm-naming-strategies';
import {ConnectionOptions} from 'typeorm';

export default <ConnectionOptions>{
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: process.env.DB_PW,
    database: 'inu_events',
    synchronize: true,
    logging: false,
    entities: [
        "src/entity/**/*.ts"
    ],
    migrations: [
        "src/migration/**/*.ts"
    ],
    subscribers: [
        "src/subscriber/**/*.ts"
    ],
    cli: {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migrations",
        "subscribersDir": "src/subscriber"
    },
    namingStrategy: new SnakeNamingStrategy()
};
