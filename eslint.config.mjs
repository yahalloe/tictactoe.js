import js from "@eslint/js";

import globals from "globals";

import { defineConfig } from "eslint/config";

export default defineConfig({
  extends: [js.configs.recommended],

  files: ["src/**/*.{js,jsx,ts,tsx}"],

  ignores: ["**/node_modules/**"],

  rules: {
    eqeqeq: ["error", "always"],

    semi: ["error", "never"],

    quotes: ["error", "single"],

    indent: ["error", 2],
  },

  languageOptions: {
    ecmaVersion: "latest",

    sourceType: "module",

    globals: {
      ...globals.browser, // ✅ Enables browser globals (console, window, document, etc.)

      ...globals.node, // ✅ Enables Node.js globals (console, process, __dirname, etc.)
    },
  },
});
