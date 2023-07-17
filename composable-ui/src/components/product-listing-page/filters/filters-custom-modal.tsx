import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { Filters } from './filters'
import { useIntl } from 'react-intl'

/**
 * This is a custom implementation of @chakra-ui's Modal component,
 * that doesn't remove the modal content from the DOM when closed.
 *
 * It was built to support the categroy page mobile filters modal, using Algolia hooks,
 * which needs to keep the component that called the hook (ex. useRefinementList) mounted,
 * otherwise it will clear the refinement on unmount.
 *
 * We need to dynamically set useInert to prevent Chakra from adding aria-hidden to all other elements on the page.
 * Please refer to the Chakra UI modal code here:
 * @see https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/modal/src/use-modal.ts#L79-L85
 *
 */
export const FiltersCustomModal = (
  props: Pick<ModalProps, 'isOpen' | 'onClose'>
) => {
  const { isOpen, onClose } = props
  const intl = useIntl()
  const portalModal = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (portalModal.current) {
      portalModal.current.style.display = isOpen ? 'block' : 'none'
    }
  }, [isOpen])

  return (
    <Box ref={portalModal}>
      <Modal
        isOpen={true}
        useInert={isOpen}
        onClose={() => {}}
        motionPreset="none"
        blockScrollOnMount={isOpen}
        portalProps={{
          containerRef: portalModal,
        }}
        size="full"
      >
        <ModalOverlay />
        <ModalContent m={0} rounded={0}>
          <ModalHeader>
            {intl.formatMessage({ id: 'category.filters.refineBy' })}
          </ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <Filters />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
