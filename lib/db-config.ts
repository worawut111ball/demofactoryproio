/**
 * Database configuration utility
 * Centralizes all database connection configuration from environment variables
 */

// Database connection parameters
export const dbConfig = {
  provider: process.env.DB_PROVIDER || "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "3306", 10),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "factorypro_db",
  schema: process.env.DB_SCHEMA || "public",

  // Connection pool
  pool: {
    min: Number.parseInt(process.env.DB_POOL_MIN || "1", 10),
    max: Number.parseInt(process.env.DB_POOL_MAX || "10", 10),
  },

  // SSL configuration
  ssl: {
    enabled: process.env.DB_SSL_ENABLED === "true",
    ca: process.env.DB_SSL_CA_CERT,
    key: process.env.DB_SSL_KEY,
    cert: process.env.DB_SSL_CERT,
  },

  // Logging
  log: {
    level: process.env.DB_LOG_LEVEL || "info",
    queries: process.env.PRISMA_LOG_QUERIES === "true",
    errorFormat: process.env.PRISMA_ERROR_FORMAT || "pretty",
  },
}

/**
 * Builds a database connection URL from individual environment variables
 */
export function buildDatabaseUrl(): string {
  const { provider, host, port, user, password, database, schema } = dbConfig

  // Build the basic connection URL based on provider
  let url = ""

  if (provider === "mysql") {
    url = `mysql://${user}:${password}@${host}:${port}/${database}`
  } else if (provider === "postgresql") {
    url = `postgresql://${user}:${password}@${host}:${port}/${database}`
    // Add schema if provided for PostgreSQL
    if (schema) {
      url += `?schema=${schema}`
    }
  } else {
    // Default to MySQL if provider is not recognized
    url = `mysql://${user}:${password}@${host}:${port}/${database}`
  }

  // Add SSL parameters if enabled
  if (dbConfig.ssl.enabled) {
    const sslParams = []

    if (url.includes("?")) {
      url += "&"
    } else {
      url += "?"
    }

    if (provider === "postgresql") {
      url += "sslmode=require"
    } else if (provider === "mysql") {
      url += "ssl=true"
    }

    // Add additional SSL parameters if provided
    if (dbConfig.ssl.ca) sslParams.push(`sslrootcert=${dbConfig.ssl.ca}`)
    if (dbConfig.ssl.key) sslParams.push(`sslkey=${dbConfig.ssl.key}`)
    if (dbConfig.ssl.cert) sslParams.push(`sslcert=${dbConfig.ssl.cert}`)

    if (sslParams.length > 0) {
      url += "&" + sslParams.join("&")
    }
  }

  return url
}

/**
 * Gets the database URL, either from DATABASE_URL environment variable
 * or constructs it from individual parameters
 */
export function getDatabaseUrl(): string {
  return process.env.DATABASE_URL || buildDatabaseUrl()
}

/**
 * Gets Prisma client configuration options based on environment variables
 */
export function getPrismaClientOptions() {
  const options: any = {
    log: [],
  }

  // Configure logging based on environment variables
  if (dbConfig.log.queries) {
    if (dbConfig.log.level === "query" || dbConfig.log.level === "info") {
      options.log.push("query")
    }
    if (dbConfig.log.level === "info" || dbConfig.log.level === "warn" || dbConfig.log.level === "error") {
      options.log.push("info")
    }
    if (dbConfig.log.level === "warn" || dbConfig.log.level === "error") {
      options.log.push("warn")
    }
    if (dbConfig.log.level === "error") {
      options.log.push("error")
    }
  }

  // Add error formatting
  if (dbConfig.log.errorFormat) {
    options.errorFormat = dbConfig.log.errorFormat
  }

  return options
}
