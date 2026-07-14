// ESLint 9 flat config for the React frontend (ES modules + JSX).
import react from "eslint-plugin-react";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    plugins: { react },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: "readonly",
        document: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      eqeqeq: "error",
      // Mark JSX-referenced identifiers (components, React) as used.
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",
    },
  },
];
