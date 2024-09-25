// src/context/UpdateContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of your context value
interface UpdateContextProps {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with default values
export const UpdateContext = createContext<UpdateContextProps | undefined>(undefined);

// Create a provider component
export const UpdateProvider = ({ children }: { children: ReactNode }) => {
  const [update, setUpdate] = useState(false);

  return (
    <UpdateContext.Provider value={{ update, setUpdate }}>
      {children}
    </UpdateContext.Provider>
  );
};

// Custom hook to use the context
export const useUpdateContext = () => {
  const context = useContext(UpdateContext);
  if (!context) {
    throw new Error('useUpdateContext must be used within an UpdateProvider');
  }
  return context;
};
