# Form Contents Reference

## Sections

Sections are the top-level containers in a form's contents. All questions must belong to a
section. Sections determine the order of content displayed to users.

There are two section types:
- **Standard:** Displays text and contains questions.
- **Person Information:** Additionally shows a widget with University of Illinois person data
  (student, HR info, etc.) for the response submitter, last modifier, or a Campus Person
  question answer.

Section fields: Section Name, Section Type, Text Format (Markdown or PlainText), Text
(introductory text shown at top), and for Person Information sections: Select Person and
Select Default Tab.

To add a section: Form Contents page > select a phase in Global Settings > click "Add Section"
in Form Contents panel. To edit: select the section in Form Preview panel > click Edit.

## Questions

Questions are data fields within sections. Every question has these core fields:

- **Question Text:** The label/title displayed to users.
- **Field Name:** Internal identifier (auto-generated from Question Text, but customizable).
  Use snake_case for clarity.
- **Additional Instructions:** Optional helper text below the question (Markdown or PlainText).
- **Is Required:** Whether the question must be answered before submission.
- **Is Active:** Whether the question appears in the form. Set to inactive to archive.
- **Type:** Determines the question's behavior and available sub-settings.

### Question Types

**Text types:**
- **Single Line Text** — Short text. Optional: Default Value, pattern matching (phone, zip,
  email, URL), or regex matching.
- **Multi-line Text** — Long text. Optional: max word count, default value, regex.

**Selection types:**
- **Drop Down** — Single selection from predefined list. Each option has Choice Display Text
  and Answer Value. Optional "Allow Other" for custom entry.
- **Radio Buttons** — Same as dropdown but displayed as radio buttons.
- **Check Boxes** — Multiple selection from predefined list. Each option has Choice Display
  Text and Answer Value. Optional "Allow Other."
- **Select List** — Multiple selection from interactive text list.

**Data types:**
- **Date / Time** — Date picker. Sub-types: Date, Time, Date and Time. Optional: min/max.
- **Number** — Numeric input. Sub-types: Decimal, Whole Number. Optional: min/max.
- **Single Checkbox (true/false)** — Boolean checkbox.
- **File Upload** — File upload with optional max size and type restriction (Image, Document).

**Special types:**
- **Campus Person (NetId or UIN)** — Matches against U of I directories.
- **Course CRN** — Matches against campus course database.
- **Time Stamp** — Auto-records submission time (read-only).
- **User Stamp** — Auto-records last modifier info (read-only).
- **Signature** — Digital signature checkbox that records timestamp and user info.
- **Multiple Questions** — Composite question displayed as a table with sub-questions as
  columns. Users add rows.
- **Person Attribute** — Displays a person attribute (read-only).

**Event Registration only:**
- **Event Session** — Lets users select event sessions from a category. Set the Session
  Category to link to the appropriate sessions. Displays as checkboxes (if category allows
  multiple selection) or radio buttons (single selection).
- **Guest** — Number of guests plus optional detail sub-questions.

## Question Triggers

Question triggers allow one question's visibility, required state, or value to change based
on another question's answer. Both questions must be in the same section.

To set up: Edit a question > scroll to bottom > check "This question is triggered by another
question's value." Configure:

1. **Trigger Question:** Select the source question (must be in same section).
2. **Match Type:**
   - *Defined choice match* — Select from the trigger question's predefined choices
     (only for multi-choice question types).
   - *Exact value match* — Enter a specific value to match.
   - *Regular expression match* — Enter a regex pattern.
   - *Has value* — Trigger when the question has any value or is empty.
3. **Trigger Actions** (can set multiple):
   - *Set Question Visibility:* visible (hidden by default, shows on match) or hidden
     (visible by default, hides on match).
   - *Set Required:* required or not required.
   - *Set Question Value:* an explicit value, the value of another question, or clear value.

**Common pattern for event registration:** A Check Boxes question lists available camps/events.
Each Event Session question is triggered by this checkbox question using "defined choice match"
to show/hide based on which checkbox is selected. Trigger actions: Set Visibility to visible,
Set Required to not required.