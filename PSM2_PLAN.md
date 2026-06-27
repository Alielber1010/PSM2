# PSM2 Report — Work Plan

> **Rule:** The report (SRS / SDD / STD) is the source of truth.  
> The code confirms the system was built — it is NOT used to rewrite the docs.

---

## Status Overview

| Item | Task | Status |
|------|------|--------|
| Chapter 1 | Introduction | ✅ Done |
| Chapter 2 | Literature Review | ✅ Done |
| Chapter 3 | System Development Methodology | ✅ Done |
| Chapter 4 | Requirement Analysis & Design | ✅ Done (minor polish only) |
| **Chapter 5** | **Implementation** | ❌ New — needs to be written |
| **Chapter 6** | **Conclusion** (was Ch. 5) | ❌ Renumber + minor PSM2 updates |
| Appendix B | SRS | ⚠️ Minor polish |
| Appendix C | SDD | ⚠️ Minor polish |
| Appendix D | STD | ⚠️ Minor polish |
| **UAT Doc** | **Standalone HTML file** | ❌ New — needs to be generated |

---

## Step 1 — Chapter 5: Implementation (New)

This is the biggest new deliverable. Written entirely from the report's own SRS/SDD.  
No code auditing — the SDD modules and SRS requirements drive the narrative.

### 5.1 Introduction
Short paragraph: what was implemented, what this chapter covers, how it maps to Ch. 4 design.

### 5.2 Development Environment & Tools
Based on Section 3.4 (Technology Used) of the existing report.

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, React, TypeScript |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | NextAuth.js (JWT-based sessions) |
| Geolocation | Google Maps API |
| AI Integration | DeepSeek AI API |
| Real-time | Socket.io |

### 5.3 System Modules Implementation
One sub-section per module from SRS 4.2.1. Each sub-section follows this structure:
- What the module does (from SRS)
- How it was implemented (based on SDD composition/interaction viewpoints)
- Key screens (reference the screenshots already in the SDD / Appendix C)

#### 5.3.1 User Management Module
Covers: Registration, Login/Logout, Profile, RBAC (Player / Admin roles), JWT sessions.  
Maps to: UC01 (Register), UC02 (Edit Profile) in STD.

#### 5.3.2 Game Management Module
Covers: Create game, edit game, manage members, remove members, delete game, accept/reject join requests.  
Maps to: UC03–UC09 in STD.  
Note: SRS uses "Team Management" — report calls this "Games" in the STD. Use "Game" consistently since that is what the STD documents.

#### 5.3.3 Search & Matching Module
Covers: Location-based game search (GPS/Google Maps), advanced filters (sport, skill, age, gender, location), real-time results.  
Maps to: UC10 (Search Games), UC11 (View Game Info) in STD.

#### 5.3.4 AI Coach Module
Covers: DeepSeek API integration, personalized training tips, challenge-specific action plans, stored tips per user.  
Maps to: UC14 (Get AI Performance Tips) in STD.

#### 5.3.5 Administration Module
Covers: Admin panel, user moderation, game deletion, report review & resolution, notification to affected users.  
Maps to: UC15 (Delete Any Game), UC16 (View Reports) in STD.

#### 5.3.6 Notifications Module
Covers: In-app notification system, real-time delivery via Socket.io.  
Maps to: UC17 (View Notifications) in STD.

### 5.4 Database Implementation
Reference the ERD diagram from Section 4.4.  
Describe the key collections (Users, Games, JoinRequests, Reports, Notifications) and their relationships as defined in the SDD Information Viewpoint (data dictionary).

### 5.5 System Architecture Implementation
Reference the MVC diagram from Section 4.3.  
Briefly describe how Model / View / Controller layers were implemented.

### 5.6 User Interface Implementation
Reference the screen images from the SDD Interface Viewpoint and the existing UI Design section (5.0 in the appendix).  
Describe each major screen in one paragraph each:
- Login / Registration screens
- Dashboard
- Game creation & management screens
- Search & discover screen
- AI Coach screen
- Admin panel screens

### 5.7 Security Implementation
Based on SRS 4.2.2.2 (Security Requirements).  
Covers: JWT session handling, password hashing, role-based route protection, secure API communication.

### 5.8 Chapter Summary
One paragraph tying all modules together, stating the full system is operational and ready for testing.

---

## Step 2 — Chapter 6: Conclusion (Renumber from Ch. 5)

Minimal changes — renumber only, then update two specific sections:

| What to change | How |
|----------------|-----|
| Heading: CHAPTER 5 → CHAPTER 6 | Find-replace in HTML |
| Section numbers: 5.1 → 6.1, 5.2 → 6.2, 5.3 → 6.3 | Find-replace in HTML |
| 5.1 Introduction paragraph | Add 1 sentence: "The implementation phase, detailed in Chapter 5, confirmed that all objectives were met." |
| 5.2 Achievement of Project Objectives | Change "will" / "has planned" to past tense — "was delivered", "was implemented" |
| 5.2.3 Team Creation → Game Creation | Minor rename: "Team Creation" → "Game Creation and Location-Based Services" (aligns with STD terminology) |
| 5.3 Suggestions for Future Improvement | Keep as-is — already written for PSM2 |

---

## Step 3 — Appendix B (SRS) Polish

The SRS is already complete. Only fix these:

| Issue | Fix |
|-------|-----|
| Section 4.2.1.2 calls it "Team Management" | Add one sentence: "In the implemented system, teams are referred to as Games, consistent with the platform's user-facing terminology." |
| Future-tense language ("will provide", "shall support") | Change to "provides", "supports" — system is built |
| Requirements Prioritization table | Verify all High Priority items are marked as delivered |

---

## Step 4 — Appendix C (SDD) Polish

The SDD has 10 viewpoints and is largely complete. Only fix:

| Section | Fix |
|---------|-----|
| Composition Viewpoint — 4 modules listed | Keep as-is; they map correctly to implementation |
| Decision Tables (4.10) | Verify table headings are clear; no content changes needed |
| Any placeholder text or "TBD" notes | Remove or fill in |
| Image references | Confirm all figures have captions |

---

## Step 5 — Appendix D (STD) Polish

17 use cases (UC01–UC17) with test cases and EP/BVA tables are already written.  
Only fix:

| Issue | Fix |
|-------|-----|
| Numbering inconsistency (UC010 vs UC10) | Standardize: UC01–UC17 throughout |
| Table numbering in EP/BVA section | Fix to be consistent (Table 1.1, Table 2.1... not restarting at 3.x) |
| Any test cases referencing "Team" where STD says "Game" | Align to "Game" consistently |
| Pass/Fail column | Add empty Pass/Fail column header to each test case table (actual results to be filled during UAT) |

---

## Step 6 — Standalone UAT Document (HTML)

Separate HTML file: `GameOn_UAT.html`  
Built from the existing STD use cases — reformatted for formal sign-off.

### Structure

```
GameOn — User Acceptance Testing (UAT) Document

1. Document Information
   - Project: GameOn Sports Team Matching System
   - Version: 1.0
   - Date: [date]
   - Prepared by: [name]
   - Reviewed by: [supervisor name]

2. UAT Scope
   - System under test
   - In-scope modules (all 6 modules)
   - Out-of-scope

3. Testing Environment
   - Browser, OS, device specs
   - Test URL / deployment info

4. UAT Test Cases
   For each UC (UC01–UC17):
   - Use Case ID & Title
   - Pre-conditions
   - Test steps
   - Expected result
   - Actual result [blank — tester fills]
   - Pass / Fail [blank]
   - Tester signature / date [blank]

5. UAT Sign-Off
   - Overall result (Pass / Fail / Conditional)
   - Client/Supervisor sign-off table
   - Date of acceptance
```

---

## Execution Order

```
1. Chapter 5: Implementation   ← Biggest new content; do this first
2. Chapter 6: Renumber + polish Conclusion
3. Appendix D (STD): Minor fixes (needed before UAT doc)
4. UAT HTML document          ← Depends on STD being clean
5. Appendix B (SRS): Minor polish
6. Appendix C (SDD): Minor polish
```

---

## Files

| File | Purpose |
|------|---------|
| `PSM1Report_Full_.html` | Master report — all edits go here |
| `GameOn_UAT.html` | New standalone UAT document |
| `PSM2_PLAN.md` | This plan |
