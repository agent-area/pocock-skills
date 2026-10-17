# Drill: on-call-fog

**Skills:** `/wayfinder`, with `/research`, `/prototype`, `/to-questionnaire`, `/grill-with-docs` and `/handoff` as the tools its tickets reach for, ending at `/to-spec`
**Curriculum:** Module 9 (Big fog)
**Language:** none to start. A prototype may pick one.

## Scenario

An engineering manager wants the platform team's on-call spreadsheet replaced. You have their request, a Slack thread, and the current rotation as CSV in `notes/`. Nobody knows yet what "replace" means, what HR's comp-time policy is, or whether this is a tool to build or one to buy.

This is too big and too foggy for one session. That's the point.

## Set up

```bash
learning/bin/start-drill on-call-fog
cd ~/pocock-dojo-drills/on-call-fog
```

## Run it

1. `/setup-matt-pocock-skills`: local markdown tracker.
2. `/wayfinder`. The first act is naming the **destination**. Make it concrete (a spec you'd hand to `/to-spec`? a build-or-buy decision?). The rest of the map depends on it.
3. Let it chart **decision tickets**, each with a type (`research`, `prototype`, `grilling`, `task`) and blocking edges. Read the map before working anything: is every ticket a *question*, not a chunk of build work?
4. Work at least three tickets across different types, one per session:
   - a **research** ticket (build vs buy; or how PagerDuty-style tools model overrides) via `/research`;
   - a **prototype** ticket (does a rotation-plus-overrides state model hold up against the CSV's weird rows?) via `/prototype`, logic branch;
   - a question only someone else can answer (HR's comp-time policy) via `/to-questionnaire`.
5. Notice the moments you want to just start building. That's the edge of the map.
6. When the fog's gone, hand off to `/to-spec`.

## Done when

- `.scratch/<effort>/map.md` names a destination and lists decisions so far, each gisted and linked to the ticket that holds it.
- At least three tickets are resolved, with answers in the ticket, not the map.
- One prototype is committed to its own `prototype/<name>` branch, not main.
- A questionnaire file exists for the HR question.
- You can say why this drill needed `/wayfinder` and the habit-tracker drill didn't.

## Debrief

Back in the learning workspace: `/teach debrief on-call-fog`. Bring the map and the resolved tickets. The teacher grades against `ANSWERS.md` in this folder.
