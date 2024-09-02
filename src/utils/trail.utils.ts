import { Lift } from '@/graphql/generated';

export const getElevations = (lifts: Lift[]): string =>
  lifts.map((item) => item.elevationGain).join(', ');
