---
sidebar_position: 8
---
# Internationalization

Composable UI uses the [`react-intl`](https://formatjs.io/docs/getting-started/installation/) library for internationalizing the application. You can display text, numbers, dates and currencies in a localized format by using this library.

Composable UI wraps a `IntlProvider` under the `ComposableProvider`. For the configuration, see the `composable-ui/src/components/composable.tsx` file. The `locale` is retrieved from the [`useComposable` Hook](/docs/essentials/composition/hooks#useComposable) and set within the `IntlProvider`.

## Managing Locale

1. To get the current locale or to set your application to a different locale, import the [useComposable](/docs/essentials/composition/hooks#usecomposable) hook and deconstruct `locale` and `setLocale` as in the following example:

 ```tsx
 import { useComposable } from ‘hooks’
 const { locale, setLocale } = useComposable()
 ```

## Managing Translations

With `react-intl`, you can easily switch between different languages in your React application. The library provides a set of components and APIs to separate the translations from your code and store them in a dedicated file. This method makes it easier to manage and maintain the translations and add languages.

To manage translations of your app:

1. Navigate to the `/composable-ui/src/server/intl/` directory.

  This directory consists of JSON files that contains the translation configuration corresponding each language combination. For example `en-US.json`.
1. To edit the settings for a language combination, edit the corresponding file.

  For example, to change the settings for English US, edit the `en-US.json` file as required.
1. To add a new language combination, create a new JSON file with the required settings.

  The translation files contain keys for each translated string.

Within the code, you can get the translated text by importing the `useIntl` hook and using the `formatMessage` function:

```tsx
import { useIntl } from 'react-intl'
...
intl.formatMessage({ id: 'validation.required' })
```
