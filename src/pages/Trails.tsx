import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import * as React from 'react';
import { generatePath, Link } from 'react-router-dom';

import { FindTrails, TrailCard, TrailCardSkeleton } from '@/components/Trail';
import { ROUTES } from '@/constants/routes';
import { useApp } from '@/context/app.context';
import { useFavorite } from '@/context/favorite.context';
import { Trail, TrailStatus, useAllTrailsQuery } from '@/graphql/generated';

export const Trails = () => {
  const { data, loading } = useAllTrailsQuery();
  const allTrails = data?.allTrails;
  const { favorites } = useFavorite();
  const {
    groupNumber,
    difficulty,
    groomed,
    elevationGain,
    showOnlyOpen,
    showOnlyFavorites,
  } = useApp();

  const filteredTrails = allTrails?.filter((trail) => {
    // Filter by favorites
    const isFavorite = showOnlyFavorites
      ? favorites[trail.id] && favorites[trail.id] === true
      : true;
    if (!isFavorite) {
      return false;
    }

    // Filter by status
    const matchesStatus = showOnlyOpen
      ? trail.status === TrailStatus.Open
      : true;
    if (!matchesStatus) {
      return false;
    }

    // Filter by difficulty
    const matchesDifficulty = difficulty
      ? trail.difficulty === difficulty
      : true;
    if (!matchesDifficulty) {
      return false;
    }

    // Filter by groupNumber: Ensure all lifts have a capacity >= groupNumber
    const matchesGroupNumber = groupNumber
      ? trail.accessedByLifts.every((lift) => lift.capacity >= groupNumber)
      : true;
    if (!matchesGroupNumber) {
      return false;
    }

    // Filter by groomed
    let matchesGroomed;
    if (groomed === 'ALL') matchesGroomed = true;
    else if (groomed === 'GROOMED') matchesGroomed = trail.groomed;
    else if (groomed === 'NON-GROOMED') matchesGroomed = !trail.groomed;

    const lifts = [...trail.accessedByLifts];
    lifts.sort((a, b) => a.elevationGain - b.elevationGain);

    // Filter by elevationGain
    const matchesElevationGain =
      elevationGain && elevationGain.length === 2
        ? lifts[0].elevationGain >= elevationGain[0] &&
          lifts[0].elevationGain <= elevationGain[1]
        : true;

    return (
      matchesDifficulty &&
      matchesGroupNumber &&
      matchesGroomed &&
      matchesElevationGain
    );
  });

  return (
    <Box maxWidth={'100%'} w={'container.lg'} m={'auto'} p={4}>
      <FindTrails />
      {!loading && filteredTrails?.length === 0 && (
        <Text fontSize="xl" color="gray.500" textAlign="center" w="100%" mt={8}>
          No trails match your criteria. Please adjust your filters and try
          again.
        </Text>
      )}

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8}>
        {loading
          ? Array.from({ length: 6 }, () => <TrailCardSkeleton />)
          : null}
        {filteredTrails?.map((trail) => (
          <Link
            key={trail.id}
            to={generatePath(ROUTES.TRAILS, { id: trail.id })}
          >
            <TrailCard trail={trail as Trail} />
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};
