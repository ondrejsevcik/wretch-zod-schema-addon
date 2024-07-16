import type {
  Wretch,
  Config,
  WretchAddon,
  WretchResponseChain,
} from "wretch";
import type { ZodType } from "zod";

export interface ZodWretch {
  queryParams: <T extends ZodWretch, C, R, Output>(this: T & Wretch<T, C, R>, params: unknown, schema: ZodType<Output>) => this
}

export interface ZodResolver {
  parsed: <T, C extends ZodResolver, R, Output>(this: C & WretchResponseChain<T, C, R>, schema: ZodType<Output>) => Promise<Output>;
}

export const ZodAddon: WretchAddon<ZodWretch, ZodResolver> = {
  wretch: {
    queryParams(params, schema) {
      const parsedParams = schema.parse(params);

      // TODO implement proper qp serialization
      return this;
    }
  },
  resolver: {
    parsed(schema) {
      return this.json().then((json) => schema.parse(json));
    }
    maybeParsed(statusCode, schema) {
      const maybeSchema = schema.catch(() => null);

      return this.res(async (response) => {
        if (response.statusCode === statusCode) {
          return maybeSchema.parse(null);
        }

        return response;
      })
    }
  },
};
