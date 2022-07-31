export = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_NAME || 'hacker_news_stories',
      user: process.env.POSTGRES_USER || 'hacker_news_stories',
      password: process.env.POSTGRES_PASSWORD || 'hacker_news_stories',
      port: process.env.POSTGRES_PORT || 5432,
      host: process.env.POSTGRES_HOST || 'localhost'
    },
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './seeds'
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './seeds'
    },
    ssl: {
      rejectUnauthorized: false
    },
    pool: {
      min: 2,
      max: 10
    }
    
  }
};