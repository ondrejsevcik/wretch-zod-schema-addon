import type {
  Wretch,
  Config,
  WretchAddon,
  WretchErrorCallback,
  WretchResponseChain,
} from "wretch";
import type { ZodType } from "zod";

export interface ZodWretch {
  responseBodySchema: <T extends ZodWretch, C, R, Output>(this: T & Wretch<T, C, R>, schema: ZodType<Output>) => this
}

export interface ZodResolver {
  parsed: <T, C extends ZodResolver, R, Output extends unknown>(
    this: C & WretchResponseChain<T, C, R>,
  ) => Promise<Output>;
}

export const addon: () => WretchAddon<ZodWretch, ZodResolver> = () => {
  return {
    wretch: {
      responseBodySchema(schema) {
        return { ...this, _options: { ...this._options, responseBodySchema: schema } }
      },
    },
    resolver: {
      // responseBodySchema(schema) {
      //   return this.json().then((json) => schema.parse(json));
      // },
      parsed() {
        return this.json().then((json) => this._options.responseBodySchema.parse(json));
      }
    },
  };
};
