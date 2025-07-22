import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const todoTable = pgTable("todo", {
    id: uuid("id").primaryKey().defaultRandom(),
    todo: text("todo").notNull(),
    desc: text("desc"),
    isDone: boolean("isDone").notNull().default(false),
    deadline: timestamp("deadline").notNull(),
    addedAt: timestamp("addedAt").notNull().defaultNow(),
    editedAt: timestamp("editedAt").notNull().defaultNow(),
    completedAt: timestamp("completedAt"),
})