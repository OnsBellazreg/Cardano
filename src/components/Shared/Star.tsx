import { Icon, Tooltip } from '@chakra-ui/react';
import { FaRegStar, FaStar } from 'react-icons/fa';

export const Star = ({
  filled,
  onClick,
}: {
  filled: boolean;
  onClick?: (e: any) => void;
}) => (
  <Tooltip
    hasArrow
    label={filled ? 'Remove from favorites' : 'Add to favorites'}
  >
    <span>
      <Icon
        onClick={onClick}
        as={filled ? FaStar : FaRegStar}
        color={filled ? 'yellow.500' : ''}
      />
    </span>
  </Tooltip>
);
