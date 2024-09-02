import React, { createContext, ReactNode, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';

// Define the shape of the context data
interface FavoriteContextType {
  setFavoriteFn: (id: string) => (fn: (value: boolean) => boolean) => void;
  favorites: { [key: string]: boolean };
}

// Create the context with a default value (initial state)
const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

// Create the provider component
const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favs, setFavs] = useLocalStorage<{ [key: string]: boolean }>(
    'favorites',
    {},
  );

  const setFavoriteFn = (id: string) => {
    return (fn: (value: boolean) => boolean) => {
      setFavs({ ...favs, [id]: fn(favs[id] ?? false) });
    };
  };

  return (
    <FavoriteContext.Provider value={{ setFavoriteFn, favorites: favs }}>
      {children}
    </FavoriteContext.Provider>
  );
};

// Custom hook to use the AppContext
const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an FavoriteProvider');
  }
  return context;
};

export { FavoriteProvider, useFavorite };
