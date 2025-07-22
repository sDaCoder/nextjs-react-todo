import { Pool } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from "./schema";

config({ path: ".env.local" });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

export const db = drizzle(pool, { schema });