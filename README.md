# Activity Graph

Reusable team activity feed and employee activity dashboard (React/TypeScript). Ships self‑contained UI components (no parent‑app types) and utility functions for building rich activity views.

## Features

- Team Activity tab with range filter and comparative line graph
- Employees Activity tab with toolbar search and table view
- Recent activity list with formatted entries
- Local, minimal type definitions to keep the module independent
- Built with shadcn/ui + TanStack Table

## Directory structure

```
external/activity-graph/
├─ components/
│  ├─ ActivityLineGraph.tsx
│  ├─ MemberChips.tsx
│  ├─ RecentActivityList.tsx
│  └─ TeamActivityFeed.tsx   # Primary entry component
├─ utils/
│  ├─ events.ts
│  ├─ interactions.ts
│  └─ time.ts
└─ README.md
```

## Tech stack

- React + TypeScript
- shadcn/ui
- TanStack Table

## Installation (as a submodule)

If this folder has been split into a standalone repo (e.g. `TechWithTy/activity-graph`), add it as a submodule to your host project:

```bash
git submodule add https://github.com/TechWithTy/activity-graph.git external/activity-graph
```

Install peer dependencies in your host app (version ranges per your app setup):

```bash
pnpm add @tanstack/react-table clsx tailwind-merge
```

Also ensure shadcn/ui primitives are available in your host app (Buttons, Tabs, Input, Label, etc.).

## Usage

Import and render `TeamActivityFeed` inside a page or route. Provide a `permissions` object compatible with the local utilities.

```tsx
import TeamActivityFeed from "@/external/activity-graph/components/TeamActivityFeed";

export default function Page() {
  return (
    <TeamActivityFeed
      permissions={{ ManageTeam: true, ViewReports: true }}
      apiPath="/api/v1/team/activity"
      days={14}
    />
  );
}
```

## Notes on typing

- This module defines minimal local types and avoids importing types from a parent app to remain portable.
- When consuming table callbacks (e.g., `renderToolbar`), annotate `table` as `Table<TeamMember>` where `TeamMember` refers to your host‑app team member row type. If you prefer, you may continue with `unknown` and infer.

## Development

- The components assume TailwindCSS and shadcn/ui are configured in the host app.
- Line‑ending warnings (LF→CRLF) on Windows are cosmetic. You can enforce LF via a root `.gitattributes` if desired.

## License

MIT
