# on-call-fog: answer key

For the teacher. The learner should not read this before attempting the drill.

## A good destination

Concrete and checkable, e.g. "a spec for an MVP rotation tool for the Platform team that `/to-spec` can turn into tickets, or a recorded decision to buy, with the evaluation that justified it". Weak: "replace the spreadsheet" (not a destination, a wish).

## Fog the map should chart as decision tickets

- **Build or buy** (research): PagerDuty / Opsgenie / incident.io schedules already handle rotations, overrides and notifications. Does the team already pay for one (the Slack thread says PagerDuty is in use)? If yes, the cheapest destination may be "make PagerDuty the source of truth and delete the sheet". Learners who reach this early earn the most credit: it collapses half the map.
- **Source of truth** (grilling): the sheet and PagerDuty disagree today (`dev` was paged after a swap). Whatever ships, only one place may own the schedule.
- **Rotation model** (prototype, logic branch): weekly primary/secondary with overrides (partial-day swaps like "sat only", time-window constraints like "no nights"). The CSV's notes column is the test data: the "lin no nights (dev covers 22:00-07:00)" row needs sub-shift overrides, not week swaps.
- **Constraints** (grilling): availability rules (Lin can't do nights until March) are a constraint on generation, not an override after the fact.
- **Time zones** (research or grilling): London and Lisbon are the same offset year-round in reality (both are UTC+0 in winter and UTC+1 in summer). Priya's claim in the thread is wrong. A learner who verifies it via `/research` instead of building DST handling for it earns credit; it's the "facts are the agent's job" lesson.
- **Comp time** (to-questionnaire): only HR can answer. Public holidays counting double is a policy question, not an engineering one.
- **Multi-team** (grilling): do the other teams share a rotation model, or just the tool? Probably a later concern; a good map marks it as fog rather than resolving it now.

## Shape checks

- Tickets are questions with decisions as answers, not "build the scheduler".
- Blocking edges: rotation model and source of truth both wait on build-or-buy.
- The map is an index: decisions gisted with a link, detail in tickets.
- Prototype on a `prototype/<name>` branch, verdict recorded on the ticket.

## Common learner mistakes to probe

- Writing tickets that are build tasks.
- Resolving the comp-time question by guessing.
- Building DST logic for London/Lisbon.
- Looping straight from the map into `/implement`, skipping `/to-spec`.
