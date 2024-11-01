import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ...pluginJs.configs.recommended,
    ignores: [
      "node_modules",
      ".env",
      ".gitignore",
      ".prettierrc",
      "eslint.config.mjs",
      "examples",
      ".vscode",
      "auto-README-config.toml",
      "CONTRIBUTING.md",
      "LICENSE",
      "package-lock.json",
      "package.json",
      "README.md",
    ],
  },
];
