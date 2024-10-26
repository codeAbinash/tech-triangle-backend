declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string
    EMAIL: string
    EMAIL_PASSWORD: string
    JWT_SECRET: string
    REDIS_PASSWORD: string
    REDIS_HOST: string
    REDIS_PORT: number
    UPSTASH_URI: string
  }
}
