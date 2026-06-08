# Helion Flight Registry

**Internal clearance terminal of the Celestial Transit Authority**

Helion Flight Registry is a sci-fi bureaucratic flight clearance interface built for the RS School React Forms task.

The application represents an internal registry node used by Celestial Transit Authority operators to process pilot dossiers, validate origin records, register vessel profiles, and prepare interstellar flight clearance packets for sector travel.

---

## Operator Briefing

The **Celestial Transit Authority** controls the administrative layer between pilots, vessels, origin authorities, and interstellar transit corridors.

Every applicant must submit a complete flight dossier before receiving clearance for movement between recognized sectors.

The current registry node is:

```text
Helion Flight Registry
Clearance Node: Terra-Orbit / 07
Status: Online
```

Operators can register a new flight dossier through one of two intake protocols:

- **Legacy Pilot Intake** — manual terminal submission through an uncontrolled form.
- **Assisted Flight Clearance** — guided submission with React Hook Form and live validation.

Accepted dossiers are stored locally as pending flight applications and displayed in the active registry.

---

## Registry Lore

The Helion Flight Registry is not a public travel portal. It is an internal clearance terminal used by trained operators of the Celestial Transit Authority.

The registry exists in a future where civil, trade, diplomatic, medical, scientific, and colonial transit routes pass through recognized sector authorities.

A flight application is not just a form submission. It is a pending clearance packet containing:

- pilot identity records;
- origin sector and origin authority;
- vessel classification data;
- destination sector and flight purpose;
- access passphrase integrity;
- pilot registry photo.

Each submitted dossier remains in **pending review** until the registry node accepts, escalates, or rejects the packet.

The application is designed as **bureaucratic sci-fi** rather than pure cyberpunk. The visual direction is closer to an official orbital administration terminal:

- registry panels;
- dossier cards;
- controlled sci-fi typography;
- subtle grid and orbital background details;
- amber accents in light theme;
- cyan accents in dark theme;
- clean administrative layout.

---

## Recognized Origin Authorities

The registry validates applicant origin data against recognized authorities.

Current authority examples include:

- **United Terran Directorate** — central Terran authority.
- **Lunar Administrative Union** — lunar administrative structure.
- **Free Veyran Compact** — independent outer settlement compact.
- **Orion Frontier Council** — frontier sector council.
- **Perseus Trade Commission** — interstellar trade authority.
- **Vega Colonial Authority** — colonial administration.
- **Helion Outer Reach Assembly** — outer reach territorial assembly.

These names support the project theme while also powering the country/autocomplete requirement from the task.

---

## Intake Protocols

### Legacy Pilot Intake

Legacy Pilot Intake represents the older manual terminal flow.

The operator fills the entire dossier manually and submits the packet. Validation errors are reported only after the submission attempt.

This flow is implemented as an **uncontrolled form**.

### Assisted Flight Clearance

Assisted Flight Clearance represents the newer guided validation protocol.

The terminal validates the packet while the operator fills it in. The submit channel stays locked until all registry requirements are satisfied.

This flow is implemented with **React Hook Form** and shared Zod validation.

---

## Dossier Sections

Each flight application is divided into registry sections.

### Pilot Identity

Collects the applicant identity data:

- full legal name;
- registry age;
- relay email;
- identity marker;
- pilot photo.

### Origin Registry

Verifies where the applicant comes from:

- origin sector;
- origin world;
- recognized origin country or authority.

### Vessel Profile

Registers the vessel assigned to the clearance packet:

- vessel name;
- vessel class;
- crew capacity;
- callsign.

### Flight Request

Defines the requested transit operation:

- destination sector;
- flight purpose.

### Security Clearance

Validates access and protocol acceptance:

- access passphrase;
- passphrase confirmation;
- Stellar Flight Protocol agreement.

---

## Assignment Compliance Notes

The application uses themed registry terminology, but it maps directly to the React Forms task requirements.

| Task requirement          | Helion Flight Registry implementation                   |
| ------------------------- | ------------------------------------------------------- |
| Uncontrolled form         | **Legacy Pilot Intake**                                 |
| React Hook Form form      | **Assisted Flight Clearance**                           |
| Gender picker             | **Identity marker**                                     |
| Country autocomplete      | **Origin country / authority**                          |
| Password fields           | **Access passphrase** and **Confirm access passphrase** |
| Terms checkbox            | **Stellar Flight Protocol agreement**                   |
| Image upload              | **Pilot photo**                                         |
| Submitted users/data list | **Flight dossier registry**                             |
| Global state              | **Zustand flight application store**                    |
| Modal through portal      | **Protocol intake modal**                               |

Both intake protocols collect the same flight application data and use the same Zod validation rules.

---

## Core Features

- Two form implementations:
  - uncontrolled legacy form;
  - React Hook Form assisted form.

- Shared Zod validation schema.

- Custom email validation without regular expressions.

- Password/passphrase strength and integrity panel.

- Image upload with PNG/JPEG validation.

- Base64 pilot photo conversion for stored dossiers.

- Zustand store for flight applications.

- Local persistence for submitted dossiers.

- Latest dossier marker.

- Accessible modal with React Portal.

- Modal focus management, Escape close, close button, and outside click close.

- Light and dark theme support.

- Sci-fi registry background for both themes.

- Reusable UI primitives for fields, inputs, panels, buttons, modal, and sections.

- Vitest and React Testing Library coverage for important form, store, modal, validation, and UI behavior.

---

## Validation Rules

The registry validates several important constraints:

- name must start with an uppercase Latin letter;
- email must contain one `@` symbol and a valid dotted domain;
- age must be within the configured registry range;
- origin authority must exist in the registry options;
- vessel data must satisfy length and capacity limits;
- pilot photo must be PNG or JPEG;
- pilot photo must stay below the configured size limit;
- access passphrase must satisfy minimum strength rules;
- passphrase confirmation must match;
- Stellar Flight Protocol must be accepted.

---

## Data Storage

Submitted flight dossiers are stored locally in the browser through the flight application Zustand store.

The registry keeps:

- all submitted flight applications;
- the latest submitted dossier id;
- origin authority options used by the autocomplete field.

Pilot photos are converted to Base64 data URLs before being saved into the stored dossier object.

---

## Tech Stack

- **Node.js 22+**
- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Zustand**
- **React Hook Form**
- **Zod**
- **Vitest**
- **React Testing Library**
- **ESLint**
- **Prettier**
- **Husky**
- **lint-staged**

---

## Project Architecture

The project follows a feature-oriented structure inspired by **Feature-Sliced Design**.

```text
src
├── app
├── entities
├── features
├── pages
├── shared
└── widgets
```

### app

Application entry point, root component, global styles, and app initialization.

### pages

Page-level composition.

The main page is:

```text
stellar-flight-registry-page
```

It combines the hero area, status summary, protocol launcher, dossier registry, modal flows, and theme toggle.

### widgets

Large UI blocks composed from features, entities, and shared UI.

Examples:

- flight application launcher;
- flight dossier registry;
- registry status summary.

### features

User-facing business actions.

The main feature is:

```text
submit-flight-application
```

It contains:

- assisted form flow;
- legacy form flow;
- shared form sections;
- form validation;
- form-to-domain mapping;
- passphrase integrity logic.

Another feature is:

```text
toggle-color-theme
```

It contains the color theme model and theme toggle UI.

### entities

Business entities and their state.

The main entity is:

```text
flight-application
```

It contains:

- flight application domain model;
- available registry options;
- Zustand store;
- selectors.

### shared

Reusable technical and UI building blocks:

- UI primitives;
- theme class tokens;
- test helpers;
- file utilities;
- shared configuration.

---

## Architecture Rules

Important architecture rules used in this project:

- layers stay explicit: `app`, `pages`, `widgets`, `features`, `entities`, `shared`;
- feature slices do not import from sibling feature slices;
- flight application domain options live in the `flight-application` entity;
- flight application validation, mapping, form state helpers, and passphrase logic live inside the `submit-flight-application` feature;
- shared code contains reusable UI primitives, technical utilities, test helpers, and stable configuration;
- tests are colocated next to the code they verify;
- barrel files are avoided in favor of explicit imports.

This keeps the project readable, self-documenting, and easy to navigate.

---

## Local Setup

Install dependencies from the lockfile:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Quality Commands

Run ESLint:

```bash
npm run lint
```

Format files with Prettier:

```bash
npm run format
```

Check formatting without changing files:

```bash
npm run format:check
```

Run tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run coverage:

```bash
npm run test:coverage
```

Run the full local verification:

```bash
npm run test
npm run test:coverage
npm run lint
npm run build
npm run format:check
```

---

## Testing Focus

The test suite focuses on meaningful behavior instead of testing implementation details.

Covered areas include:

- flight application store behavior;
- form validation schema;
- email validation;
- name validation;
- country validation;
- image validation;
- password strength;
- passphrase integrity;
- form error mapping;
- legacy form submission;
- assisted form submission;
- modal accessibility behavior;
- dossier rendering;
- launcher interactions;
- status summary rendering;
- page-level modal flows.

The tests are written with a readable structure close to the AAA pattern:

- clear setup;
- one user-facing action or model operation;
- explicit expectations.

The suite also follows the spirit of FIRST principles:

- fast enough for local iteration;
- isolated from external services;
- repeatable in CI/local environments;
- self-validating through assertions;
- targeted at meaningful behavior.

During testing, the assisted form integration test caught and helped fix a real reset-loop bug in the React Hook Form flow.

---

## Testing Results

Current test summary:

```text
Test Files: 22 passed
Tests:      132 passed
```

Current coverage summary:

```text
Statements: 90.11%
Branches:   81.70%
Functions:  92.89%
Lines:      90.18%
```

---

## Git Hooks

The project uses Husky and lint-staged.

Before each commit, staged files are checked with:

```bash
npm run lint-staged
```

The pre-commit hook helps keep formatting and linting consistent before code enters the repository history.

---

## Assignment Links

This project was implemented for the RS School React Forms task.

- [Forms task](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/forms.md)
- [General task requirements](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/README.md)

---

## Project Identity

```text
Authority: Celestial Transit Authority
Registry: Helion Flight Registry
Clearance Node: Terra-Orbit / 07
Status: Online
Dossier State: Pending Review
```

Helion Flight Registry is designed as a clean, production-minded React application with a strong visual identity, consistent architecture, reusable UI, and meaningful test coverage.
