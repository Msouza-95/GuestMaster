module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_RANDOM_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  entities: [`${process.env.NODE_ENV === 'dev'
    ? './src/modules/**/infra/typeorm/entities/*.ts'
    :'./dist/modules/**/infra/typeorm/entities/*.js'}`],

  migrations: [`${process.env.NODE_ENV === 'dev'
    ? './src/shared/infra/typeorm/migrations/*.ts'
    :'./dist/shared/infra/typeorm/migrations/*.js'}`],
  cli: {
    // entitiesDir: './src/modules/**/infra/typeorm/entities/',
    migrationsDir: `./${process.env.NODE_ENV === 'dev' ? 'src' :'dist'}/shared/infra/typeorm/migrations`
  }
}
