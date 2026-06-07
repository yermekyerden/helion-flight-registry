# Helion Flight Registry

**Internal clearance terminal of the Celestial Transit Authority**

Welcome to the Helion Flight Registry.

This terminal is used by Celestial Transit Authority operators to receive pilot dossiers, validate origin records, register vessel profiles, and prepare interstellar flight clearance packets for sector travel.

## Operator Briefing

The Celestial Transit Authority controls the administrative layer between pilots, vessels, origin authorities, and transit corridors.

Every applicant must submit a complete flight dossier before receiving clearance for interstellar movement.

The current registry node supports two intake protocols:

- **Legacy Pilot Intake** — manual dossier submission through the old terminal flow.
- **Assisted Flight Clearance** — guided dossier submission with active validation support.

Accepted dossiers are stored in the local registry as pending flight applications.

## Dossier Sections

Each flight application contains:

- Pilot identity
- Origin registry
- Vessel profile
- Flight request
- Security clearance
- Pilot photo

## Terminal Stack

The Helion node is powered by:

- Node.js 22+
- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Hook Form
- Zod
- Vitest
- React Testing Library

## Local Terminal Commands

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Training Assignment

This terminal is implemented for the RS School React Forms task.

- Forms task: https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/forms.md
- General requirements: https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/README.md
