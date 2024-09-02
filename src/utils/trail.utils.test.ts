import { Lift } from '@/graphql/generated'; // Adjust the path as needed

import { getElevations } from './trail.utils';

// Mock data for lifts
const mockLifts: Lift[] = [
  { id: '1', name: 'Lift 1', elevationGain: 500 } as Lift,
  { id: '2', name: 'Lift 2', elevationGain: 1000 } as Lift,
  { id: '3', name: 'Lift 3', elevationGain: 1500 } as Lift,
];

describe('getElevations', () => {
  it('should return a string of elevation gains separated by commas', () => {
    const result = getElevations(mockLifts);
    expect(result).toBe('500, 1000, 1500');
  });

  it('should return an empty string when the lifts array is empty', () => {
    const result = getElevations([]);
    expect(result).toBe('');
  });

  it('should handle an array with a single lift', () => {
    const singleLift = [{ id: '1', name: 'Lift 1', elevationGain: 750 }];
    const result = getElevations(singleLift as Lift[]);
    expect(result).toBe('750');
  });

  it('should handle lifts with zero elevation gain', () => {
    const liftsWithZero = [
      { id: '1', name: 'Lift 1', elevationGain: 0 },
      { id: '2', name: 'Lift 2', elevationGain: 1000 },
    ];
    const result = getElevations(liftsWithZero as Lift[]);
    expect(result).toBe('0, 1000');
  });
});
