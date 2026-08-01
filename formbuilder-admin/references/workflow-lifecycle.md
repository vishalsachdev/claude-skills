# Workflow and Lifecycle Reference

## Phases

Phases are the steps in a form's workflow. Three types:
- **Data Collection** (one per form): Where users fill out the form.
- **Review Approval** (multiple allowed): Where admins review, approve, or take action.
- **Archive** (one per form): Final resting place for completed responses.

Navigate to: Form dashboard > "Phases" under Data Collection and Form Lifecycle.
Or URL: `.../Form/{formId}/Phases`

Each phase has a title, type, and **phase permissions** that control which sections are
visible and who can view/edit them.

To add: Click "+ Add Phase." To edit: Click gear icon > "Edit Phase/Permissions."

## Routing Triggers

Routing triggers automate actions when conditions are met. They connect phases and drive
the workflow.

Navigate to: Form dashboard > "Routing Triggers" under Data Collection and Form Lifecycle.
Or URL: `.../Form/{formId}/RoutingTriggers`

### Trigger Properties
- **Trigger Name:** Display name.
- **Active Status:** Whether the trigger runs. Uncheck to disable without deleting.
- **Number of triggers per period / per form response:** Limits on execution count.
- **Stop Further Evaluation:** If checked, prevents other triggers from firing simultaneously.
- **Trigger Evaluation Time:**
  - "Each time the form response is saved" (most common)
  - "After the form response has matched the trigger condition for a given length of time"
    (timed trigger)
  - "At a specific date and time" (scheduled trigger)

### Trigger Conditions (Conditional Statements)

Conditions determine WHEN a trigger fires. Available condition types:

- **Answer Value:** Checks a question's answer. Match types: Defined Choice Match, Exact
  Value Match, Regular Expression Match, Has Value.
- **Text Merge Field:** Checks a text merge field value. Same match types except no Defined
  Choice Match.
- **Form Submit Date:** Based on when the response was submitted.
- **Form Submit State:** Whether the response has been submitted at least once or not.
- **Response Saved for Later:** Whether "Save and Return Later" was used.
- **Form Cancelled/Waitlisted/Registered State:** Registration status checks.
- **Latest Reservation Attempt:** Success/failure of last registration attempt (Advanced
  Mode only).
- **Payment Promised/Status/Method:** Payment state checks.
- **Group Membership:** Whether a user belongs to a security group.
- **Current Date:** Date range check.
- **Current Phase:** Checks the response's current phase.
- **Associated Period:** Checks which period the response belongs to.

**Logical operators** for combining conditions: **And** (all must be true), **Or** (any must
be true), **Not** (negation). These allow building complex conditional statements.

### Routing Actions

Actions determine WHAT happens when the trigger fires. Types:

- **Change Phase:** Move the response to a different phase. Select target phase from dropdown.
- **Send Email:** Send a custom email with text merge support. Configure recipients, CC,
  subject, body. Can attach files and PDF reports.
- **Set Question Value:** Set a question's value to an explicit value, another question's
  value, or clear it.
- **Fire Webhook:** Call an external web service.
- **Perform Registration Action** (Advanced Mode only): Hold slot, attempt registration,
  force hold, force register, or cancel registration.

A single trigger can have multiple routing actions of different types.

## Critical Safety Rules

- **Edit trigger conditions/actions BEFORE deleting phases.** If a trigger references Phase X
  in its condition (e.g., "Current Phase = Phase X") or action (e.g., "Change Phase to X"),
  deleting Phase X first creates a broken reference. Always update the trigger to remove the
  reference, then delete the phase.
- **Deactivate before deleting** when unsure. Uncheck "Active Status" on a trigger to disable
  it without removing it, so you can verify the form still works correctly before permanent
  deletion.