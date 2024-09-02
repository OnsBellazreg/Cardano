# Cardano Assignement

Cardano´s assignement is a web app written in React for sharing ski resort and trail information. It utilizes the Snowtooth GraphQL API to fetch trail data.

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [ReactJS](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [GraphQL Codegen](https://www.graphql-code-generator.com/docs/getting-started)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Jest](https://jestjs.io/)

## Setup Instructions

### 1. Set Up Environment Variables

Run the following command to set up environment variables:

```bash
cp .env.example .env
```

### 2. Install Dependencies

Run the following command to install dependencies:

```bash
yarn
```

### 3. Build

Run the following command to build the app:

```bash
yarn build
```

### 4. Start

Run the following command to start the server:

```bash
yarn start
```

## Generators

The app includes two generators for icons and GraphQL hooks:

- **SVGR**: Converts SVG icons into React components. For more information, visit the [SVGR documentation](https://react-svgr.com/docs/).
- **GraphQL Codegen**: Converts the GraphQL schema into TypeScript code, types, interfaces, and Apollo Client hooks. For more information, visit the [GraphQL Codegen documentation](https://www.graphql-code-generator.com/docs/getting-started).

## Docker Setup

You can use the following commands to build the Docker image and run it via Docker Compose:

```bash
docker compose build
docker compose up -d
```

## Testing

To run tests, use the following command:

```bash
yarn test
```

If environment variables are not required for running tests, you can simply run:

```bash
jest
```

You can also run tests individually by specifying the path to the file, e.g.:

```bash
yarn test path/to/file.ts
```

## Coding Standards

This app adheres to strict coding standards to maintain cleanliness and scalability:

- **ESLint**: Enforces code quality rules.
- **Prettier**: Formats code for consistency.
- **Absolute Paths**: Path aliases are used to keep import paths short. This is facilitated by [CRACO](https://github.com/gsoft-inc/craco), which allows overriding Create React App configuration without ejecting it.

### ESLint Configuration Summary

This ESLint configuration enforces coding standards and consistency across JavaScript and TypeScript projects. It includes:

- **Base Configurations**: Adopts recommended settings for both JavaScript and TypeScript.
- **Prettier Integration**: Ensures code adheres to Prettier's formatting rules.
- **Import Management**: Sorts imports automatically and discourages the use of relative import paths in favor of aliases.
- **Custom TypeScript Rules**: Adjusts TypeScript linting rules to reduce unnecessary restrictions.
- **Ignored Directories**: Excludes `node_modules`, `dist`, and `build` from linting.

This setup helps maintain a clean, readable, and well-organized codebase.

### TypeScript Configuration Summary

This TypeScript configuration optimizes development for React and Node.js projects:

- **Compatibility**: Targets ES5 with ESNext modules and supports modern JavaScript features.
- **Strict Type Checking**: Enforces strict type rules, consistent file casing, and safe switch statements.
- **Convenience**: Allows JavaScript files, skips type checking for declaration files, and supports JSON modules and synthetic imports.
- **JSX and Paths**: Uses react-jsx for JSX and sets up `@/*` as an alias for the src directory.
- **Exclusions**: Ignores `node_modules` and test files in the src directory during compilation.
