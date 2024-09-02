import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import {
  FaAngleDoubleUp,
  FaArrowLeft,
  FaMoon,
  FaRegMoon,
  FaSkiing,
  FaSnowflake,
  FaTree,
  FaUserFriends,
} from 'react-icons/fa';
import { GrStatusUnknown } from 'react-icons/gr';
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';

import TrailDetailSkeleton from '@/components/Trail/TrailDetail.skeleton';
import { Lift, useTrailQuery } from '@/graphql/generated';
import { getElevations } from '@/utils/trail.utils';

interface DetailItemProps {
  icon: React.ElementType;
  color: string;
  label: string;
  value: string;
  className?: string;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'green.500';
    case 'intermediate':
      return 'yellow.500';
    case 'advanced':
    case 'expert':
      return 'red.500';
    default:
      return 'gray.500';
  }
};

export const DetailItem = ({ icon, color, label, value }: DetailItemProps) => {
  return (
    <HStack>
      <Icon as={icon} color={color} />
      <Text>
        <strong>{label}:</strong> {value}
      </Text>
    </HStack>
  );
};

export const TrailDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useTrailQuery({
    variables: { id: id ?? 'unknown' },
  });

  if (loading) return <TrailDetailSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  const trail = data?.Trail;

  if (!trail) return <Text>Trail not found.</Text>;

  return (
    <Box maxWidth={'100%'} w={'container.lg'} m={'auto'} p={4}>
      {/* Back button */}
      <Button as={Link} to="/" aria-label="Go back" mb={4}>
        Go Back
      </Button>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
        <Flex
          position="relative"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <Image src={'/images/trail.png'} />
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
            <Heading
              display="inline-block"
              color="white"
              as="h2"
              size="2xl"
              pr={2}
            >
              {trail.name}
            </Heading>
            <Badge
              fontSize="xl"
              colorScheme={
                trail.status === 'OPEN'
                  ? 'green'
                  : trail.status === 'CLOSED'
                    ? 'red'
                    : 'yellow'
              }
            >
              {trail.status}
            </Badge>
          </Flex>
        </Flex>
        <Box>
          <Heading as="h3" size="md" mb={4}>
            Details
          </Heading>
          <VStack align="start" spacing={2} divider={<StackDivider />}>
            <DetailItem
              data-testid="groomed-item"
              icon={FaSnowflake}
              color={trail.groomed ? 'teal.500' : 'gray.500'}
              label="Groomed"
              value={trail.groomed ? 'Yes' : 'No'}
            />
            <DetailItem
              icon={FaTree}
              color={trail.trees ? 'green.500' : 'gray.500'}
              label="Trees"
              value={trail.trees ? 'Yes' : 'No'}
            />
            <DetailItem
              icon={FaMoon}
              color={trail.night ? 'purple.500' : 'gray.500'}
              label="Night"
              value={trail.night ? 'Yes' : 'No'}
            />
            <DetailItem
              icon={FaSkiing}
              color={getDifficultyColor(trail.difficulty)}
              label="Difficulty"
              value={
                trail.difficulty.charAt(0).toUpperCase() +
                trail.difficulty.slice(1)
              }
            />
            <DetailItem
              icon={FaAngleDoubleUp}
              color="gray.500"
              label="Elevation Gain"
              value={`${getElevations(trail.accessedByLifts as Lift[])} ft`}
            />
          </VStack>
        </Box>
      </SimpleGrid>
      <Divider mt={4} mb={4} />
      <Box>
        <Heading as="h3" size="md" mb={4}>
          Accessed By Lifts
        </Heading>
        <SimpleGrid gap={4} columns={{ base: 1, sm: 2, md: 3, lg: 4 }}>
          {trail.accessedByLifts.map((lift) => (
            <Card key={lift.name}>
              <CardHeader borderBottom="1px" borderColor="gray.200">
                <Heading fontSize="medium" as={'h4'}>
                  {lift.name}
                </Heading>
              </CardHeader>
              <CardBody>
                <VStack align="start" spacing={2} divider={<StackDivider />}>
                  <DetailItem
                    color="gray.500"
                    icon={GrStatusUnknown}
                    label="Status"
                    value={lift.status as string}
                  />
                  <DetailItem
                    color="gray.500"
                    icon={FaRegMoon}
                    label="Night"
                    value={lift.night ? 'Yes' : 'No'}
                  />
                  <DetailItem
                    color="gray.500"
                    icon={FaUserFriends}
                    label="Capacity"
                    value={`${lift.capacity}`}
                  />
                  <DetailItem
                    color="gray.500"
                    icon={FaAngleDoubleUp}
                    label="Elevation"
                    value={`${lift.elevationGain} ft`}
                  />
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default TrailDetail;
