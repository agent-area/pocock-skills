// Quiz and recall components for lessons. Include once per page:
//   <script src="../assets/quiz.js" defer></script>
//
// Multiple choice. Answers are shuffled on load, so author them in any order;
// mark the right one with data-correct:
//   <div class="quiz">
//     <p class="q">Which phase must finish before any hypothesis?</p>
//     <ol>
//       <li data-correct>Building a red-capable feedback loop</li>
//       <li>Writing the regression test first</li>
//     </ol>
//     <p class="explain">Phase 1 gates everything. Cite the source here.</p>
//   </div>
//
// Recall (retrieval practice): the learner writes from memory, then reveals.
//   <div class="recall">
//     <p class="q">Name the five phase-boundary options, in order.</p>
//     <div class="answer">Continue, /clear, /handoff, subagent, /compact.</div>
//   </div>
(function () {
  function shuffle(items) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  document.querySelectorAll(".quiz").forEach((quiz) => {
    const list = quiz.querySelector("ol, ul");
    if (!list) return;
    shuffle(Array.from(list.children)).forEach((li) => list.appendChild(li));

    list.addEventListener("click", (event) => {
      const li = event.target.closest("li");
      if (!li || quiz.classList.contains("answered")) return;
      if (li.hasAttribute("data-correct")) {
        li.classList.add("correct");
        quiz.classList.add("answered");
      } else {
        li.classList.add("wrong");
      }
    });
  });

  document.querySelectorAll(".recall").forEach((block) => {
    const answer = block.querySelector(".answer");
    if (!answer) return;
    const box = document.createElement("textarea");
    box.placeholder = "Write it from memory first.";
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Reveal";
    button.addEventListener("click", () => block.classList.add("revealed"));
    block.insertBefore(box, answer);
    block.insertBefore(button, answer);
  });
})();
