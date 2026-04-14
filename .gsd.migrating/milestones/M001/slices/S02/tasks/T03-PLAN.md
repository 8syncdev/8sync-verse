---
estimated_steps: 1
estimated_files: 3
skills_used: []
---

# T03: Auth service — login, register, refresh, verify với JWT

Implement auth.service.ts với bcrypt hash, JWT sign/verify, refresh token rotation. Ref: e-learning-encore auth

## Inputs

- `ref/e-learning-encore/src/dev/auth/`

## Expected Output

- `Working auth flow`

## Verification

curl POST /auth/register + /auth/login trả JWT, /auth/verify OK
