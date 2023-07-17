import { Container, ContainerProps } from '@chakra-ui/react'

export interface UiContainerProps {
  size?: null | 'full' | '2xl' | 'xl' | 'lg' | string
  children: null | ContainerProps['children']
  marginTop?: null | ContainerProps['marginTop']
  marginBottom?: null | ContainerProps['marginBottom']
}

export const UiContainer = ({
  children,
  size,
  marginBottom,
  marginTop,
}: UiContainerProps) => {
  const _size = size ?? 'full'

  return (
    <Container
      maxWidth={`container.${_size}`}
      px={_size === 'full' ? '0' : undefined}
      marginBottom={marginBottom ?? undefined}
      marginTop={marginTop ?? undefined}
    >
      {children}
    </Container>
  )
}
