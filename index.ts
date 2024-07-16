import type {
  Wretch,
  Config,
  WretchAddon,
  WretchResponseChain,
} from "wretch";
import type { ZodType } from "zod";

export interface ZodResolver {
  parsed: <T, C extends ZodResolver, R, Output>(this: C & WretchResponseChain<T, C, R>, schema: ZodType<Output>) => Promise<Output>;
}

export const ZodAddon: WretchAddon<unknown, ZodResolver> = {
  resolver: {
    parsed(schema) {
      return this.json().then((json) => schema.parse(json));
    }
  },
};
