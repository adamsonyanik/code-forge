/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-typescript",
        "@vue/eslint-config-prettier/skip-formatting"
    ],
    overrides: [
        {
            files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"],
            extends: ["plugin:cypress/recommended"]
        }
    ],
    parserOptions: {
        ecmaVersion: "latest"
    },
    rules: {
        semi: "error",
        quotes: ["error", "double", { avoidEscape: true }],
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/prefer-namespace-keyword": "off",
        "@typescript-eslint/no-empty-function": "off",
        "no-empty": "off"
    }
};
