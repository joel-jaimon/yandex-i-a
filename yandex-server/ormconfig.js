module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [__dirname + "/src/entity/*.{js,ts}"],
  migrations: [__dirname + "/src/migration/*.ts"],
  subscribers: [__dirname + "/src/subscriber/*.ts"],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
