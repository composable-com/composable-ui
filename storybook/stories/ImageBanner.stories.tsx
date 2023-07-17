import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ImageBanner } from '@composable/ui'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ImageBanner',
  component: ImageBanner,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ImageBanner>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ImageBanner> = (args) => (
  <ImageBanner {...args} />
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  image: {
    src: 'https://loremflickr.com/1920/1080',
    alt: 'Alt Text',
  },
  imageMobile: {
    src: 'https://loremflickr.com/1080/1920',
    alt: 'Alt Text',
  },
}
