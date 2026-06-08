# Helion Flight Registry

**Internal clearance terminal of the Celestial Transit Authority**

Helion Flight Registry is a sci-fi bureaucratic flight clearance interface.

This README is written as an operator briefing for new Celestial Transit Authority personnel. It explains how the Helion Flight Registry terminal works, which intake protocols are available, and how submitted flight dossiers are processed.

---

## Operator Briefing

You have been assigned to the **Helion Flight Registry**, an internal clearance node of the **Celestial Transit Authority**.

The current registry node is:

```text
Registry: Helion Flight Registry
Clearance Node: Terra-Orbit / 07
Status: Online
```

The Celestial Transit Authority controls administrative transit between recognized sectors, colonies, trade corridors, medical routes, scientific missions, and diplomatic paths.

A pilot cannot receive sector travel clearance without a complete flight dossier.

Each dossier contains:

- pilot identity records;
- origin sector and origin authority;
- vessel classification data;
- destination sector and flight purpose;
- access passphrase integrity;
- pilot registry photo.

Submitted dossiers enter the registry as **pending review**.

---

## Registry Lore

The Helion Flight Registry is not a public travel portal. It is an internal clearance terminal used by trained operators.

A flight application is treated as a clearance packet. The operator must verify the applicant, check origin data, register vessel information, confirm the flight request, and attach a valid pilot photo.

The visual direction is **bureaucratic sci-fi**:

- official registry panels;
- dossier cards;
- subtle orbital background details;
- dark terminal theme;
- light administrative theme;
- amber accents in light mode;
- cyan accents in dark mode.

---

## Intake Protocols

The terminal provides two ways to register a new dossier.

### Legacy Pilot Intake

Legacy Pilot Intake represents the older manual terminal flow.

The operator fills the entire dossier manually and submits the packet. Validation errors are shown only after the submission attempt.

Technical implementation:

- uncontrolled form;
- validation after submit attempt;
- shared Zod validation schema.

### Assisted Flight Clearance

Assisted Flight Clearance represents the newer guided validation protocol.

The terminal validates the packet while the operator fills it in. The submit channel stays locked until all registry requirements are satisfied.

Technical implementation:

- React Hook Form;
- live validation;
- shared Zod validation schema;
- disabled submit button until the form is valid.

---

## Dossier Sections

### Pilot Identity

Collects applicant identity data:

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

## Recognized Origin Authorities

The registry validates applicant origin data against recognized authorities.

Current recognized authorities include:

- **United Terran Directorate**
- **Lunar Administrative Union**
- **Free Veyran Compact**
- **Orion Frontier Council**
- **Perseus Trade Commission**
- **Vega Colonial Authority**
- **Helion Outer Reach Assembly**

These names support the project theme and are also used by the origin country/autocomplete field.

---

## Assignment Mapping

The interface uses themed registry terminology, but it maps directly to the form task requirements.

| Task requirement          | Registry implementation                                 |
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

Both intake protocols collect the same dossier data and use the same validation rules.

---

## Validation Rules

The registry rejects incomplete or invalid dossiers.

A valid dossier must satisfy these rules:

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

For this implementation, submitted dossiers are stored locally in the browser.

The registry stores:

- submitted flight applications;
- the latest submitted dossier id;
- origin authority options used by the autocomplete field.

Pilot photos are converted to Base64 data URLs before being saved into the stored dossier object.

No external server is used.

---

## Features

- Legacy uncontrolled form.
- Assisted React Hook Form flow.
- Shared Zod validation schema.
- Custom email validation without regular expressions.
- Passphrase strength and integrity panel.
- PNG/JPEG pilot photo upload.
- Base64 pilot photo conversion.
- Zustand store for submitted dossiers.
- Local persistence.
- Latest dossier marker.
- Modal rendered through React Portal.
- Modal close by button, Escape key, and outside click.
- Modal focus management.
- Light and dark theme support.
- Vitest and React Testing Library tests.

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

## Testing

The test suite covers the main form and registry behavior:

- flight application store behavior;
- form validation schema;
- email validation;
- name validation;
- country validation;
- image validation;
- passphrase strength;
- passphrase integrity;
- form error mapping;
- legacy form submission;
- assisted form submission;
- modal behavior;
- dossier rendering;
- launcher interactions;
- status summary rendering;
- page-level modal flows.

Current test summary:

```text
Test Files: 22 passed
Tests:      132 passed
```

Current coverage summary:

```text
Statements: 90.13%
Branches:   81.70%
Functions:  92.89%
Lines:      90.20%
```

---

## Project Identity

```text
Authority: Celestial Transit Authority
Registry: Helion Flight Registry
Clearance Node: Terra-Orbit / 07
Status: Online
Dossier State: Pending Review
```

---

## Assignment Links

This project was implemented for the RS School React Forms task.

- [Forms task](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/forms.md)
- [General task requirements](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/README.md)
