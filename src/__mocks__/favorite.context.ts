const mockSetFavoriteFn = jest.fn();

// Return a mock implementation for `setFavoriteFn` that returns another mock function
const mockUseFavorite = {
  favorites: { '1': false },
  setFavoriteFn: jest.fn().mockReturnValue(mockSetFavoriteFn),
};

export const useFavorite = jest.fn(() => mockUseFavorite);
