const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

const nextJestConfig = createJestConfig(customJestConfig)

// next/jest concatenates transformIgnorePatterns, so we post-process to override them
// with patterns that also allow MSW and its ESM-only deps to be transformed.
module.exports = async () => {
  const config = await nextJestConfig()
  config.transformIgnorePatterns = [
    '/node_modules/(?!.pnpm)(?!(geist|msw|@mswjs|until-async)/)',
    '/node_modules/.pnpm/(?!(geist|msw|until-async)@)',
    '^.+\\.module\\.(css|sass|scss)$',
  ]
  return config
}
