# Intervention Redesign Proposal (Qualtrics → AI App)

## Purpose
Document the rationale, before/after comparison, and concrete changes to streamline and personalize the SoLBot AI intervention based on the traditional Qualtrics flow and the current AI prompts.

## Rationale (Why change?)
- **Time burden & fatigue:** Qualtrics used many MCQs and multi-step tasks per construct; pilot feedback flagged this as too long.  
- **Clarity & transfer:** Students benefit more from single applied items (course-specific) than from multiple generic MCQs.  
- **Personalization:** The AI app can swap examples by discipline and adapt depth—missing in the traditional flow.  
- **Reduction of redundancy:** Multiple overlapping checks (e.g., self-testing/spacing) can be consolidated into one applied prompt each.  
- **Better scaffolding:** Use minimum-score + targeted fix, with optional “show more examples” instead of flooding guidance upfront.

## Before → After (High-Level)

| Area | Previous Qualtrics (raw text) | Current AI app (before) | Proposed AI app (after) |
| --- | --- | --- | --- |
| Strategy checks | Multiple MCQs + short-answer per construct (e.g., “Which plan best uses spacing?”, “List 3 ways self-testing helps”) | Limited, mostly implied; no explicit applied prompts for self-testing/spacing/self-explanation | One applied item per construct (course-specific) + inline sample answer; no MCQs |
| Mental Contrasting / IF-THEN | Several goals/obstacles; long text responses | Multiple prompts per goal; can feel heavy | ONE goal + ONE biggest obstacle + ONE IF–THEN (timeline). Optional 2nd obstacle only if user opts in |
| Monitoring | Several items on monitoring & resources | Detailed rubric but can over-ask | One schedule + one metric + one trigger; suggest 1–2 alternatives |
| Personalization | Static; same for all | Domain-agnostic examples | Collect course/assignment, time, obstacle type, preference (template vs example); domain-aware examples; quick-path if low time |
| Knowledge checks | Many MCQs per module | Some rubric scoring, but checks not trimmed | Max 1 applied check per module; replace MCQs with applied + sample answer |
| Examples | Long text in-line | Fixed examples | “Show more examples” toggle to reduce cognitive load |
| Summary | Generic | Minimal | Personalized recap: goal, IF–THEN, monitoring plan, next action (course-specific) |

## Specific “Before” Text (Qualtrics excerpts)
- Self-testing plan chooser: multiple options like “Block out the entire day…”, “After turning in a homework assignment… set up reminders…”  
- Spacing MCQ: “Which plan best uses spacing?” with options for Ana/Brad/Cora/Deneshia.  
- Self-testing benefits: “List the 3 ways that self-testing helps you learn.”  
- Spacing definition MCQ: “What does the spacing effect show?”  
- Monitoring: Several reflections plus resource listings.  
- MCII: Multiple obstacles/goals; several reflection prompts.

## Specific “After” Text (Proposed AI Prompts)
**Phase 1 (Strategies – applied, no MCQ):**
- Self-testing: “Write 2 self-test questions for ONE concept in your course this week. (Sample: For transformer attention: ‘Explain why multi-head attention helps; Derive the attention score formula.’)”
- Spacing: “Set TWO revisit dates for ONE topic; state what you’ll do on each date. (Sample: Wed: 3 practice problems; Sun: 5 spaced-retrieval Qs.)”
- Self-explanation: “Explain ONE hard concept from your course in 2–3 sentences for a peer.”

**Phase 2 (Task Analysis):**
- Keep: Objective + Resources.  
- Add back lightweight cognitive level: “Pick the level: knowledge / comprehension / application / analysis.”  
- Prompt: “State ONE learning objective for your course; pick cognitive level; list 2 specific resources and how you’ll use them.”

**Phase 4 (Goals / MCII, streamlined):**
- “Goal (specific, measurable, this week): …”  
- “Biggest obstacle: …”  
- “IF [specific obstacle], THEN [specific action + timeline]. (Sample: IF I struggle with transformer attention after reading, THEN watch CS224N Lecture 9 and code along within 2 days.)”  
- Optional: “Add another obstacle?” (toggle)

**Phase 5 (Monitoring & Adaptation):**
- “Schedule: When will you check progress?”  
- “Metric: What will you measure?”  
- “Trigger: When will you adapt? (e.g., <70% on practice set twice)”  
- “Pick 1 alternative strategy if trigger hits (e.g., switch to video walkthroughs on topic X).”

**Summary (personalized):**
- Show: Goal; IF–THEN; Monitoring plan (schedule + metric + trigger); Next action in the user’s domain.  
- Button: “Apply to my course” autofills examples with stored domain data.

## Design Changes to Prompts/Flows (What & How)
1) **Reduce knowledge checks to 1 applied item per module**  
   - Swap MCQs for applied prompts + inline sample answer.  
   - Rationale: cuts time, increases transfer.

2) **Inline + expandable examples**  
   - Default: one short domain-matched example.  
   - “Show more examples” reveals 2–3 more.  
   - Rationale: lowers cognitive load; user controls depth.

3) **Single MCII task**  
   - One goal + one obstacle + one IF–THEN with timeline; optional second obstacle.  
   - Rationale: reduces friction while preserving behavior-change effect.

4) **Cognitive level picker** in Phase 2  
   - One-tap choice (knowledge/comprehension/application/analysis).  
   - Rationale: retains SRL task-definition alignment from Qualtrics.

5) **Monitoring minimal set**  
   - Exactly one schedule, one metric, one trigger; one alternative strategy.  
   - Rationale: keeps it actionable, fast.

6) **Personalization inputs upfront**  
   - Collect: course/discipline, current assignment/exam, time available this week, obstacle type (time/concept/planning/focus), preference (template-first vs example-first).  
   - Use these to: select examples, decide quick-path depth, and choose scaffolding style.

7) **Guidance brevity + targeted fix**  
   - Keep minimum-score rule; show which criterion caused LOW/MEDIUM and give one concrete fix.  
   - Rationale: reduces revision loops.

## Prompt Component Checklist (per phase)
- Clear role/persona + scoring table (0/1/2).  
- Max 3 guiding questions per phase.  
- One applied knowledge check with inline sample answer.  
- Optional “Show more examples” block.  
- Assessment section with brief per-criterion feedback (<15 words).  
- Guidance with templates/examples; Next Steps with a single actionable request.  
- Metadata for logging: scores, lowest category, scaffolding level, stored user context (goal, obstacle, IF–THEN, monitoring plan).

## Data to Capture & Keep
- **Upfront:** course/discipline, assignment/exam, time budget, obstacle type, support style.  
 - **Tone preference & autonomy:** choose tone (warm/concise/coachy) and control depth (quick-path vs deep).  
 - **Per phase:** objective, resources, cognitive level; goal, obstacle, IF–THEN; monitoring plan (schedule/metric/trigger); chosen examples/templates.  
 - **History (minimal):** past criterion lows/highs, what fix was offered, selected examples/templates. Avoid storing unnecessary PII.

## Expected Impact
- Shorter, clearer flows; less MCQ fatigue.  
- Higher transfer via applied, course-specific answers.  
- Better personalization through domain/time/obstacle-aware examples.  
- Lower cognitive load with expandable examples and capped guiding questions.  
- Faster revisions with pinpointed fixes.

## New Enhancements: Tone, Autonomy, Choice Architecture
- **Tone preference (user-set):** warm & encouraging / concise & direct / coachy & challenging. Apply to guidance and examples; keep assessment terse.
- **Autonomy controls:** quick-path toggle (fewer probes, more templates), “add another obstacle?” optional, “show more examples” expander, and “insert template” button for fast revisions.
- **Choice architecture to reduce overload:** use dropdowns/radios for cognitive level, time budget, obstacle type, and monitoring trigger; keep free text for the applied item only.
- **Chat history discipline:** only persist user context (goal, obstacle, IF–THEN, monitoring plan), last scores, last fix; do not echo long history—summarize state in chips at top of each phase.
- **Prompt-engineering refinements:** cap guiding questions at 3; keep feedback ≤15 words per criterion; always name the lowest criterion and give one concrete fix; default to example + template, with optional “more examples.”

## Choice Architecture Grounded in Learning Science
- **Cognitive Load Theory:** minimize extraneous load with pre-filled dropdowns/radios; keep a single applied free-text response per task.
- **Desirable Difficulties:** keep one applied item (self-test/spacing/self-explain) to require retrieval and generative processing, but remove redundant MCQs.
- **Self-Regulated Learning (SRL):** force explicit planning elements (goal, obstacle, IF–THEN; schedule, metric, trigger) to strengthen forethought and monitoring.
- **Implementation Intentions (MCII):** single IF–THEN with a concrete obstacle and dated action to boost goal enactment.
- **Spacing & Retrieval:** require at least one spaced revisit plan and one retrieval-based self-test in Phase 1.
- **Metacognitive Monitoring:** require a metric + trigger + alternative strategy to prompt adaptive regulation.
- **Autonomy-supportive design:** offer toggles (quick-path, add obstacle, show more examples) to support perceived control without overloading.

## UI Pain Points & Core Fixes
- **Visual overload / long scroll:** shorten hero/preamble; collapse research copy; keep form above the fold; compact phase list.
- **Weak personalization inputs:** add assignment/exam, time budget, obstacle type, tone/support style; show chips at phase headers.
- **Guided question friction:** limit to 3 prompts; add inline domain-matched example + “show more”; one applied response per construct.
- **Feedback opacity:** show which criterion was LOW; give one-tap template fix; keep feedback bullets ≤15 words.
- **Navigation clarity:** add “Resume” CTA if session exists; show “Next recommended phase” badge.

