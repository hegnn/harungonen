import { createContext, ReactNode, useState } from 'react';

export type Game = {
  iconURL: string;
  id: number;
  rating: number;
  title: string;
};

export type GameDetails = {
    iconURL: string;
    id: number;
    rating: number;
    title: string;
    bannerURL: string;
    description: string;
  };

export type GamesContext = {
  games: Game[];
  setGames: (games: Game[]) => void;
  likedGames: number[];
  favouriteClickHandle: (id: number) => void;
  checkIsLiked: (id: number) => boolean;
};

export const GamesContext = createContext<GamesContext>({
  games: [],
  setGames: () => {},
  likedGames: [],
  favouriteClickHandle: () => {},
  checkIsLiked: () => false

});

const GamesContextProvider = ({ children }: { children: ReactNode }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [likedGames, setLikedGames] = useState<number[]>([]);

  const favouriteClickHandle = (id: number) => {
    const isIncluded = checkIsLiked(id);
    if (isIncluded) {
      const newData = likedGames.filter((gameId) => gameId !== id);
      setLikedGames(newData);
    } else {
      setLikedGames([...likedGames, id]);
    }
  };

  const checkIsLiked = (id: number) => {
    return likedGames.includes(id);
  }

  return (
    <GamesContext.Provider
      value={{ games, setGames, likedGames, favouriteClickHandle, checkIsLiked }}>
      {children}
    </GamesContext.Provider>
  );
};

export default GamesContextProvider;
