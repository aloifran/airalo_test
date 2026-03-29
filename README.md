# Airalo Coding Exercise
*by Francisco Aloi*

## How to run tests

Tests can be run locally or triggered via GitHub Actions, please follow instructions below.

## Running Tests Locally

- Clone the repository and run
```
cp .env.example .env
npm install
```
- Set CLIENT_ID and CLIENT_SECRET in .env file (needed by API tests)
- Run desired test command (all tests, UI only, API only)
```
npm test
npm run test:ui
npm run test:api
```

## Running Tests on GitHub Actions

Go to **Actions → Playwright Tests → Run workflow** and select an option:
- `all` — runs all tests
- `ui` — runs UI tests only
- `api` — runs API tests only

- An HTML report is uploaded as an artifact after each run and can be downloaded by clicking on "playwright-report" link under Artifacts section.
- API credentials must be set as repository secrets in Github Settings for API tests to work (already set).
- Tests run automatically on push and pull requests to `main` branch.

### My approach

For UI tests:
- Setup Playwright with a Page Object Model approach with Page classes inheriting from a Default page. I believe it's an easy pattern to understand and extend.
- Implemented a before hook to bypass the cookie consent popup to avoid compromising locators visibility
- Created UI tests for Japan Location Unlimited Package validations.

For API tests:
- Implemented a utilty function to authenticate before making any request.
- Created API tests for the `"[POST] /order"` endpoint and `"[GET] /sims"` endpoint.
- Setup Github Actions CI workflow that runs on push and pull requests to `main` branch, or can be triggered manually.

### What I would improve

- Implement a log solution for printing out API response bodies (included console.log() calls for now).
- Implement a test results summary to the Github Actions CI job for a quick overview of tests results.
- Add a lint step to the Github Actions CI job to catch style issues.
