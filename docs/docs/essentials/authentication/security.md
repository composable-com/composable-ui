
# Cookie Security

Composable UI uses Cookies to store user data and access tokens. This information is encrypted and managed by NextAuth. In addition to NextAuth's security measures, Composable UI also protects your application against Cross Site Request Forgery (CSRF) attacks

## Cross Site Request Forgery (CSRF)

Please see the [Cross Site Request Forgery (CSRF) documentation on OWASP](https://owasp.org/www-community/attacks/csrf) to learn about CSRF vulnerabilities and common attacks.

## CSRF Prevention

Composable UI mitigates CSRF attack vectors through implementing a [double submit cookie](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie) pattern to ensure the origin of the request came from a legitimate source, and not a third party site attempting to perform a malicious action.
