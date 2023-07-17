import { Flex, IconButton } from '@chakra-ui/react'
import {
  GridLargeIcon,
  GridMediumIcon,
  GridSingleIcon,
  GridSmallIcon,
} from '@composable/ui'
import { CategoryPageProductGrid } from '@composable/types'

interface GridControlProps {
  grid: CategoryPageProductGrid
  setGrid: (val: CategoryPageProductGrid) => void
}

export const GridControl = ({ grid, setGrid }: GridControlProps) => {
  return (
    <Flex>
      <IconButton
        display={{ base: 'flex', sm: 'none' }}
        aria-label={'single'}
        fontSize="xl"
        icon={<GridSingleIcon />}
        onClick={() => setGrid('single')}
        opacity={grid === 'single' ? 1 : 0.4}
        color="text"
        variant="ghost"
      />
      <IconButton
        display={'flex'}
        aria-label={'comfortable'}
        fontSize="xl"
        icon={<GridSmallIcon />}
        onClick={() => setGrid('comfortable')}
        opacity={grid === 'comfortable' ? 1 : 0.4}
        color="text"
        variant="ghost"
      />
      <IconButton
        display={{ base: 'none', sm: 'flex' }}
        aria-label={'standard'}
        fontSize="xl"
        icon={<GridMediumIcon />}
        onClick={() => setGrid('standard')}
        opacity={grid === 'standard' ? 1 : 0.4}
        color="text"
        variant="ghost"
      />
      <IconButton
        display={{ base: 'none', md: 'flex' }}
        aria-label={'condensed'}
        fontSize="xl"
        icon={<GridLargeIcon />}
        onClick={() => setGrid('condensed')}
        opacity={grid === 'condensed' ? 1 : 0.4}
        color="text"
        variant="ghost"
      />
    </Flex>
  )
}
