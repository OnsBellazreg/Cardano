module.exports = {
  collectCoverage: true,
  transform: {
    '.(ts|tsx)': 'ts-jest',
    '^.+\\.svg$': 'jest-transform-stub',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
  ],
  testEnvironment: 'jsdom',
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^react-icons/(.*)$': '<rootDir>/src/__mocks__/react-icons.ts',
    '^@/context/favorite.context$':
      '<rootDir>/src/__mocks__/favorite.context.ts',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage',
    'package.json',
    'package-lock.json',
    'src/resources/icons/generated',
    'src/graphql',
    'src/App.tsx',
    'src/i18n.ts',
    'src/pages/index.ts',
  ],
};
