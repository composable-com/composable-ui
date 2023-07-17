---
sidebar_position: 2
---
# Security

This section recommends security best practices to follow when you implement an e-commerce solution.

:::caution
The security best-practices discussed in this documentation are provided for informational purposes only. Ensure to evaluate and implement appropriate security measures.
:::

## Public and Private API Keys

When working with headless services, you might generate API keys with limited scopes. You can use these APIs to obtain or update data.

For more information about the scope of API keys and relevant best-practices, see the documentation of the headless service that you want to use.

### The scope of public keys

Depending on your integration pattern, you may want to communicate with a headless service directly from the browser. In such cases, you must ensure that the API keys, which are accessible by users, cannot be used to harm the integrity of data. You can restrict the scope of the API keys by restricting the operations to read-only on relevant data and read-write on some of the active user's data. Ensure all API keys and data that are exposed to the browser through the [`NEXT_PUBILC` prefix](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser) are intended for Public use only. You must not prefix the server admin level keys with `NEXT_PUBLIC`.

### API keys in server-side operations

Only use private keys in server-side operations. When integrating with headless services that require heightened scopes, ensure that the API keys used are never exposed to the browser and are only used in server-side code.

While using private keys in server-side operations, we also recommend the following practises:

- Reduce the scope of the API keys only to the operations or actions that need the keys to function.
- Store the API keys in environment variables. Ensure these keys are **not** prefixed with [`NEXT_PUBLIC`](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser).
- Never store the API keys directly in code.
- Use a secret management tool to securely store and manage your API keys.

## Security Recommendations

- **Implement Security Headers**: Ensure you're implmenting strict security headers to limit possible attack vectors. 
  - Review [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security) for more information.
  - Implement [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) headers. Review all the possible directives that can mitigate certain attacks.
  - CSP headers can be set through the [next.config.js `headers`](https://nextjs.org/docs/pages/api-reference/next-config-js/headers) object.
- **Use HTTPS**: Ensure that your Next.js site is served over HTTPS to encrypt all communications and to protect against man-in-the-middle attacks.
- **Validate user input**: Ensure that user input is validated on the server to prevent cross-site scripting (XSS) attacks.
- **Implement secure authentication**: Use JWT or OAuth for authentication, and ensure that tokens are securely stored and transmitted.
- **Log usage of API** :Log sensitive API endpoint requests and responses, and regularly review the logs for any suspicious activities.
- **Keep dependencies up-to-date**: Keep all dependencies up-to-date, and regularly review and test the security of the application and its dependencies.
- **Test security regularly**: Regularly test the security of the application, using tools, such as security scanners and penetration testing.
- **Have an incident response plan**: Ensure that you have a well-defined incident response plan so that you can quickly respond to any security incidents that might occur.

## Related Resources

- [OWASP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
