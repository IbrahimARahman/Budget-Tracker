import type { Config } from "drizzle-kit";

export default {
    schema: "./utils/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DB_URL!,
    },
    verbose: true,
    strict: true,
} satisfies Config;
