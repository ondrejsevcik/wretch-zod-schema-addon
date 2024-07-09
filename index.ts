import type {
  Wretch,
  Config,
  WretchAddon,
  WretchErrorCallback,
  WretchResponseChain,
} from "wretch";
import type { ZodType } from "zod";

export interface ZodSchemaAddon {}

export interface ZodSchemaResolver {
  withSchema: <T, C extends ZodSchemaResolver, R, Output extends unknown>(
    this: C & WretchResponseChain<T, C, R>,
    schema: ZodType<Output>
  ) => Promise<Output>;
}

export const addon: () => WretchAddon<
  ZodSchemaAddon,
  ZodSchemaResolver
> = () => {
  return {
    resolver: {
      withSchema(schema) {
        return this.json().then((json) => schema.parse(json));
      },
    },
  };
};
