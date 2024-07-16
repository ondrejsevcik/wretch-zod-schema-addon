import { expect, it, describe } from "vitest";
import { ZodAddon } from "./index";
import wretch from "wretch";
import z from "zod";

const schema = z.object({ name: z.string() });

describe("ZodAddon", () => {
  it("returns parsed response body", async () => {
    const queryParams = { hello: "hello" }
    const result = await wretch()
      .addon(ZodAddon)
      .url("http://localhost/api/user")
      .queryParams(queryParams, schema)
      .get()
      .parsed(schema)

    expect(result.name).toBeDefined();
  });
});