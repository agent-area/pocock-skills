# Drill: split-the-bill

**Skills:** `/diagnosing-bugs`, then `/retro`
**Curriculum:** Module 5 (Debugging), Module 7 (Closing the loop)
**Language:** Python 3.10+, standard library only

## Scenario

`tripsplit` splits shared trip expenses and tells people who pays whom. Finance sent this, pasted verbatim:

> Three trips last month came out of the settle-up with a line like this at the bottom:
>
> ```
> Settle-up for Porto, May
>   eli pays ana €172.50
>   dee pays ana €172.50
>   cy pays ana €72.50
>   ben pays ana €47.49
>   Unsettled remainder: -1 cent(s)
> ```
>
> Most trips are fine. We can't share the raw trip files (customer data). We did change the currency formatting last week, so maybe it's that?

The tests are green. The example trip settles cleanly.

## Set up

```bash
learning/bin/start-drill split-the-bill
cd ~/pocock-dojo-drills/split-the-bill
python -m unittest
```

## Run it

Start a fresh agent session in the drill folder and hand it the report: `/diagnosing-bugs` plus the quoted text above. Then drive. Your job is to keep the agent honest to the skill, not to find the bug yourself.

Checkpoints to hold it to:

1. **Phase 1 gate.** Before any theorising, the agent names **one command** it has already run that goes red on *this* symptom. If it starts reading `money.py` and forming theories first, call it out. There's no input file, so think about which loop from the skill's list fits "sometimes wrong output".
2. **Minimise.** The red case shrinks to the smallest input where every element is load-bearing.
3. **Hypotheses.** 3 to 5 ranked, each with a falsifiable prediction, shown to you before testing. Re-rank them yourself using what the report told you.
4. **Seam.** Before the regression test, decide with the agent *where* it goes. Is the unit the user cares about the split, or the settle-up?
5. **Cleanup.** No `[DEBUG-...]` lines left, the correct hypothesis written into the commit message.

Then, in the **same session**, run `/retro`.

## Done when

- One command reproduces the original symptom, and it now passes.
- A regression test exists at a seam you can justify out loud.
- The commit message states the hypothesis that turned out right.
- You have the retro's suggestions, and you've picked at least one you'd actually adopt.

## Debrief

Back in the learning workspace: `/teach debrief split-the-bill`. Bring your feedback-loop command, your hypothesis list, and the retro output. The teacher grades against `ANSWERS.md` in this folder (don't open it first).
