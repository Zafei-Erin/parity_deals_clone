import { env } from "@/data/env/server";
import { defineConfig } from "drizzle-kit";
console.log(env.DATABASE_URL);
export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
