---
sidebar_position: 4
---

# Error Handling

Next.js applications require efficient handling of errors occurring on both the server and client sides, and this section covers best practices for managing such errors.

## Server Errors
By default, Next.js offers a static 500 page to handle server-side errors in your application, but this generic page doesn't provide specific error details to the user. You can customize this page by creating a `pages/500.js` file to show specific errors to the application users. Additionally, you can use the 404 page to handle runtime errors, such as file not found.



## Client Errors
For client-side errors, you can use [React's Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) component, which catches and handles errors that occur within a specific part of your application.
You can use the `Error Boundary` component within a component to catch any errors that occur in the child components as shown in the following example:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

By wrapping your components in the Error Boundary component, you can catch errors and display custom error messages or other types of feedback to your users.

## Feedback on Failed Operations
Clear and concise user feedback is essential for communicating errors. Use UI components like toast messages or modals to display specific error messages and provide users with a solution.

## Error overlay in development mode
A runtime error during the development phase of a Next.js application results in an overlay, which is a modal that appears over the webpage. This overlay is only visible when the development server is running using the command `next dev` and is not displayed in the production environment. Resolving the error automatically dismisses the overlay.

## Related Resources
[Error Handling in Next.js](https://nextjs.org/docs/pages/building-your-application/configuring/error-handling)