# Angular Training Application

> **Status: Learning project** — built in 2026 to practise modern Angular
> patterns. It is not a production application and does not use a real
> authentication or persistence backend.

This repository contains a small Angular application developed through a set of
training exercises. It combines user management, guarded navigation, reactive
state, local persistence and a film lookup screen in one project.

## What it demonstrates

- standalone Angular components and application-level routing;
- user creation, editing, listing and deletion;
- reactive forms and Angular Material controls;
- a route guard backed by a small authentication service;
- local persistence with `localStorage` and an RxJS `BehaviorSubject` exercise;
- HTTP integration with the OMDb film API without committing an API key;
- unit tests with Angular's Vitest-based test runner;
- code formatting and coverage scripts.

## Stack

- Angular 21 and TypeScript 5.9
- Angular Material and CDK
- RxJS
- SCSS
- Vitest and jsdom

## Run locally

Requirements: a Node.js version supported by Angular 21 and npm.

```bash
git clone https://github.com/JulienEsbt/Angular-Formation.git
cd Angular-Formation
npm ci
npm start
```

Open `http://localhost:4200`.

## Checks

```bash
npm test
npm run coverage
npm run build
```

The test suite currently focuses mainly on component and service creation, with
some behavioural coverage for user management. It should be expanded before
the project is used as a reference for production testing practices.

## Current limitations

- authentication is a local training abstraction, not a security boundary;
- user data is stored only in the browser;
- the film search depends on an external API and asks for an OMDb API key at
  runtime; the key is not stored by the application;
- the application has no backend or deployment configuration;
- some exercise implementations and tests still need refinement.

## License

No open-source license has been selected for this learning repository.
