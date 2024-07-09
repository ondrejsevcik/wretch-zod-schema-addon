// sum.test.js
import { expect, test } from "vitest";
import { addon } from "./index";
import wretch from "wretch";
import z from "zod";

const schema = z.object({ name: z.string() });

test("adds 1 + 2 to equal 3", async () => {
  const typesObject = await wretch()
    .addon(addon())
    .url("http://localhost/api/user")
    .get()
    .withSchema(schema);

  expect(typesObject).toBeDefined();
});
