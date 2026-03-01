# Glitch Video Dashboard

Small React + TypeScript + Vite SPA that will act as a status panel for the
[`glitch-video-editor`](https://github.com/citycountrycity2026/glitch-video-editor)
project.

The UI is intentionally lightweight and dependency‑lean. For now it only
renders placeholder sections for:

- **Agents** — workers / services involved in the video pipeline
- **Tasks** — work items, synced from GitHub or a simple JSON feed
- **Tests** — logic/regression test results from CI or local runs

## Tech stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- No routing library yet; simple single‑page layout
- Styling with basic CSS only (no heavy UI frameworks)

## Local development

```bash
npm install
npm run dev
```

Then open the printed localhost URL in your browser.

## Data model (future)

The dashboard is designed to be fed by one of two sources:

1. **GitHub issues / labels (primary plan)**
2. **A small `status.json` file in the `glitch-video-editor` repo**

The goal is to keep the ingestion logic simple, predictable, and easy to run
locally or in CI.

### Option 1: GitHub‑backed status

We can derive dashboard state directly from GitHub using a few conventions.

#### Agents

Represent agents as GitHub issues in `glitch-video-editor` with a dedicated
label, for example:

- Label: `dashboard:agent`

Each issue would correspond to one agent. Example fields:

- **Title** → Agent name (e.g. `render-worker-01`)
- **Labels** → role / capabilities (e.g. `role:renderer`, `env:prod`)
- **Body** → Free‑form description and operational notes
- **Issue state** → Online/offline/retired (combined with status JSON or comments)

Later, the dashboard can:

- Call the GitHub REST API (or GraphQL) to list issues with
  `label:dashboard:agent`.
- Map each issue into an `Agent` object with name, role, and status.

#### Tasks

Represent tasks as regular issues in `glitch-video-editor`, grouped by labels,
project, or milestone. Example conventions:

- Label: `dashboard:task`
- Status labels: `status:todo`, `status:in-progress`, `status:done`
- Optional priority labels: `priority:low|medium|high`

The dashboard would:

- Fetch issues with `label:dashboard:task`.
- Derive status from the `status:*` label (fallback to issue `state`).
- Display a compact board or list in the **Tasks** panel.

#### Tests

Store test health in either:

- A dedicated issue, e.g. `Dashboard: Test Suite Health`, or
- Issues labeled `dashboard:test`, one per suite.

Example fields to display:

- Test suite name
- Last known status (pass / fail / flaky)
- Timestamp of last run
- Link to CI logs or artifacts

The dashboard can:

- Read issue body/labels for the current status.
- Optionally parse check runs or workflow runs if we want tighter CI
  integration later.

#### Wiring this into the SPA

Once we are ready to pull live data, we can:

1. Add a **very small data layer** (e.g. a single `api/github.ts` module) that:
   - Uses `fetch` against a GitHub API proxy (to avoid exposing tokens in the
     browser), or
   - Uses unauthenticated calls if rate limits are not a concern.
2. Build minimal TypeScript types:
   - `Agent`, `Task`, `TestRun`.
3. Replace the placeholder cards with components that render those typed
   objects.

We’ll keep this logic thin and testable; no heavy state management libraries
are planned initially.

### Option 2: `status.json` in the main repo

For environments where GitHub API access is undesirable (offline, CI previews,
static hosting), `glitch-video-editor` can publish a single JSON artifact,
for example in its repo or build output:

```jsonc
// glitch-video-editor/.dashboard/status.json
{
  "generatedAt": "2026-03-01T10:00:00Z",
  "agents": [
    {
      "id": "render-worker-01",
      "role": "renderer",
      "status": "ok",
      "lastHeartbeat": "2026-03-01T09:50:00Z"
    }
  ],
  "tasks": [
    {
      "id": 123,
      "title": "Implement ffmpeg filter chain",
      "status": "in-progress",
      "assignee": "agent:render-worker-01"
    }
  ],
  "tests": [
    {
      "suite": "timeline-merge-logic",
      "status": "pass",
      "lastRun": "2026-03-01T09:30:00Z",
      "url": "https://ci.example.com/run/abc123"
    }
  ]
}
```

The dashboard would then:

1. Fetch `status.json` from a configurable URL (e.g. `/status.json` for
   static hosting, or a raw GitHub URL during development).
2. Parse into the same `Agent` / `Task` / `TestRun` types.
3. Render those objects in the existing **Agents**, **Tasks**, and **Tests**
   sections.

This keeps the SPA dumb: all interpretation of CI logs, workflows, and agent
health happens in `glitch-video-editor` or its CI scripts.

## Future TODOs

- Add minimal TypeScript models for agents, tasks, and tests.
- Introduce a tiny data‑fetching layer (either GitHub API or `status.json`).
- Add simple loading/error states to each panel.
- Optionally add routing (e.g. React Router or a tiny hand‑rolled router) once
  we need standalone views for each section.

## License

TBD.
