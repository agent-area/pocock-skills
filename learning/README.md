# Learning the skills

A `/teach` workspace for learning to drive the skills in this repo well, plus hands-on drills to practise them on.

Lessons come from `/teach`. Skill comes from the drills: small, deliberately flawed codebases (Python and JavaScript) where each skill has something real to bite on, with an answer key the teacher grades you against.

## Start

```bash
cd learning
claude
> /teach
```

The first session confirms `MISSION.md` (it's a draft written from your first request) and then picks a first lesson. After that, open a fresh session here and say `/teach next lesson`.

## Practise

```bash
learning/bin/start-drill                  # list drills
learning/bin/start-drill split-the-bill   # copy one to ~/pocock-dojo-drills/split-the-bill as its own git repo
```

Each drill runs in its own directory, outside this repo, so the agent works in a clean project with its own history (tagged `drill-start`, your fixed point for `/code-review`). Read the drill's `BRIEF.md`, do it in a fresh agent session there, then come back here and run `/teach debrief <drill>`.

| Drill | Language | Skills it exercises |
| --- | --- | --- |
| [habit-tracker](drills/habit-tracker/BRIEF.md) | Python | The main flow: `/ask-matt`, setup, `/grill-with-docs`, `/to-spec`, `/to-tickets`, `/implement`, `/tdd`, `/code-review`, `/pr`, `/retro`, plus phase boundaries |
| [split-the-bill](drills/split-the-bill/BRIEF.md) | Python | `/diagnosing-bugs`, `/retro` |
| [muddy-orders](drills/muddy-orders/BRIEF.md) | JavaScript | `/improve-codebase-architecture`, `/codebase-design`, `/tdd`, `/code-review` |
| [habit-tracker-triage](drills/habit-tracker-triage/BRIEF.md) | Python | `/triage` |
| [on-call-fog](drills/on-call-fog/BRIEF.md) | none | `/wayfinder`, `/research`, `/prototype`, `/to-questionnaire`, `/to-spec` |

Suggested order: habit-tracker steps 1 to 3, then split-the-bill (short, sharp), then the rest of habit-tracker, muddy-orders, triage, and on-call-fog last. `CURRICULUM.md` has the full route.

Don't open a drill's `ANSWERS.md` before you've tried it. That's the teacher's key.

## What's here

| Path | What it is |
| --- | --- |
| `MISSION.md` | Why you're learning this. Draft until the first `/teach` session confirms it |
| `RESOURCES.md` | Sources to teach from: the skills and docs in this repo first, then the books they come from |
| `NOTES.md` | Your preferences and how the teacher should use the drills |
| `CURRICULUM.md` | Suggested modules, each with sources, ideas, drill and a mastery check |
| `drills/` | Practice projects, each with `BRIEF.md` and `ANSWERS.md` |
| `assets/` | Shared lesson stylesheet and a quiz component that shuffles answers |
| `bin/start-drill` | Copies a drill out to its own repo |

`/teach` adds `lessons/`, `reference/` and `learning-records/` as you go. Commit them; they're your course.

## Prerequisites

- The skills installed in Claude Code (see the top-level `README.md`), or linked from this fork with `scripts/link-skills.sh` so your fork's versions are the ones you learn.
- Python 3.10+ and Node 20+ for the drills. No other dependencies.
