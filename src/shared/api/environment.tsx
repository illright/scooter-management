import { type ReactNode, createContext, useState } from 'react';

export type Environment = 'stage' | 'prod';

interface EnvironmentContextType {
  environment: Environment;
  setEnvironment: (env: Environment) => void;
  getBaseUrl: () => string;
}

export const EnvironmentContext = createContext<EnvironmentContextType | null>(null);

const ENV_CONFIG = {
  stage: {
    baseUrl: 'https://api-stage.scooter-management.com',
  },
  prod: {
    baseUrl: 'https://api.scooter-management.com',
  },
} as const;

export function EnvironmentProvider({ children }: { children: ReactNode }) {
  const [environment, setEnvironment] = useState<Environment>('stage');

  const getBaseUrl = () => ENV_CONFIG[environment].baseUrl;

  return (
    <EnvironmentContext.Provider value={{ environment, setEnvironment, getBaseUrl }}>
      {children}
    </EnvironmentContext.Provider>
  );
}
