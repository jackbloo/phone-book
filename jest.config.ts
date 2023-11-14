export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png|webp)$": "identity-obj-proxy",
  },
  collectCoverageFrom: [
    "src/**",
    "!src/utils/**",
    "!src/store/**",
    "!src/main.tsx",
    "!src/Routes.tsx",
    "!src/apolloClient/**",
  ],
  transformIgnorePatterns: [
    "/node_modules/react-toastify/dist/ReactToastify.css",
  ],
};
