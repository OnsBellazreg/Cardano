import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

export const TrailDetailSkeleton = () => {
  return (
    <Box maxWidth={'100%'} w={'container.lg'} m={'auto'} p={4}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
        <Flex
          position="relative"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <Skeleton height="300px" width="100%" />
          <Flex
            position={'absolute'}
            top="50%"
            left="50%"
            transform={'translate(-50%, -50%)'}
            w={'100%'}
            h={'100%'}
            alignItems="center"
            justifyContent="center"
            background={'rgba(0, 0, 0, 0.3)'}
          >
            <SkeletonText noOfLines={1} skeletonHeight="32px" width="60%" />
            <Skeleton height="40px" width="80px" ml={2} />
          </Flex>
        </Flex>
        <Box>
          <SkeletonText
            noOfLines={1}
            skeletonHeight="24px"
            width="40%"
            mb={4}
          />
          <VStack align="start" spacing={2} divider={<StackDivider />}>
            {[...Array(5)].map((_, index) => (
              <HStack key={index} w="full">
                <SkeletonCircle size="6" />
                <SkeletonText noOfLines={1} skeletonHeight="20px" width="80%" />
              </HStack>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>
      <Divider mt={4} mb={4} />
      <Box>
        <SkeletonText noOfLines={1} skeletonHeight="24px" width="40%" mb={4} />
        <SimpleGrid gap={4} columns={{ base: 1, sm: 2, md: 3, lg: 4 }}>
          {Array.from({ length: 2 }, (_, index) => (
            <Card key={index}>
              <CardHeader borderBottom="1px" borderColor="gray.200">
                <SkeletonText noOfLines={1} skeletonHeight="20px" width="60%" />
              </CardHeader>
              <CardBody>
                <VStack align="start" spacing={2} divider={<StackDivider />}>
                  {Array.from({ length: 4 }, (_, i) => (
                    <HStack key={i} w="full">
                      <SkeletonCircle size="6" />
                      <SkeletonText
                        noOfLines={1}
                        skeletonHeight="20px"
                        width="80%"
                      />
                    </HStack>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default TrailDetailSkeleton;
