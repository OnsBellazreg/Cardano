import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  SimpleGrid,
  Switch,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { GroomedStatus, useApp } from '@/context/app.context';

const MAX_ELEVATION = 5000;
export interface TrailFiltersProps {
  onClose: () => void;
  isOpen: boolean;
}

const TrailFilters = ({ isOpen, onClose }: TrailFiltersProps) => {
  const { t } = useTranslation();
  const {
    groomed,
    setGroomed,
    elevationGain,
    setElevationGain,
    showOnlyOpen,
    setShowOnlyOpen,
    showOnlyFavorites,
    setShowOnlyFavorites,
    resetFilters,
  } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>More Filters</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={handleSubmit} data-testid="filters-form">
            <SimpleGrid columns={{ base: 1 }} spacing={4} alignItems="center">
              <FormControl>
                <FormLabel>Groomed</FormLabel>
                <Select
                  value={groomed}
                  onChange={(e) => setGroomed(e.target.value as GroomedStatus)}
                  placeholder="Grooming"
                >
                  <option value="ALL">All</option>
                  <option value="GROOMED">Groomed Trails</option>
                  <option value="NON-GROOMED">Not groomed</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>{t('filters.elevation')}</FormLabel>
                <RangeSlider
                  colorScheme="teal"
                  max={MAX_ELEVATION}
                  min={0}
                  minStepsBetweenThumbs={10}
                  onChange={(value) => setElevationGain(value)}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <Tooltip
                    hasArrow
                    closeOnClick={false}
                    label={
                      elevationGain
                        ? `${elevationGain[0]} ${t('common.feet')}`
                        : ''
                    }
                  >
                    <RangeSliderThumb index={0} />
                  </Tooltip>
                  <Tooltip
                    hasArrow
                    closeOnClick={false}
                    label={
                      elevationGain
                        ? `${elevationGain[1]} ${t('common.feet')}`
                        : ''
                    }
                  >
                    <RangeSliderThumb index={1} />
                  </Tooltip>
                </RangeSlider>
              </FormControl>
              <FormControl>
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                  <FormLabel htmlFor="show-only-open" mb="0">
                    {t('filters.show_only_open')}
                  </FormLabel>
                  <Switch
                    id="show-only-open"
                    colorScheme="teal"
                    isChecked={showOnlyOpen}
                    onChange={(event) => setShowOnlyOpen(event.target.checked)}
                  />
                </Flex>
              </FormControl>
              <FormControl>
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                  <FormLabel htmlFor="show-only-favs" mb="0">
                    {t('filters.show_only_favs')}
                  </FormLabel>
                  <Switch
                    id="show-only-favs"
                    colorScheme="teal"
                    isChecked={showOnlyFavorites}
                    onChange={(event) =>
                      setShowOnlyFavorites(event.target.checked)
                    }
                  />
                </Flex>
              </FormControl>
            </SimpleGrid>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={resetFilters}>Reset Filters</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TrailFilters;
