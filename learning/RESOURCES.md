# Matt Pocock's agent skills: Resources

## Knowledge

- [The skills themselves: `../skills/engineering/` and `../skills/productivity/`](../skills/)
  The primary source. Every claim a lesson makes about what a skill does should cite its `SKILL.md` (and the side files it links, such as `tdd/tests.md`, `codebase-design/DEEPENING.md`). Use for: everything. Re-read before teaching; the fork can be updated from upstream and lessons go stale.
- [Human-facing docs: `../docs/engineering/` and `../docs/productivity/`](../docs/)
  Matt's explainer page per promoted skill, each with "When to reach for it", "Common questions" (real users' confusions, with issue links) and "It's working if". Use for: misconceptions to quiz on, and mastery checks. Published at `https://aihero.dev/skills-<skill-name>`.
- [`../skills/engineering/ask-matt/SKILL.md` and `PHASE-BOUNDARIES.md`](../skills/engineering/ask-matt/SKILL.md)
  The router: how every user-reachable skill fits the flows, plus the phase-boundary decision tree. Use for: Module 0, Module 4, and any "which skill when" question.
- [`../README.md`](../README.md)
  Matt's own framing of the four failure modes the skills fix (misalignment, verbosity, broken code, ball of mud), with the books each idea comes from. Use for: the "why" behind a skill.
- [`../.agents/invocation.md`](../.agents/invocation.md)
  User-invoked vs model-invoked, and how skills call each other. Use for: Module 0 and Module 10.
- [`../CHANGELOG.md`](../CHANGELOG.md)
  What changed and when. Use for: checking whether a lesson still matches current behaviour.
- [AI Coding Dictionary (AI Hero)](https://www.aihero.dev/ai-coding-dictionary/smart-zone)
  Matt's definitions of terms the skills lean on (smart zone, primary source, grilling, session). The docs pages link into it constantly. Use for: glossary entries.
- [Book: _A Philosophy of Software Design_ by John Ousterhout](https://www.amazon.co.uk/Philosophy-Software-Design-2nd/dp/173210221X)
  Origin of deep modules. Use for: Module 6.
- [Book: _The Pragmatic Programmer_ by David Thomas and Andrew Hunt](https://www.amazon.co.uk/Pragmatic-Programmer-Anniversary-Journey-Mastery/dp/B0833F1T3V)
  Tracer bullets, small steps, "no-one knows exactly what they want". Use for: Modules 1 to 3.
- [Book: _Domain-Driven Design_ by Eric Evans](https://www.amazon.co.uk/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)
  Ubiquitous language, the idea behind `GLOSSARY.md`. Use for: Module 1.
- Book: _Refactoring_ (2nd ed.) by Martin Fowler, chapter 3
  The smell baseline `/code-review` carries. Use for: Module 3.
- [Book: _Extreme Programming Explained_ by Kent Beck](https://www.amazon.co.uk/Extreme-Programming-Explained-Embrace-Change/dp/0321278658)
  "Invest in the design of the system every day." Use for: Module 6.

## Wisdom (Communities)

- [mattpocock/skills issues and discussions on GitHub](https://github.com/mattpocock/skills/issues)
  Where users report what broke and Matt decides what's in scope. Many "Common questions" answers link here. Use for: checking whether a problem you hit is known, and for testing an adaptation against other users' experience.
- [AI Hero skills newsletter](https://www.aihero.dev/s/skills-newsletter)
  Matt's updates on new and changed skills. Use for: staying current.
- Your own team
  The real test: run a flow on work that ships, and see whether reviewers notice the difference.

## Gaps

- No verified, moderated community chat for these skills has been found yet. Search before recommending one.
- No external, independent critique of the skills set has been vetted. Worth finding for balance.
