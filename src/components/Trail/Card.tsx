import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import React from 'react';

import { Star } from '@/components/Shared';
import { useFavorite } from '@/context/favorite.context';
import { Lift, Trail } from '@/graphql/generated';
import { Mountain } from '@/resources/icons/generated';
import { getElevations } from '@/utils/trail.utils';

export interface TrailCardProps {
  trail: Trail;
}
export const TrailCard = ({ trail }: TrailCardProps) => {
  const { id, name, groomed, status, accessedByLifts, difficulty } = trail;
  const { favorites, setFavoriteFn } = useFavorite();
  const favoriteSetter = setFavoriteFn(id);
  return (
    <Card>
      <CardHeader pb={0}>
        <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
          <Flex gap={2} alignItems={'center'}>
            <Mountain />
            <Heading size="md">{name}</Heading>{' '}
            <Badge colorScheme={status === 'OPEN' ? 'green' : 'red'}>
              {status}
            </Badge>
          </Flex>
          <Star
            filled={favorites[id] ?? false}
            onClick={(e: any) => {
              favoriteSetter((v) => !v);
              e.preventDefault();
            }}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight="bold">Groomed:</Text>
            <Text>{groomed ? 'Yes' : 'No'}</Text>
          </Flex>
          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight="bold">Difficulty:</Text>
            <Text>{difficulty} </Text>
          </Flex>
          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight="bold">Elevation Gain:</Text>
            <Text>{getElevations(accessedByLifts as Lift[])} ft</Text>
          </Flex>
          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight="bold">Lifts:</Text>
            {accessedByLifts?.length}
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};
