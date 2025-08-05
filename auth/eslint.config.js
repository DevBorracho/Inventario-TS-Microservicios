import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import unusedImports from "eslint-plugin-unused-imports";
import airbnbBase from "eslint-config-airbnb-base";
import airbnbBaseTypescript from "eslint-config-airbnb-base-typescript";

export default defineConfig([
  js.configs.recommended, // Config base de ESLint recomendada para JS
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], // Archivos a analizar (JS y TS)
    languageOptions: {
      parser: tsParser, // Parser para TypeScript (permite entender TS)
      globals: {
        ...globals.node, // Variables globales del entorno Node.js
        ...globals.browser, // Variables globales del navegador
      },
    },
    plugins: {
      "@typescript-eslint": tseslint, // Plugin oficial para TS
      "unused-imports": unusedImports, // Plugin para manejar imports no usados
    },
    rules: {
      ...airbnbBase.rules, // Reglas base de Airbnb para JS
      ...airbnbBaseTypescript.rules, // Reglas Airbnb para TS
      "no-unused-vars": "off", // Desactivamos regla nativa para no conflicto
      "unused-imports/no-unused-vars": [
        // Activamos regla del plugin
        "warn",
        {
          vars: "all", // Aplica a todas las variables
          varsIgnorePattern: "^_", // Ignora variables que comienzan con _
          args: "after-used", // Ignora argumentos usados después
          argsIgnorePattern: "^_", // Ignora argumentos que comienzan con _
          caughtErrorsIgnorePattern: "^_", // Ignora errores capturados con _
        },
      ],
    },
    settings: {
      "import/resolver": {
        // Resolver importaciones para extensiones comunes
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
]);
