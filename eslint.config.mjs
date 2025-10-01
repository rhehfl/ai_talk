// /eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    // 전체 프로젝트에 적용될 기본 설정
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      ".yarn/**",
      "packages/front/next-env.d.ts",
    ],
  },
  // JavaScript 파일 기본 규칙
  pluginJs.configs.recommended,
  // TypeScript 파일 기본 규칙
  ...tseslint.configs.recommended,

  // React/Next.js (front) 패키지 설정
  {
    files: ["packages/front/**/*.{js,jsx,ts,tsx}"],
    ...pluginReactConfig,
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react/react-in-jsx-scope": "off", // Next.js 17+ 에서는 React import 불필요
    },
    settings: {
      next: {
        rootDir: "packages/front/",
      },
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  // Node.js (back) 패키지 설정
  {
    files: ["packages/back/**/*.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
