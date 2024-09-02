import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Skeleton,
  SkeletonCircle,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export const TrailCardSkeleton = () => {
  return (
    <Card data-testid="trail-card-skeleton">
      <CardHeader pb={0}>
        <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
          <Flex gap={2} alignItems={'center'}>
            <SkeletonCircle size="8" />
            <Skeleton height="20px" width="150px" />
            <Skeleton height="20px" width="50px" />
          </Flex>
          <SkeletonCircle size="6" />
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight="bold">Groomed:</Text>
            <Skeleton height="20px" width="50px" />
          </Flex>
          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight="bold">Difficulty:</Text>
            <Skeleton height="20px" width="100px" />
          </Flex>
          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight="bold">Elevation Gain:</Text>
            <Skeleton height="20px" width="70px" />
          </Flex>
          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight="bold">Lifts:</Text>
            <Skeleton height="20px" width="30px" />
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};
