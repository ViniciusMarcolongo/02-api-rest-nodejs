import js from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Ignorar compilados e dependências
  {
    ignores: ["dist/", "node_modules/"],
  },

  // Base JS
  js.configs.recommended,

  // Recomendado para TypeScript (sem type-check por performance)
  ...tseslint.configs.recommended,

  // Regras/Parser para arquivos TS
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Se quiser regras que dependem do type-check, descomente a linha abaixo e garanta um tsconfig único:
        // project: ['./tsconfig.json'],
        sourceType: "module",
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-misused-promises": "off",
    },
  },

  // Integração com Prettier (mantém ESLint fora do território do formatter)
  {
    rules: {
      ...((await import("eslint-config-prettier")).default ?? {}),
    },
  },
];
