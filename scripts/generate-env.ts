/**
 * Script to generate a .env file with database configuration
 *
 * Usage:
 * npx ts-node scripts/generate-env.ts
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");
// Define the template for the .env file
const envTemplate = `# Database Connection
DB_PROVIDER={{provider}}
DB_HOST={{host}}
DB_PORT={{port}}
DB_USER={{user}}
DB_PASSWORD={{password}}
DB_NAME={{database}}
DB_SCHEMA={{schema}}

# Database Connection URL (will be constructed from above variables)
DATABASE_URL="{{provider}}://{{user}}:{{password}}@{{host}}:{{port}}/{{database}}{{schemaParam}}"

# Database Connection Pool
DB_POOL_MIN=1
DB_POOL_MAX=10

# Database Logging
DB_LOG_LEVEL=info  # options: query, info, warn, error

# Database SSL
DB_SSL_ENABLED=false
# DB_SSL_CA_CERT=
# DB_SSL_KEY=
# DB_SSL_CERT=

# Prisma
PRISMA_LOG_QUERIES=true
PRISMA_ERROR_FORMAT=pretty  # options: pretty, colorless, minimal

# Application Settings
APP_NAME=Factory Pro
APP_PORT=3000
APP_BASE_URL=http://localhost:3000
`

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Function to ask questions and get user input
function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

async function generateEnvFile() {
  console.log("Generating .env file for database configuration...")

  // Ask for database configuration
  const dbProvider = (await askQuestion("Database provider (mysql/postgresql) [postgresql]: ")) || "postgresql"
  const dbHost = (await askQuestion("Database host [localhost]: ")) || "localhost"
  const dbPort =
    dbProvider === "mysql"
      ? (await askQuestion("Database port [3306]: ")) || "3306"
      : (await askQuestion("Database port [5432]: ")) || "5432"
  const dbUser = await askQuestion("Database username: ")
  const dbPassword = await askQuestion("Database password: ")
  const dbName = (await askQuestion("Database name [factorypro_db]: ")) || "factorypro_db"
  const dbSchema = dbProvider === "postgresql" ? (await askQuestion("Database schema [public]: ")) || "public" : ""

  // Generate schema parameter for URL
  const schemaParam = dbProvider === "postgresql" && dbSchema ? `?schema=${dbSchema}` : ""

  // Generate the .env file content
  const envContent = envTemplate
    .replace(/{{provider}}/g, dbProvider)
    .replace(/{{host}}/g, dbHost)
    .replace(/{{port}}/g, dbPort)
    .replace(/{{user}}/g, dbUser)
    .replace(/{{password}}/g, dbPassword)
    .replace(/{{database}}/g, dbName)
    .replace(/{{schema}}/g, dbSchema)
    .replace(/{{schemaParam}}/g, schemaParam)

  // Write the .env file
  const envPath = path.resolve(process.cwd(), ".env")
  fs.writeFileSync(envPath, envContent)

  console.log(`\n.env file generated at ${envPath}`)
  console.log("You can now run `npx prisma generate` and `npx prisma db push` to set up your database.")

  rl.close()
}

// Run the script
generateEnvFile().catch((error) => {
  console.error("Error generating .env file:", error)
  process.exit(1)
})
