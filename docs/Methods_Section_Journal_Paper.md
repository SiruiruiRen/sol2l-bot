# Methods Section: SoLBot Intervention

## Key Terms Glossary

**Contingency Planning (IF-THEN Plans):** Pre-planned responses to anticipated obstacles, formatted as "IF [obstacle occurs], THEN [specific action]." For example, "IF I struggle with understanding a concept after reading, THEN I will watch [specific tutorial] and practice [specific exercise] within [timeframe]." This technique, also called implementation intentions, has been shown to significantly increase goal achievement rates.

**Guiding Questions:** Sequential questions posed by the AI chatbot one at a time to scaffold student thinking. Rather than asking students to create a complete response immediately, the chatbot breaks complex tasks into manageable steps through a series of focused questions.

**Rubric-Based Assessment:** Evaluation of student responses using predefined criteria, each scored on a 0-2 scale where 0=missing key elements, 1=partial understanding, 2=comprehensive mastery. The overall score is determined by the lowest criterion score to ensure well-rounded competency.

**Adaptive Scaffolding:** Differentiated instructional support based on student performance. Students scoring 0 receive high scaffolding (templates and examples), those scoring 1 receive medium scaffolding (targeted suggestions), and those scoring 2 receive low scaffolding (validation and reflective questions).

---

## Journal Paper Methods Section (~150 words, detailed)

The SoLBot intervention is a six-phase web-based self-regulated learning (SRL) platform. Students progressed through: (1) SRL Framework introduction (video + knowledge check), (2) Learning Task Analysis (video + defining course-specific learning objectives), (3) Evidence-Based Learning Strategies training (video + application exercises on self-testing, spacing, self-explanation), (4) SMART Goal Setting (video + creating measurable goals with IF-THEN contingency plans for anticipated obstacles), (5) Progress Monitoring (video + designing systematic check-in systems and adaptation strategies), and (6) Learning Journey reflection. 

Following instructional videos in Phases 2, 4, and 5, an AI chatbot posed sequential guiding questions to help students develop their responses. The chatbot assessed student submissions using phase-specific rubrics with 3-4 criteria each scored 0-2 (0=missing key elements, 1=partial understanding, 2=comprehensive). Overall performance was determined by the lowest criterion score. Based on assessment, students received differentiated feedback: high-scaffolding templates and examples (score 0), targeted improvement suggestions (score 1), or validation with reflective questions (score 2). Students revised responses until achieving satisfactory performance before progressing.

---

## Extended Methods Section (for reference, ~400 words)

### Intervention Design

The SoLBot intervention is a web-based self-regulated learning (SRL) training platform implementing the Science of Learning to Learn curriculum. The intervention comprises six sequential learning phases, totaling 120-150 minutes of instructional time. Each phase follows a consistent structure: (1) instructional video introducing concepts, (2) interactive activities applying concepts, and (3) adaptive AI chatbot coaching (in select phases).

### Phase Structure & Student Tasks

**Phase 1 (SRL Framework, 15-20 min):** Students watched an instructional video (5-7 min) introducing the four-stage SRL cycle (task definition, goal setting, plan execution, progress monitoring) and completed multiple-choice knowledge-check assessments to verify comprehension.

**Phase 2 (Task Analysis, 20-25 min):** After watching an instructional video on learning objectives and cognitive levels, students interacted with an AI chatbot that posed sequential guiding questions: "What is a learning objective from your course?", "What cognitive level does it require (knowledge/comprehension/analysis)?", "What resources will you use?", "How will you use these resources strategically?". The chatbot assessed responses, provided criterion-specific feedback, and requested revisions until students demonstrated comprehensive understanding.

**Phase 3 (Learning Strategies, 20-25 min):** Students watched a video on evidence-based strategies (self-testing for retrieval practice, spacing effect for distributed learning, self-explanation for deep processing), applied each strategy to sample scenarios, and completed comprehension assessments.

**Phase 4 (Goal Setting, 25-30 min):** After video instruction on SMART goals and Mental Contrasting with Implementation Intentions (MCII), the AI chatbot guided students to: (a) articulate a specific, measurable learning goal, (b) create IF-THEN contingency plans (pre-planned responses to anticipated obstacles, e.g., "IF I struggle with understanding transformer attention mechanisms, THEN I will watch the Stanford CS224N lecture and implement the code step-by-step"), and (c) establish concrete success criteria. The chatbot evaluated goal specificity, measurability, and contingency plan feasibility.

**Phase 5 (Progress Monitoring, 25-30 min):** Following video instruction on metacognitive monitoring, the AI chatbot helped students design systematic progress-tracking systems with specific check-in schedules (e.g., "Every Friday, implement attention mechanism from scratch") and adaptation triggers (e.g., "If implementation fails, review original paper Section 3.2"). Students created concrete monitoring routines and backup strategies.

**Phase 6 (Summary & Reflection, 15-20 min):** Students reviewed their complete learning journey through a personalized dashboard displaying all created goals, contingency plans, and monitoring systems, receiving individualized feedback on their SRL development.

### AI Chatbot Functionality

**Interaction Sequence:** In Phases 2, 4, and 5, after students completed the instructional video, the AI chatbot initiated interaction by presenting a series of guiding questions one at a time. For example, in Phase 2, the chatbot first asked "What is a learning objective from your course?", waited for student response, then asked "What cognitive level does this require?", and so on. This sequential questioning scaffolded student thinking before they composed complete responses.

**Three-Stage Interaction Model:**
1. **Guiding Stage:** Chatbot posed 3-4 sequential questions with hints and examples to help students build comprehensive responses
2. **Confirming Stage:** Students reviewed their complete assembled response and confirmed readiness for assessment
3. **Chatting Stage:** After assessment, chatbot engaged in open dialogue to refine responses based on evaluation

**Rubric-Based Assessment Engine:** Once students submitted their complete response, the chatbot evaluated it using phase-specific rubrics with 3-4 criteria per phase. Each criterion was scored 0-2 points:
- **Score 0 (LOW):** Response lacks key elements or shows fundamental misunderstanding (e.g., learning objective is too vague, no cognitive level identified)
- **Score 1 (MEDIUM):** Response includes basic elements but lacks specificity or depth (e.g., identifies a learning objective but doesn't clearly specify resources or strategies)
- **Score 2 (HIGH):** Response demonstrates comprehensive understanding with specific, well-articulated elements (e.g., clear learning objective with appropriate cognitive level, specific resources, and strategic implementation plan)

**Overall Performance Determination:** The overall score was determined by the *minimum* criterion score. For example, if a student scored [2, 1, 2] across three criteria, their overall rating was MEDIUM (1). This conservative approach ensured students demonstrated competency across all aspects before progressing.

**Adaptive Scaffolding Based on Overall Score:**
- **Score 0 (HIGH Support):** Chatbot provided structured templates, concrete examples from the student's domain, and step-by-step procedures (e.g., "Let's use this template: 'My learning objective is to [specific action verb] [content] by [timeframe]'")
- **Score 1 (MEDIUM Support):** Chatbot offered targeted improvement suggestions, highlighting which specific criterion needed elaboration (e.g., "Your goal is clear, but let's add a specific timeline and measurable success indicator")
- **Score 2 (LOW Support):** Chatbot validated excellent work with brief encouragement and posed reflective questions for deeper thinking (e.g., "Excellent plan! How might you adapt this if your initial approach doesn't work?")

**Revision Cycle:** Students with scores 0-1 were prompted to revise their responses based on feedback. The chatbot re-assessed revised submissions, providing updated feedback until students achieved satisfactory performance (typically score 1 or higher, depending on phase requirements) before allowing progression to the next phase.

### Example Interaction Flow (Phase 4: Contingency Planning)

**Step 1 - Video Instruction:** Student watches 7-minute video explaining IF-THEN contingency plans (implementation intentions) for overcoming learning obstacles.

**Step 2 - Chatbot Guiding Questions (Sequential):**
- Q1: "What is your specific learning goal for this course?"
- Student: "Learn machine learning"
- Q2: "What obstacles might prevent you from achieving this goal?"
- Student: "Not enough time, hard concepts"
- Q3: "For your biggest obstacle, create an IF-THEN contingency plan"
- Student: "IF I don't have time, THEN I will study more"

**Step 3 - Chatbot Assessment:**
Evaluates response against rubric criteria:
- **Goal Specificity** [Score: 0] - Too vague ("learn machine learning")
- **Obstacle Identification** [Score: 1] - Identified obstacles but not specific
- **Contingency Plan Quality** [Score: 0] - No concrete action ("study more" is vague)
- **Overall: Score 0 (LOW)** - Determined by minimum criterion score

**Step 4 - Adaptive Feedback (High Scaffolding for Score 0):**
"Let me help you create a more specific contingency plan! 

**Template for a strong contingency plan:**
- IF [specific obstacle happens], THEN [specific action with timeline]

**Example:** 'IF I struggle with understanding transformer attention mechanisms after reading the paper, THEN I will watch the Stanford CS224N lecture (Lecture 9) and implement the code step-by-step following the Annotated Transformer tutorial within 2 days.'

Notice how this includes:
✓ Specific concept (transformer attention)
✓ Clear trigger condition (struggle after reading)
✓ Concrete action (watch specific lecture, implement code)
✓ Timeline (within 2 days)

**Your turn:** Revise your contingency plan using this structure."

**Step 5 - Student Revision:**
"IF I struggle with understanding backpropagation in neural networks after reading Chapter 5, THEN I will watch 3Blue1Brown's neural network series (videos 3-4) and work through the calculus examples by hand within 3 days."

**Step 6 - Re-assessment:**
- **Goal Specificity** [Score: 2] - Specific concept (backpropagation in neural networks)
- **Obstacle Identification** [Score: 2] - Clear trigger (struggle after reading)
- **Contingency Plan Quality** [Score: 2] - Concrete, actionable, with timeline
- **Overall: Score 2 (HIGH)**

**Step 7 - Validation Feedback:**
"Excellent contingency plan! You've created a specific, actionable response to a potential obstacle. You may continue to Phase 5."

### Data Collection

Comprehensive analytics tracked user interactions, chat session quality, assessment scores, revision attempts, time-on-task, and progression patterns for learning science research and system optimization.

---

## Visual Summary: Intervention Flow

### Overall Phase Sequence
```
Phase 1: SRL Framework → Phase 2: Task Analysis → Phase 3: Learning Strategies → 
Phase 4: Goal Setting → Phase 5: Progress Monitoring → Phase 6: Summary
```

### Chatbot Interaction Phases (2, 4, 5) Follow This Pattern:

```
1. INSTRUCTIONAL VIDEO (5-7 minutes)
   ↓
2. GUIDING QUESTIONS (Sequential, one at a time)
   Student answers → Chatbot asks next question → ... → Complete response assembled
   ↓
3. RUBRIC ASSESSMENT (Automated evaluation)
   Criterion 1: Score 0/1/2
   Criterion 2: Score 0/1/2
   Criterion 3: Score 0/1/2
   Overall Score = Minimum criterion score
   ↓
4. ADAPTIVE FEEDBACK (Based on overall score)
   ├─ Score 0 → HIGH Scaffolding (templates + examples)
   ├─ Score 1 → MEDIUM Scaffolding (targeted suggestions)
   └─ Score 2 → LOW Scaffolding (validation + reflection questions)
   ↓
5. REVISION CYCLE (If score 0-1)
   Student revises → Re-assessment → Updated feedback → ...
   ↓
6. PROGRESSION (When satisfactory performance achieved)
   Advance to next phase
```

### Example Scoring Logic:
```
Student Response on Goal Setting:
- Goal Specificity: 2 (excellent)
- Measurability: 1 (partial)
- Contingency Plan: 2 (excellent)

Overall Score = 1 (minimum) → MEDIUM Scaffolding
Feedback focuses on improving measurability criterion
```

---

## Key Research Design Elements

### Evidence-Based Foundation
- **Original SoL Intervention:** Proven to improve exam performance and learning efficiency
- **Adaptive Design:** Personalized support based on individual student performance
- **Comprehensive Tracking:** All interactions logged for research analysis

### Assessment Framework
**Rubric Structure:**
- Multiple criteria per learning activity
- 0-2 point scale per criterion (LOW, MEDIUM, HIGH)
- Conservative assessment: Overall score = minimum criterion score
- Ensures comprehensive understanding before progression

**Example Rubric - Phase 2 Learning Objectives:**
- **Task Identification** (0-2 pts): Clarity of learning content and cognitive level
- **Resource Specificity** (0-2 pts): Concrete resources with strategic utilization plan
- **Action Planning** (0-2 pts): Specific implementation strategies

### Chatbot Interaction Design

**Interaction Phases:**

1. **Guiding Phase:**
   - Sequential questions with increasing complexity
   - Built-in hints and scaffolding prompts
   - Domain-specific examples (e.g., machine learning, biology)

2. **Confirming Phase:**
   - Review complete response
   - Request confirmation or revision
   - Highlight missing elements

3. **Chatting Phase:**
   - Open dialogue for refinement
   - Deeper exploration of concepts
   - Personalized coaching questions

**Sample Interaction Flow:**
```
Student submits initial response → 
Rubric assessment (scores per criterion) → 
Overall performance level determination → 
Scaffolding level selection → 
Personalized feedback generation → 
Next steps or revision request
```

### Personalization Mechanisms

**Layer 1 - Scaffolding Adaptation:**
- Performance-driven support intensity
- Dynamic adjustment based on improvement

**Layer 2 - Criterion-Specific Feedback:**
- Individual strengths and weaknesses addressed
- Targeted guidance per rubric element

**Layer 3 - Phase-Specific Coaching:**
- Domain-relevant examples
- Context-appropriate questioning
- Learning progression alignment

---

## Research Advantages

### Scalability
- Web-based delivery eliminates logistical constraints
- Automated assessment reduces instructor workload
- Consistent intervention across participants

### Data Richness
- Granular interaction logs for qualitative analysis
- Performance metrics for learning trajectory modeling
- Revision patterns reveal learning processes

### Adaptive Precision
- Real-time scaffolding adjustments
- Evidence-based support determination
- Personalized learning paths

### Replicability
- Documented rubric criteria and scoring
- Standardized interaction protocols
- Open research design specifications

---

## Comparison: Traditional vs. Adaptive SoL Intervention

| Feature | Traditional SoL | SoLBot Adaptive |
|---------|----------------|-----------------|
| **Duration** | 90 minutes fixed | 120-150 min (varies by performance) |
| **Delivery** | Instructor-led or static Qualtrics | Web-based AI-adaptive platform |
| **Feedback** | Generic predetermined responses | Personalized rubric-based coaching |
| **Support** | One-size-fits-all | Three-level adaptive scaffolding |
| **Assessment** | Self-assessment or manual grading | Automated criterion-based evaluation |
| **Adaptation** | Branching based on single score | Multi-criterion continuous adaptation |
| **Data Collection** | Survey responses only | Comprehensive behavioral analytics |
| **Scalability** | Limited by instructor availability | Unlimited concurrent users |

---

## Technical Implementation Notes

### Platform Architecture
- **Frontend:** Next.js/React for responsive interface
- **Backend:** Node.js API + Python services for AI processing
- **Database:** PostgreSQL (Supabase) for analytics
- **AI Integration:** Custom prompt engineering with context management

### Interaction Components
- **Video Players:** Tracking completion and engagement
- **Guided Forms:** Structured input with validation
- **Chat Interface:** Real-time AI conversation with markdown formatting
- **Progress Tracking:** Visual indicators and phase navigation

### Quality Assurance
- Rubric validation through expert review
- Pilot testing for technical functionality
- Analytics monitoring for system performance
- Regular iteration based on user feedback

---

## Citation Format

**For journal papers:**

> Students completed a six-phase adaptive SRL intervention (120-150 minutes) delivered through the SoLBot web platform. The system employed AI chatbot coaching with rubric-based assessment (0-2 scale, multiple criteria) to provide three-level adaptive scaffolding (high, medium, low support) based on student performance. Comprehensive analytics tracked all interactions for learning science research.

**For methods papers:**

> The SoLBot intervention implements evidence-based self-regulated learning training through a six-phase web platform with adaptive AI coaching. Student responses were evaluated using phase-specific multi-criterion rubrics (0-2 points per criterion), with overall performance determined by minimum criterion score. The chatbot provided differentiated support: structured templates for low performance, targeted suggestions for medium performance, and reflective questions for high mastery. All interactions were logged for research analysis.

---

## Supplementary Materials Suggestions

For comprehensive methods reporting, include:

1. **Rubric Specifications:** Complete rubrics for each phase with scoring guidelines
2. **Interaction Flowcharts:** Visual representation of chatbot decision logic
3. **Sample Dialogues:** Representative conversations at each scaffolding level
4. **Analytics Schema:** Database structure and tracked variables
5. **Prompt Engineering:** AI system prompts and personalization logic

---

**Document Purpose:** This document provides the core methods description for academic papers investigating the SoLBot intervention, with expanded sections for methods-focused publications.

**Last Updated:** November 2024  
**Repository:** https://github.com/SiruiruiRen/learning-bot

