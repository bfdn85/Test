# Playwright E2E Test Suite — SauceDemo

I built this project to demonstrate how I approach test automation from the ground up. It's a small but complete framework using Playwright and TypeScript targeting SauceDemo as a realistic e-commerce test environment.

## What I focused on

I wanted to show three things — clean test architecture using Page Object Model, a real smoke vs regression strategy, and CI/CD integration with both Azure DevOps and GitHub Actions.

## Test Strategy

Tests are split into two folders for a reason:

**Smoke** — login tests that run on a daily schedule every weekday morning. If login is broken nothing else matters so this is the first health check of the day.

**Regression** — checkout and inventory tests that run on every push and pull request. These are the safety gate before anything reaches main.

## Page Object Model

All selectors and browser interactions live in the pages/ folder. Three step pattern — declare the elements, find them in the constructor, write async methods. Tests just call methods like loginPage.login() without knowing any CSS selectors. Easy to maintain, easy to read.

## CI/CD

Integrated into both Azure DevOps and GitHub Actions. Both pipelines follow the same strategy — regression on push and PR, smoke on daily schedule. Azure pipeline publishes JUnit results to the Tests tab and uploads the HTML report as an artifact.

## Getting Started

```bash
npm install
npx playwright install --with-deps
npm test
npm run test:ui
npm run test:smoke
npm run test:regression
```