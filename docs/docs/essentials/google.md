---
sidebar_position: 12
---
# Google Tag Manager 

Composable UI can be connected to your Google Tag Manager account to instrument conversion tracking, site analytics, and more. 

Use your `GTM Container ID` as the value for environment variable `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID`

```shell
//.env

NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
```

:::caution Caution: Production Environment Only
Be sure to setup the Google Tag Manager environment variable `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID` only on your Production deployment, and none others. By doing so, you guarantee that all events and data originate solely from user sessions occurring in the Production environment.
:::
 ## Create Google Tag Manager Account

If you need to create a Google Tag Manager account, follow the instructions [Set up and install Tag Manager](https://support.google.com/tagmanager/answer/6103696). Once you have an account, retrieve your GTM `container ID`, it will be in the format of `GTM-XXXXXXX`, and use this to populate the `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID` environment variable.

## Related Resources
- [Google Tag Manager overview](https://support.google.com/tagmanager/answer/6102821)
- [Set up and install Tag Manager](https://support.google.com/tagmanager/answer/6103696)
