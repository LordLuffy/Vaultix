# Security Policy

## Supported Versions

Only the latest published version receives security patches.

| Version | Supported |
|---------|-----------|
| 1.x (latest) | Yes |
| < 1.0 | No |

## Reporting a Vulnerability

**Do not open a public issue for a security vulnerability.**

Send a private report via **GitHub Security Advisories**:
1. Go to the **Security** tab of the repository
2. Click **Report a vulnerability**
3. Describe the issue, the reproduction steps, and the potential impact

You will receive a response within 7 business days. If the vulnerability is confirmed, a patch will be published as soon as possible with a mention in the release notes.

## Scope

This project is a Windows desktop application. Elements within the security scope include:

- Credential leaks (passwords, secrets stored in the vault)
- Arbitrary code execution via application features
- Bypass of secure storage (Windows Credential Manager)
- Vulnerabilities in Rust or npm dependencies included in the final binary
