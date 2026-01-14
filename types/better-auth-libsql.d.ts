declare module "better-auth/adapters/libsql/index.js" {
  import type { Adapter } from "better-auth";
  export function libsqlAdapter(client: any): Adapter;
}
