import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UpdateContextProps {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  displayBoard: boolean;
  setDisplayBoard: React.Dispatch<React.SetStateAction<boolean>>;
  resetState: boolean;
  setResetState: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with default values
export const UpdateContext = createContext<UpdateContextProps>({ update: false, displayBoard: false, setUpdate: () => { }, setDisplayBoard: () => { }, resetState: false, setResetState: () => { }, });

// Create a provider component
export const UpdateProvider = ({ children }: { children: ReactNode }) => {
  const [update, setUpdate] = useState(false);
  const [displayBoard, setDisplayBoard] = useState<boolean>(false);
  const [resetState, setResetState] = useState<boolean>(false);

  return (
    <UpdateContext.Provider value={{ update, setUpdate, displayBoard, setDisplayBoard, setResetState, resetState }}>
      {children}
    </UpdateContext.Provider>
  );
};

// Custom hook to use the context
export const useUpdateContext = () => useContext(UpdateContext);
