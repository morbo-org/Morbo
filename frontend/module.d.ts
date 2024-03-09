declare module "eslint-plugin-import" {
  import type { Linter } from "eslint";

  export default {} as {
    configs: {
      recommended: Linter.BaseConfig;
      typescript: Linter.BaseConfig;
    };
  };
}
