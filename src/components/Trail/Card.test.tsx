import { render, screen } from '@testing-library/react';
import React from 'react';

import { useFavorite } from '@/context/favorite.context';
import { Trail, TrailStatus } from '@/graphql/generated';

import { TrailCard } from './Card'; // Adjust the import path based on your project structure

// Mock the useFavorite hook
jest.mock('@/context/favorite.context', () => ({
  useFavorite: jest.fn(),
}));

// Mock data for the trail
const mockTrail: Trail = {
  id: '1',
  name: 'Mock Trail',
  groomed: true,
  status: TrailStatus.Open,
  accessedByLifts: [],
  difficulty: 'Intermediate',
  night: false,
  trees: false,
};

// Mock the return value of useFavorite
const mockSetFavoriteFn = jest.fn();
(useFavorite as jest.Mock).mockReturnValue({
  favorites: { '1': false },
  setFavoriteFn: () => mockSetFavoriteFn,
});

describe('TrailCard', () => {
  it('renders the trail name', () => {
    render(<TrailCard trail={mockTrail} />);
    expect(screen.getByText('Mock Trail')).toBeInTheDocument();
  });

  it('displays the correct trail difficulty', () => {
    render(<TrailCard trail={mockTrail} />);
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
  });

  it('displays groomed status correctly', () => {
    render(<TrailCard trail={mockTrail} />);
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });
});
