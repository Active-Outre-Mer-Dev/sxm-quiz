import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import type { Leaderboards, User } from "@prisma/client";

type Database = { leaderboards: Leaderboards; users: User };

export const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL
  })
});
