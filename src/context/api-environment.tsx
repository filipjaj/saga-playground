import React, { createContext, useContext, useState } from "react";
import { APIEnvironment, API_URLS } from "@/config/api";

interface APIEnvironmentContextType {
  environment: APIEnvironment;
  setEnvironment: (env: APIEnvironment) => void;
  baseUrl: string;
}

const APIEnvironmentContext = createContext<APIEnvironmentContextType | undefined>(undefined);

export function APIEnvironmentProvider({ children }: { children: React.ReactNode }) {
  const [environment, setEnvironment] = useState<APIEnvironment>("production");

  const value = {
    environment,
    setEnvironment,
    baseUrl: API_URLS[environment],
  };

  return (
    <APIEnvironmentContext.Provider value={value}>
      {children}
    </APIEnvironmentContext.Provider>
  );
}

export function useAPIEnvironment() {
  const context = useContext(APIEnvironmentContext);
  if (context === undefined) {
    throw new Error("useAPIEnvironment must be used within an APIEnvironmentProvider");
  }
  return context;
}
