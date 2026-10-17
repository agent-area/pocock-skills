# Curriculum

A suggested route through the skills, for `/teach` to draw lessons from. It is a map, not a script: the mission, the learning records and the zone of proximal development decide what comes next. Each module names the primary sources to teach from, the ideas worth retrieval practice, the drill that turns them into skill, and what mastery looks like.

Paths are relative to this folder. `SKILL.md` files are the source of truth; the `docs/` pages are Matt's human-facing explainers, including the "Common questions" sections that record real users' confusions.

## Module 0: The shape of the set

- **Sources:** `../README.md`, `../skills/engineering/ask-matt/SKILL.md`, `../.agents/invocation.md`, `../docs/engineering/setup-matt-pocock-skills.md`
- **Ideas:** user-invoked skills orchestrate, model-invoked skills hold reusable discipline, and a user-invoked skill never calls another user-invoked one. The main flow (idea to ship), the two on-ramps (triage, diagnosing-bugs) plus wayfinder, codebase health, the vocabulary layer, standalones. `/setup-matt-pocock-skills` as the per-repo precondition and why config lives in the repo, not the skills.
- **Drill:** habit-tracker, steps 1 and 2.
- **Mastery:** given a situation, name the skill or flow without asking `/ask-matt`, then check with it and agree.

## Module 1: Alignment by interview

- **Sources:** `../skills/productivity/grilling/SKILL.md`, `../skills/engineering/grill-with-docs/SKILL.md`, `../skills/productivity/grill-me/SKILL.md`, `../skills/engineering/domain-modeling/SKILL.md` (and its `GLOSSARY-FORMAT.md`, `ADR-FORMAT.md`), `../skills/productivity/wait-what/SKILL.md`, matching `../docs/` pages
- **Ideas:** the design tree, rounds, the frontier. Facts are the agent's job, decisions are yours. "Yes" accepts the recommendation, so a lazy yes is a decision too. `grill-with-docs` vs `grill-me`: same interview, one leaves a paper trail. A glossary entry's _Avoid_ list. When a decision earns an ADR (hard to reverse, surprising without context, a real trade-off).
- **Drill:** habit-tracker, step 3.
- **Mastery:** a grilling where you overrode at least one recommendation with a reason, and a `GLOSSARY.md` that settles an overloaded word.

## Module 2: From conversation to buildable work

- **Sources:** `../skills/engineering/to-spec/SKILL.md`, `../skills/engineering/to-tickets/SKILL.md`, the "Context hygiene" section of `ask-matt`, matching `../docs/` pages
- **Ideas:** `to-spec` synthesises, it doesn't interview. Test at the highest seam; the ideal number of seams is one. Tracer-bullet vertical slices, blocking edges, the frontier. Prefactoring first. Expand and contract for wide refactors. Keep grilling, spec and tickets in one unbroken window.
- **Drill:** habit-tracker, steps 4 and 5.
- **Mastery:** you can reject a horizontal slicing and rewrite it as tracer bullets without help.

## Module 3: Building and reviewing

- **Sources:** `../skills/engineering/implement/SKILL.md`, `../skills/engineering/tdd/SKILL.md` (plus `tests.md`, `mocking.md`), `../skills/engineering/code-review/SKILL.md`, `../skills/engineering/pr/SKILL.md`, `../skills/engineering/implement-spec/SKILL.md`
- **Ideas:** seams agreed before any test. Red before green, one slice at a time. The three anti-patterns: implementation-coupled, tautological, horizontal slicing. Refactoring belongs to review, not the loop. Code review's two axes (Standards, Spec) and why they're never merged; the Fowler smell baseline. A PR body: smallest visual, before/after evidence, one-way or two-way door. When `/implement-spec` beats `/implement` per ticket.
- **Drill:** habit-tracker, steps 6 and 7; muddy-orders, steps 6 and 7.
- **Mastery:** you can spot a tautological or mock-coupled test in someone else's diff and say what to replace it with.

## Module 4: Context and phase boundaries

- **Sources:** `../skills/engineering/ask-matt/PHASE-BOUNDARIES.md`, `../skills/productivity/handoff/SKILL.md`, `../docs/productivity/handoff.md`, the smart zone entry in the AI coding dictionary (see `RESOURCES.md`)
- **Ideas:** the five options in order (continue, `/clear`, `/handoff`, subagent, `/compact`) and why the first yes wins. Primary vs secondary sources. `/handoff` is for portability only. `/compact` is the default but not the first reach. Decide at the boundary, never mid-phase.
- **Drill:** the boundary log in habit-tracker.
- **Mastery:** your boundary log matches the expected calls, and you can defend each one in a sentence.

## Module 5: Debugging with a feedback loop

- **Sources:** `../skills/engineering/diagnosing-bugs/SKILL.md`, `../docs/engineering/diagnosing-bugs.md`
- **Ideas:** the loop is the skill. Red-capable, deterministic, fast, agent-runnable. The ten ways to build one, especially property loops for "sometimes wrong". Minimise until every element is load-bearing. 3 to 5 falsifiable hypotheses, shown before testing. Tagged debug logs. No correct seam is itself a finding.
- **Drill:** split-the-bill.
- **Mastery:** you stop an agent that starts theorising before it has a red command, without having to think about it.

## Module 6: Design health

- **Sources:** `../skills/engineering/codebase-design/SKILL.md`, `DEEPENING.md`, `DESIGN-IT-TWICE.md`, `../skills/engineering/improve-codebase-architecture/SKILL.md`; Ousterhout (see `RESOURCES.md`)
- **Ideas:** module, interface, depth, seam, adapter, leverage, locality. The deletion test. One adapter is a hypothetical seam, two is real. The interface is the test surface. Scope a survey by recent change (YAGNI). The survey finds candidates; `codebase-design` is the bench you design on.
- **Drill:** muddy-orders.
- **Mastery:** you can explain a refactor's value in the vocabulary, without "service", "component" or "boundary".

## Module 7: Closing the loop

- **Sources:** `../skills/engineering/retro/SKILL.md`, `../skills/productivity/writing-for-agents/SKILL.md`
- **Ideas:** improve the environment, not the code. Mechanical mistakes become deterministic checks; judgement calls become coding standards for the reviewer. `CLAUDE.md` is for navigation pointers, used sparingly. A repo with no guardrail is a finding.
- **Drill:** the retro steps in split-the-bill and habit-tracker.
- **Mastery:** you adopt one retro finding in a real repo of yours, as a check rather than a rule where possible.

## Module 8: Inbound work

- **Sources:** `../skills/engineering/triage/SKILL.md`, `AGENT-BRIEF.md`, `OUT-OF-SCOPE.md`, `../docs/engineering/triage.md`
- **Ideas:** one category and one state per issue. Verify before grilling. Already-implemented is `wontfix` without an `.out-of-scope/` entry; rejected enhancements get one. Specific needs-info questions. Agent briefs that stand alone. Never triage tickets `/to-tickets` made.
- **Drill:** habit-tracker-triage.
- **Mastery:** your step-3 calls match the key on at least five of six issues.

## Module 9: Big fog

- **Sources:** `../skills/engineering/wayfinder/SKILL.md`, `../skills/engineering/research/SKILL.md`, `../skills/engineering/prototype/SKILL.md` (with `LOGIC.md`, `UI.md`), `../skills/productivity/to-questionnaire/SKILL.md`, matching `../docs/` pages
- **Ideas:** wayfinder plans, it doesn't do. A destination named first. Decision tickets typed research, prototype, grilling or task. The map is an index, not a store. Hand off to `/to-spec`, never straight to `/implement`. Prototypes are throwaway code on their own branch, kept as primary sources. Research leaves a cited file. A questionnaire interviews you about the send, not the subject.
- **Drill:** on-call-fog.
- **Mastery:** you can say in one sentence why a given effort needs `/wayfinder` or doesn't.

## Module 10: Making the skills yours

- **Sources:** `../skills/productivity/writing-for-agents/SKILL.md`, `../.agents/invocation.md`, `../skills/engineering/wizard/SKILL.md`, `../CHANGELOG.md`
- **Ideas:** skills are small and meant to be adapted. Description lines decide when a model-invoked skill fires. When something only a human can do deserves a `/wizard`.
- **Drill:** capstone below.
- **Mastery:** you've changed one skill, or written your own, and used it for real.

## Capstone

Run the main flow on a real feature at work, from `/grill-with-docs` to `/retro`, in your own repo. Debrief with `/teach debrief capstone`. Then write or adapt one skill based on what the retro taught you.
