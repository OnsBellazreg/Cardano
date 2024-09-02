import { render, screen } from '@testing-library/react';
import React from 'react';

import { Fallback } from '@/components/Fallback/Fallback';

describe('Fallback', () => {
  it('renders the fallback component with an error', () => {
    const error = new Error('test error');
    render(<Fallback error={error} />);
    expect(screen.getByText('test error')).toBeInTheDocument();
  });
});
