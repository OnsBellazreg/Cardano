import {
  Box,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Select,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineFilter } from 'react-icons/all';

import { useApp } from '@/context/app.context';

import TrailFilters from './Filters';

const difficultyLevels = ['beginner', 'intermediate', 'advanced', 'expert']; // TODO get these values dynamically
const groupNumbers = Array.from({ length: 8 }, (_, index) => index + 1); // TODO get these values dynamically

export const FindTrails = () => {
  const { setGroupNumber, setDifficulty, groupNumber, difficulty } = useApp();
  const [isAdvanceFiltersVisible, setIsAdvanceFiltersVisible] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box as="form" onSubmit={handleSubmit} mb={4}>
      <Heading>Find Your Perfect Ski Trail</Heading>
      <Text>
        Enter your group size and difficulty level to get personalized trail
        recommendations.
      </Text>
      <Card mt={4}>
        <CardBody>
          <Flex alignItems="flex-end" justifyContent="space-between">
            <FormControl pr={2}>
              <FormLabel>Group Number</FormLabel>
              <Select
                value={groupNumber}
                placeholder="Select Group Number"
                onChange={(e) => setGroupNumber(Number(e.target.value))}
                required
              >
                {groupNumbers.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl pl={2} pr={2}>
              <FormLabel>Difficulty</FormLabel>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                placeholder="Select Difficulty"
                required
              >
                {difficultyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Select>
            </FormControl>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="Advance Filters"
              title="Advance Filters"
              icon={<AiOutlineFilter />}
              onClick={() =>
                setIsAdvanceFiltersVisible(!isAdvanceFiltersVisible)
              }
            />
          </Flex>
          <TrailFilters
            isOpen={isAdvanceFiltersVisible}
            onClose={() => setIsAdvanceFiltersVisible(false)}
          />
        </CardBody>
      </Card>
    </Box>
  );
};
