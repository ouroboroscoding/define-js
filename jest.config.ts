import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
		"^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!@ouroboros)"
  ],
  verbose: true,
};
export default config;
