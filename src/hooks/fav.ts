import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const useFavorite = (id: string) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [favs, setFavs] = useLocalStorage<{ [key: string]: boolean }>(
    'favorites',
    {},
  );

  useEffect(() => {
    if (favs[id] && favs[id] !== favorite) {
      setFavorite(true);
    }
  }, [favs, setFavorite, id, favorite]);

  useEffect(() => {
    favs[id] = favorite;
    setFavs(favs);
  }, [favorite, favs, setFavs, id]);

  return { favorite, setFavorite };
};

export const useFavorites = () => {
  const [favs, _] = useLocalStorage<{ [key: string]: boolean }>(
    'favorites',
    {},
  );

  return favs;
};
