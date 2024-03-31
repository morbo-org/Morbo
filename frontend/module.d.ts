declare const DEV_MODE: boolean;

declare module "*.css" {
  export default {} as Record<string, string>;
}

declare module "eslint-plugin-import" {
  import type { Linter } from "eslint";

  export default {} as {
    configs: {
      recommended: Linter.BaseConfig;
      typescript: Linter.BaseConfig;
    };
  };
}
