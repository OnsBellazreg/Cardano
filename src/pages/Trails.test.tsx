import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useApp } from '@/context/app.context';
import { useFavorite } from '@/context/favorite.context';
import { Trail, TrailStatus, useAllTrailsQuery } from '@/graphql/generated';

import { Trails } from './Trails'; // Adjust the import path based on your project structure

// Mock the necessary hooks
jest.mock('@/context/app.context', () => ({
  useApp: jest.fn(),
}));

jest.mock('@/context/favorite.context', () => ({
  useFavorite: jest.fn(),
}));

jest.mock('@/graphql/generated', () => ({
  useAllTrailsQuery: jest.fn(),
  TrailStatus: {
    Open: 'OPEN',
    Closed: 'CLOSED',
  },
}));

const mockTrails = [
  {
    id: '1',
    name: 'Blue Bird',
    groomed: false,
    status: 'OPEN',
    accessedByLifts: [{ elevationGain: 1000 }],
    difficulty: 'Easy',
    night: false,
    trees: false,
  },
];

beforeEach(() => {
  (useApp as jest.Mock).mockReturnValue({
    groupNumber: undefined,
    difficulty: undefined,
    groomed: 'ALL',
    elevationGain: undefined,
    showOnlyOpen: undefined,
    showOnlyFavorites: undefined,
  });
  (useFavorite as jest.Mock).mockReturnValue({
    favorites: {},
    setFavoriteFn: jest.fn().mockReturnValue(jest.fn()),
  });
  (useAllTrailsQuery as jest.Mock).mockReturnValue({
    data: { allTrails: mockTrails },
    loading: false,
  });
});

describe('Trails', () => {
  it('renders the loading skeleton while data is loading', () => {
    (useAllTrailsQuery as jest.Mock).mockReturnValue({
      data: { allTrails: [] },
      loading: true,
    });
    render(<Trails />);
    expect(screen.getAllByTestId('trail-card-skeleton')).toHaveLength(6); // Adjust based on your skeleton setup
  });

  it('displays trail cards when data is loaded', async () => {
    render(<Trails />);

    expect(screen.getByText('Blue Bird')).toBeInTheDocument();
  });

  it('links to the correct trail detail page', () => {
    render(<Trails />);
    expect(screen.getByText('Blue Bird').closest('a')).toHaveAttribute(
      'href',
      '/trails/1',
    );
  });
});
