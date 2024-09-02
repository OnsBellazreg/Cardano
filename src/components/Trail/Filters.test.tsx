import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { useApp } from '@/context/app.context';

import TrailFilters, { TrailFiltersProps } from './Filters'; // Import TrailFiltersPropsi

jest.mock('@/context/app.context', () => ({
  useApp: jest.fn(),
}));
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str:any) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));
describe('TrailFilters', () => {
  const defaultAppState = {
    groomed: 'ALL',
    setGroomed: jest.fn(),
    elevationGain: [0, 5000],
    setElevationGain: jest.fn(),
    showOnlyOpen: false,
    setShowOnlyOpen: jest.fn(),
    showOnlyFavorites: false,
    setShowOnlyFavorites: jest.fn(),
    resetFilters: jest.fn(),
  };

  beforeEach(() => {
    (useApp as jest.Mock).mockReturnValue(defaultAppState);
  });

  const renderComponent = (props: TrailFiltersProps) => {
    return render(
      <ChakraProvider>
        <TrailFilters {...props} />
      </ChakraProvider>,
    );
  };

  it('renders the modal when isOpen is true', () => {
    renderComponent({ isOpen: true, onClose: jest.fn() });
    expect(screen.getByText('More Filters')).toBeInTheDocument();
  });

  it('calls onClose when the form is submitted', () => {
    const mockOnClose = jest.fn();
    renderComponent({ isOpen: true, onClose: mockOnClose });

    // Find the form using the data-testid
    const formElement = screen.getByTestId('filters-form');

    fireEvent.submit(formElement);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
