---
sidebar_position: 3
---

# Storybook

:::info

Storybook will be available in a future release of Composable UI.

:::

<!--
The Composable UI Design Kit's React Component Library is implemented in Storybook.
-->



With Storybook, you can build an interactive display of isolated UI components by providing a visual representation of your components and their various states. Composable UI provides a separate Storybook application to showcase the components in the `ui` package.

Storybook provides:
1. **Component Isolation**: You can view and interact with UI components in isolation, without navigating through the entire application.
1. **Component Documentation**: You can use Storybook as a central platform to document and showcase the various features, use cases, and states of your UI components.
1. **Design Consistency**: You can ensure design consistency across your application by allowing designers and developers to reference and verify the behavior of UI components.


## Running Storybook locally
The Composable UI Storybook code is located in the `storybook` directory.
1. To start the Storybook, run the following:
```shell
cd storybook
pnpm storybook
```

1.  To view the Storybook, navigate to [http://localhost:6006/](http://localhost:6006/).

## Extending Composable UI Storybook
To add new UI components or document existing components in Storybook, do the following:

1. In the `ui` package, create or locate the appropriate component file.
1. In the `storybook/stories` directory, create a new file with the `.stories.tsx` extension. 

We recommend using the name of the React component as the filename. For a component named `HeroBanner`, use the filename `HeroBanner.stories.tsx`.
1. Import the UI component and create stories as needed. 
For more instructions, see the [Storybook's guide](https://storybook.js.org/docs/react/writing-stories/introduction).
1. Save the story file.
The changes are automatically reflected in the Storybook application that is currently running. You can navigate to the updated component's story in the Storybook interface and see the changes.

Keep your Storybook application up-to-date while adding or modifying UI components. Regularly review and refine your stories to ensure they accurately represent the behavior and appearance of your UI components.