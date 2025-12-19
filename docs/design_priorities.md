# SoLBot Design Iteration Priorities

## Purpose
This document outlines prioritized design iterations for the Science of Learning to Learn Bot intervention, with theoretical rationale and empirical basis. For mentor discussion.

---

## Gap Analysis: Original Qualtrics vs. Current Chatbot

### Original Intervention Structure (90 min, 3 modules)
| Module | Topics | Key Pedagogical Elements |
|--------|--------|-------------------------|
| **1: Learning Strategies** | Self-testing, Spacing, Self-explanation | Pre-tests → Adaptive video → Practice → Compare to sample → Reflection |
| **2: SRL Framework** | 4-stage model, Learning objectives, Resources, Goals, Monitoring | Scenario-based questions, Open-ended application, Course resource identification |
| **3: Achieve Goals (MCII)** | Mental Contrasting, Implementation Intentions, Study Environment, Exam Preparation | Single integrated MCII flow, Pomodoro/distraction management, Grade expectations |

### Current Chatbot Implementation (60 min, 5 phases)
| Phase | Topics | Current Elements |
|-------|--------|-----------------|
| **1: What's SRL** | SRL overview | Video + quiz |
| **2: Understand Tasks** | Task definition, Learning objectives | Video + cognitive levels content + quiz + chat |
| **3: Learning Strategies** | Self-explanation, Spacing | Strategy guides + video + quiz + chat |
| **4: Achieve Goals** | MCII (3 separate tasks) | Video + Long-term goals + Short-term goals + Contingency strategies |
| **5: Monitoring** | Monitoring & adaptation | Video + quiz + chat |

### Key Gaps Identified
1. **Self-testing strategy** not explicitly taught (original Module 1.1)
2. **Compare-to-sample-answer workflow** absent (important for self-assessment calibration)
3. **Study environment / Pomodoro** section missing (original Module 3.2 Part II)
4. **Looking ahead to exam** reflection missing
5. **Resource identification** prompts (LMS, textbook, etc.) less structured
6. **Reflection after each strategy** less explicit
7. **Adaptive pre-testing** not implemented (original skips content if student already knows it)

---

## Priority 1: Core Intervention Integrity (HIGH IMPACT)

### 1.1 Combine Phase 4 Goal Tasks into Single MCII Flow
**Current**: 3 separate subpages (long-term goals → short-term goals → contingency strategies)
**Proposed**: Single integrated Mental Contrasting with Implementation Intentions (MCII) flow

| Step | Content | Rationale |
|------|---------|-----------|
| 1. Pick a goal | Student selects a learning goal | Anchors the entire exercise |
| 2. Indulge | Imagine achieving it vividly | Motivation activation |
| 3. Dwell | Identify obstacles | Reality check, prevents fantasy-only thinking |
| 4. Implementation Intention | If [obstacle], then [action] | Automaticity for goal pursuit |

**Theory**: Oettingen's MCII research shows the combination of mental contrasting + implementation intentions outperforms either alone (Oettingen & Gollwitzer, 2010). Current 3-task structure fragments this integrated process.

**Recommendation**: ⭐ **HIGH PRIORITY** - Restructure Phase 4 into single MCII flow with chatbot scaffolding.

---

### 1.2 Add Explicit Self-Testing Strategy Section
**Current Gap**: Self-testing is mentioned but not explicitly taught as Module 1.1 does in original
**Proposed**: Add brief self-testing content before or within Phase 3

**Theory**: Testing effect / retrieval practice is one of the most robust findings in learning science (Roediger & Karpicke, 2006). Students often don't know this.

**Content to add**:
- Susan & David scenario (quick)
- Key insight: Self-testing > rereading for long-term retention
- Application prompt: "How could you use self-testing for [target course]?"

**Recommendation**: ⭐ **HIGH PRIORITY** - Add 3-5 min section on self-testing.

---

### 1.3 Add Structured Reflection Prompts
**Current Gap**: Chat enables reflection but doesn't require it
**Proposed**: Add explicit reflection prompts after each major section

**Example prompts** (from original):
- "In a couple of sentences, explain one way you can use [strategy] to help you study this semester."
- "Think of a recent time when monitoring your learning could have helped you. What could you have done differently?"

**Theory**: Reflection is a core metacognitive process in SRL (Zimmerman, 2002). Explicit prompts increase engagement with reflection vs. open-ended chat.

**Implementation options**:
1. Required text box before proceeding
2. Chat prompt that waits for substantive response
3. Optional "Reflection moment" card

**Recommendation**: ⭐ **HIGH PRIORITY** - Add 1-2 structured reflection prompts per phase.

---

## Priority 2: Personalization & Autonomy (MEDIUM IMPACT)

### 2.1 What Personalization is Needed?

| Type | Current | Recommended | Rationale |
|------|---------|-------------|-----------|
| **Name** | ✅ Collected | Keep | Basic personalization |
| **Target course** | ✅ Optional | Keep optional | Anchors planning, but strategies are transferable |
| **Coach tone** | ✅ Warm/Balanced/Direct | Keep | Autonomy support, individual preference |
| **Detail level** | ❌ Not collected | Add as "Headlines vs. Step-by-step" | Controls information density |
| **Prior SRL exposure** | ❌ Not collected | Optional: Qualtrics pre-survey | Moderator variable for research |

### 2.2 Should We Measure Individual Differences?

**Variables to consider measuring**:
| Variable | Measure | Where | Purpose |
|----------|---------|-------|---------|
| Self-efficacy | Brief scale (3-5 items) | Pre-survey (Qualtrics) | Moderator |
| Motivation | Brief scale | Pre-survey | Moderator |
| Metacognitive awareness | Brief MAI subset | Pre-survey | Moderator/mediator |
| Prior SRL exposure | Single item | Intro page OR pre-survey | Baseline |

**Recommendation**: ⭐ **MEDIUM PRIORITY** - Collect in **separate Qualtrics pre-survey** to keep intervention lean. Don't add scales to intro page.

---

### 2.3 Detail Level Implementation: Side Chatbot vs. Buttons

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **Side panel chatbot** | Flexible, students can ask anything | High dev effort, visual complexity, off-topic risk, harder to analyze for research | ❌ Not recommended for 60-min intervention |
| **"More details" / "See example" buttons** | Low cognitive load, research-controlled, easy analytics | Less flexible | ✅ Recommended |
| **Hybrid**: Buttons in content, chat available for follow-ups | Best of both | Moderate complexity | ✅ Good compromise |

**Recommendation**: Use simple progressive-disclosure buttons. Chat already exists in some phases for deeper discussion.

---

## Priority 3: Knowledge Check Simplification (MEDIUM IMPACT)

### 3.1 Original vs. Current Approach

| Aspect | Original | Current |
|--------|----------|---------|
| Question volume | 2-3 questions per topic | 1-2 per phase |
| Adaptive skipping | Yes (if 2/2 correct, skip video) | No |
| Scenario richness | Extensive (4-option scenarios) | Moderate |
| Open-ended | Frequent | Minimal (chat instead) |

### 3.2 Recommendations

**Keep current approach** with these additions:
1. Add **one scenario-based question per phase** (like Susan/David, Ana/Brad/Cora) - these are pedagogically valuable
2. Use **chat for open-ended application** rather than text boxes (already doing this)
3. **Don't implement adaptive skipping** for 60-min version - adds complexity, and most students likely don't already know this material

---

## Priority 4: Missing Content Modules (LOW-MEDIUM IMPACT)

### 4.1 Study Environment / Pomodoro Section
**Original content**: Module 3.2 Part II covers:
- Ideal study environment (minimize distractions)
- Pomodoro technique (25 min focus + 5 min break)
- Implementation intentions for distractions

**Options**:
1. Add as Phase 5.5 before summary (extends time)
2. Integrate into Phase 4 contingency strategies (fits naturally)
3. Make optional "bonus" content post-completion

**Recommendation**: ⭐ **MEDIUM PRIORITY** - Integrate briefly into Phase 4/5 or make optional.

### 4.2 "Looking Ahead to Exam" Section
**Original content**:
- What grade are you aiming for?
- How well have you prepared?
- What will you do to prepare?

**This is essentially a forward reflection**. Could be integrated into Summary page.

**Recommendation**: ⭐ **LOW PRIORITY** - Add 2-3 questions to Summary page.

---

## Priority 5: Chatbot Interaction Design (MEDIUM IMPACT)

### 5.1 Should Chatbot Be Available on Every Page for "More Details"?

**Current**: Chat available in Phase 2 chat, Phase 3, Phase 5 chat
**Options**:
1. **Persistent side panel** - always visible (like Perplexity)
2. **Collapsible helper** - icon that expands to chat
3. **Per-section chat** - chat at end of each section (current approach)

**Recommendation**: Keep current per-section chat. A persistent side panel adds cognitive load and may distract from the structured flow. Students can ask follow-ups in existing chat sections.

### 5.2 Chatbot Scaffolding Improvements

**Add these features to existing chats**:
1. **"Ask for more details" quick button** - pre-fills a request for elaboration
2. **"Show me an example" quick button** - requests a concrete example
3. **Response length control** - based on detail level preference selected in intro

---

## Priority 6: Research Analytics (HIGH for Research)

### 6.1 Current Analytics
- Session tracking
- Event logging (video watches, quiz submissions, chat interactions)
- Phase completion

### 6.2 Recommended Additions
| Metric | Purpose | Implementation |
|--------|---------|----------------|
| Time per section | Engagement depth | Log timestamps on section transitions |
| Chat turn count per phase | Interaction intensity | Count messages |
| Reflection quality scores | AI-rated substantiveness | Use rubric in chat prompts |
| Button clicks ("More details") | Information-seeking behavior | Log events |
| Pre-post knowledge gain | Intervention efficacy | Pre-survey + Phase 5 quiz |

---

## Summary: Prioritized Implementation Order

| Priority | Change | Effort | Impact | Theory Basis |
|----------|--------|--------|--------|--------------|
| **P0** | Combine Phase 4 into single MCII flow | Medium | High | Oettingen & Gollwitzer MCII research |
| **P1** | Add self-testing strategy section | Low | High | Testing effect (Roediger & Karpicke) |
| **P1** | Add structured reflection prompts | Low | High | Metacognition in SRL (Zimmerman) |
| **P2** | Add detail level preference | Low | Medium | Autonomy support (SDT) |
| **P2** | Add "More details" / "See example" buttons | Medium | Medium | Progressive disclosure, learner control |
| **P3** | Move individual difference measures to pre-survey | Low | Medium | Clean research design |
| **P3** | Add one scenario question per phase | Low | Medium | Situated learning, transfer |
| **P4** | Integrate study environment content | Medium | Low-Med | Distraction management literature |
| **P4** | Add "Looking ahead" to Summary | Low | Low | Forward reflection |

---

## Questions for Mentor Discussion

1. **MCII consolidation**: Confirm that combining Phase 4 tasks is desirable. Does the current 3-task structure serve any research purpose (e.g., measuring goal decomposition separately)?

2. **Adaptive vs. fixed path**: Original uses pre-tests to skip known content. Is this worth implementing for research, or does a fixed path provide cleaner comparison?

3. **Reflection depth**: How much reflection is enough? Original has extensive compare-to-sample-answer cycles. Current relies on chat. What balance is right for 60 minutes?

4. **Individual differences**: Confirm pre-survey strategy. Any specific scales preferred for moderator analysis?

5. **Chat availability**: Is persistent side-panel chat desirable for "more details," or does per-section chat suffice?

6. **Study environment content**: Include in main flow or optional? Time constraint consideration.

---

*Document created: December 2024*
*For: Mentor discussion on SoLBot design iterations*

