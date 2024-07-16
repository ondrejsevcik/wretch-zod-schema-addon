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

  it("returns null for allowed empty response", async () => {
    const result = await wretch()
      .addon(ZodAddon)
      .url("http://localhost/api/user")
      .get()
      // TODO implement schema based on response status code
      .maybeParsed(201, schema)
      .maybeParsed(204, schema)

    expect(result).toBeNull();
  });

  // TODO upgrade post
  // https://github.com/elbywan/wretch/tree/master?tab=readme-ov-file#because-sending-a-json-object-should-be-easy
  // wretch().post(body, schema)
  // wretch().get(schemas)
});