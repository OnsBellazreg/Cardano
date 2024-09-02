import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';

import { Lift, LiftStatus, Trail, useTrailQuery } from '@/graphql/generated';

import { TrailDetail } from './TrailDetail';

// Mock the necessary hooks
jest.mock('@/graphql/generated', () => ({
  useTrailQuery: jest.fn(),
  useParams: jest.fn(),
  LiftStatus: {
    Open: 'OPEN',
    Closed: 'CLOSED',
    Hold: 'HOLD',
  },
  TrailStatus: {
    Open: 'OPEN',
    Closed: 'CLOSED',
  },
}));

const mockLift: Lift = {
  id: 'lift-1',
  name: 'Lift A',
  status: LiftStatus.Open,
  night: true,
  capacity: 4,
  elevationGain: 300,
  trailAccess: [],
};

const mockTrail: Trail = {
  id: '1',
  name: 'Blue Bird',
  groomed: false,
  status: undefined,
  accessedByLifts: [mockLift],
  difficulty: 'Easy',
  night: true,
  trees: false,
};

const MockTrailDetailWithParams = () => {
  const { id } = useParams<{ id: string }>();
  return <TrailDetail />;
};

describe('TrailDetail', () => {
  beforeEach(() => {
    (useTrailQuery as jest.Mock).mockReturnValue({
      data: { Trail: mockTrail },
      loading: false,
      error: null,
    });
  });

  // it('renders the loading skeleton while data is loading', () => {
  //   (useTrailQuery as jest.Mock).mockReturnValue({
  //     data: { allTrails: [] },
  //     loading: true,
  //     error: null,
  //   });
  //   const { container } = render(<TrailDetail />);
  //   expect(container).toMatchSnapshot();
  // });

  it('displays trail details when data is loaded', async () => {
    const { container } = render(<MockTrailDetailWithParams />);
    expect(container).toMatchSnapshot();
  });

  it('handles error when data fetching fails', async () => {
    (useTrailQuery as jest.Mock).mockReturnValue({
      data: { Trail: null },
      loading: false,
      error: { message: 'Failed to fetch trail details' },
    });

    const { container } = render(<MockTrailDetailWithParams />);

    expect(
      await screen.findByText('Error: Failed to fetch trail details'),
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('shows Trail not found message when no trail matches the ID', async () => {
    (useTrailQuery as jest.Mock).mockReturnValue({
      data: { Trail: null },
      loading: false,
      error: null,
    });

    const { container } = render(<MockTrailDetailWithParams />);
    expect(container).toMatchSnapshot();

    expect(await screen.findByText('Trail not found.')).toBeInTheDocument()
});