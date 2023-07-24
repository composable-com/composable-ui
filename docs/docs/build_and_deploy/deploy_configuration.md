---
sidebar_position: 3
---

# Deploy Configuration

You can host Composable UI on any hosting service that supports Next.js applications such as Vercel, Netlify, or AWS.

## Environment Variables

When deploying to a cloud provider, you must set the `NEXTAUTH_SECRET` environment variable on the cloud platform. For more information on Composable UI environment variables, see the [Application Configuration](../essentials/configuration.md) section.
- [Setting environment variables on Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
- [Setting environment variables on Netlify](https://docs.netlify.com/environment-variables/overview/)

## 1-Click Deployment to Vercel

1. Click the following link to build and deploy your own copy of Composable UI to Vercel:

    [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcomposable-com%2Fcomposable-ui&root-directory=composable-ui&project-name=composable-ui&repository-name=composable-ui&demo-title=Composable%20UI&demo-description=Open%20Source%20React%20Storefront%20for%20Composable%20Commerce&demo-url=https%3A%2F%2Fstorefront.composable.com%2F&demo-image=https%3A%2F%2Fstorefront.composable.com%2Fimg%2Fdemo_image.png&envDescription=Enter%20your%20NEXTAUTH_SECRET.&env=NEXTAUTH_SECRET&envLink=https%3A%2F%2Fnext-auth.js.org%2Fconfiguration%2Foptions%23nextauth_secret)

1. When prompted, authenticate with GitHub and choose a repository name.
Vercel creates a repository automatically in your GitHub account with a copy of the files from the Composable UI repository and build and deploy the new site. However, you can deploy your Next.js application to Vercel regardless of whether you have a GitHub, Bitbucket, or GitLab account.

## 1-Click Deployment to Netlify

1. Click the following link to build and deploy your own copy of Composable UI to  Netlify:

    [![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/composable-com/composable-ui&base=composable-ui#PNPM_FLAGS=--shamefully-hoist)

1. When prompted, authenticate with GitHub and choose a repository name.
Netlify creates a repository in your GitHub account automatically with a copy of the files from the Composable UI repository, and the new site is built and deployed on Netlify.
