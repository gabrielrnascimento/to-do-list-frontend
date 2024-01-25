module.exports = {
    extends: [
        "standard-with-typescript",
        "next/core-web-vitals",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "prettier",
    ],
    plugins: ["react", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    overrides: [
        {
            files: ["cypress.config.ts", "tests/cypress/**/*.ts"],
            parserOptions: {
                project: ["./tests/cypress/tsconfig.json"],
            },
        },
    ],
    rules: {
        "@typescript-eslint/consistent-type-definitions": "off",
    },
};