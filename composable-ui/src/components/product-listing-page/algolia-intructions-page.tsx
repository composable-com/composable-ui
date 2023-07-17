import {
  AspectRatio,
  Box,
  Text,
  Container,
  Heading,
  VStack,
  OrderedList,
  ListItem,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  Code,
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import Image from 'next/image'
import NextLink from 'next/link'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export const AlgoliaIntructionsPage = () => {
  const intl = useIntl()

  return (
    <Container maxW="container.2xl" px={[4, 6, 24]} my={[10, 16, 20]}>
      <VStack>
        <VStack mb={20} gap={2}>
          <Heading as="h2" fontSize={26} textAlign="center">
            {intl.formatMessage({
              id: 'category.algolia.setup.instructions.pagePoweredBy',
            })}
          </Heading>
          <Box>
            <Image
              priority={true}
              src="/img/algolia-logo.svg"
              alt="algolia-logo"
              width={300}
              height={70}
            />
          </Box>
        </VStack>

        <Container>
          <VStack gap={2}>
            <Heading
              as="h3"
              fontSize={24}
              fontWeight="medium"
              textAlign="center"
            >
              {intl.formatMessage({
                id: 'category.algolia.setup.instructions.getStarterFollowTheseSteps',
              })}
            </Heading>

            <OrderedList>
              <ListItem>
                <Link
                  as={NextLink}
                  href="https://www.algolia.com/users/sign_up"
                  isExternal
                >
                  {intl.formatMessage({
                    id: 'category.algolia.setup.instructions.signUpForAlgolia',
                  })}
                  <ExternalLinkIcon mx="2px" />
                </Link>
                .
              </ListItem>
              <ListItem>
                {intl.formatMessage({
                  id: 'category.algolia.setup.instructions.createNewIndex',
                })}
              </ListItem>
              <ListItem>
                {intl.formatMessage({
                  id: 'category.algolia.setup.instructions.getApiKeys',
                })}
              </ListItem>
              <ListItem>
                {intl.formatMessage({
                  id: 'category.algolia.setup.instructions.configureIndex',
                })}
              </ListItem>
            </OrderedList>

            <Accordion width={{ base: 'full', sm: '85%' }} allowMultiple>
              <AccordionItem>
                <Heading as="h2">
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {intl.formatMessage({
                        id: 'category.algolia.setup.instructions.runScript',
                      })}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Heading>
                <AccordionPanel pb={4}>
                  {intl.formatMessage({
                    id: 'category.algolia.setup.instructions.followThisInstructions',
                  })}
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <Heading as="h2">
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {intl.formatMessage({
                        id: 'category.algolia.setup.instructions.doItManually',
                      })}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Heading>
                <AccordionPanel pb={4}>
                  <UnorderedList>
                    <ListItem listStyleType="none" fontWeight="bold">
                      {intl.formatMessage({
                        id: 'category.algolia.setup.instructions.importProducts',
                      })}
                    </ListItem>
                    <UnorderedList>
                      <ListItem>
                        {intl.formatMessage({
                          id: 'category.algolia.setup.instructions.addRecords',
                        })}
                      </ListItem>
                      <ListItem>
                        {intl.formatMessage({
                          id: 'category.algolia.setup.instructions.dragAndDropFile',
                        })}
                      </ListItem>
                    </UnorderedList>

                    <ListItem listStyleType="none" fontWeight="bold">
                      {intl.formatMessage({
                        id: 'category.algolia.setup.instructions.configureAttributesAndFacets',
                      })}
                    </ListItem>
                    <UnorderedList>
                      <ListItem>
                        {intl.formatMessage({
                          id: 'category.algolia.setup.instructions.goToIndexConfig',
                        })}
                      </ListItem>
                      <ListItem>
                        {intl.formatMessage({
                          id: 'category.algolia.setup.instructions.relevanceConfig',
                        })}
                      </ListItem>
                      <ListItem>
                        {intl.formatMessage({
                          id: 'category.algolia.setup.instructions.facetsConfig',
                        })}
                      </ListItem>
                    </UnorderedList>

                    <ListItem listStyleType="none" fontWeight="bold">
                      {intl.formatMessage({
                        id: 'category.algolia.setup.instructions.createReplicas',
                      })}
                    </ListItem>
                    <UnorderedList>
                      <ListItem>
                        {intl.formatMessage({
                          id: 'category.algolia.setup.instructions.createNewReplica',
                        })}
                      </ListItem>
                      <ListItem>
                        {intl.formatMessage({
                          id: 'category.algolia.setup.instructions.replicasNames',
                        })}
                      </ListItem>
                      <ListItem>
                        {intl.formatMessage({
                          id: 'category.algolia.setup.instructions.replicasSorting',
                        })}
                      </ListItem>
                      <ListItem>
                        {intl.formatMessage({
                          id: 'category.algolia.setup.instructions.createDifferentSorting',
                        })}
                      </ListItem>
                    </UnorderedList>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Text>
              {intl.formatMessage({
                id: 'category.algolia.setup.instructions.addEnvVarsToThisApp',
              })}
            </Text>
            <VStack>
              <Code>NEXT_PUBLIC_ALGOLIA_APP_ID</Code>
              <Code>NEXT_PUBLIC_ALGOLIA_API_SEARCH_KEY</Code>
              <Code>NEXT_PUBLIC_ALGOLIA_INDEX_NAME</Code>
            </VStack>
          </VStack>
        </Container>
      </VStack>
    </Container>
  )
}
