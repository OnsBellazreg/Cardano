import { createContext, ReactNode, useContext, useState } from 'react';

export type GroomedStatus = 'GROOMED' | 'NON-GROOMED' | 'ALL';
// Define the shape of the context data
interface AppContextType {
  groupNumber: number;
  setGroupNumber: (number: number) => void;
  difficulty: string | undefined;
  setDifficulty: (difficulty: string | undefined) => void;
  groomed: GroomedStatus;
  setGroomed: (groomed: GroomedStatus) => void;
  elevationGain: number[] | undefined;
  setElevationGain: (elevation: number[] | undefined) => void;
  showOnlyOpen: boolean;
  setShowOnlyOpen: (showOnlyOpen: boolean) => void;
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (showOnlyFavorites: boolean) => void;
  resetFilters: () => void;
}

// Create the context with a default value (initial state)
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the provider component
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [groupNumber, setGroupNumber] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string | undefined>(undefined);
  const [groomed, setGroomed] = useState<GroomedStatus>('ALL');
  const [elevationGain, setElevationGain] = useState<number[] | undefined>(
    undefined,
  );
  const [showOnlyOpen, setShowOnlyOpen] = useState<boolean>(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  const resetFilters = () => {
    setShowOnlyOpen(false);
    setElevationGain(undefined);
    setShowOnlyFavorites(false);
    setGroomed('ALL');
  };
  return (
    <AppContext.Provider
      value={{
        groupNumber,
        setGroupNumber,
        difficulty,
        setDifficulty,
        groomed,
        setGroomed,
        elevationGain,
        setElevationGain,
        setShowOnlyOpen,
        showOnlyOpen,
        showOnlyFavorites,
        setShowOnlyFavorites,
        resetFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useApp };
