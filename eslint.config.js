const nextConfig = require("eslint-config-next");
const sonarjs = require("eslint-plugin-sonarjs");
const security = require("eslint-plugin-security");
const tseslint = require("typescript-eslint");

module.exports = [
  ...nextConfig,
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      sonarjs,
      security,
    },
    rules: {
      complexity: ["error", 20],
      "max-lines-per-function": [
        "error",
        { max: 250, skipBlankLines: true, skipComments: true },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "sonarjs/cognitive-complexity": ["error", 30],
      "sonarjs/no-duplicate-string": ["error", { threshold: 5 }],
      "sonarjs/no-identical-functions": "error",
      "security/detect-object-injection": "off",
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    rules: {
      "max-lines-per-function": "off",
    },
  },
];
