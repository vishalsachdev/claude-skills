# Event Sessions Reference

## Event Session Categories

Categories are form-level (shared across all periods). They organize event sessions into
logical groups. Each category has a Title and a setting for whether multiple sessions can be
selected (checkboxes) or only one (radio buttons).

Navigate to: Form dashboard > "Event Session Categories" under Data Collection and Form
Lifecycle. Or URL: `.../Form/{formId}/EventSessionCategories`

A form must have at least one category before sessions can be created.

## Event Sessions

Sessions are period-level (unique to each period). They represent the actual events users
register for.

Navigate to: Form dashboard > Periods > click "Edit Sessions" next to the desired period.
Or URL: `.../Form/{formId}/Periods/EventSessions?periodId={periodId}`

Each session belongs to a category and has these fields:
- **Title:** Displayed to users (e.g., "Mon Jun 1 – Fri Jun 5 | 1:00 PM – 4:00 PM | Ages 10-17")
- **Field Name:** Internal identifier (e.g., ADV3D_JUN1). Matching field names across periods
  links sessions for routing triggers and phase permissions.
- **Description:** Optional, displays below title.
- **Archived:** Hides session from selection without deleting.
- **Maximum Registrants:** Per-session registration cap (independent from period max).
- **Registration Start/End Date:** When this specific session opens/closes for registration.
- **Price:** Dollar amount for the session (used by payment line items).

## Linking Sessions to Forms

The typical pattern for event registration with sessions:

1. Create **Event Session Categories** at the form level (e.g., "Minecraft", "AI Robotics").
2. Create **Event Sessions** within each category at the period level, with titles, prices,
   max registrants, and dates.
3. In form contents, create an **Event Session question** (Type: Event Session) for each
   category. Set its Session Category to the matching category.
4. Use **question triggers** to show/hide each Event Session question based on a parent
   selection question (e.g., a Check Boxes question listing all available camps).
5. Create a **payment line item** for each Event Session question, using "the value of a
   question in dollars" type with the session question as the source. Session prices
   auto-populate from the event sessions.

## Important Notes

- If no sessions exist in a category for the current period, the Event Session question
  will show no options.
- Session prices set on event sessions are what populate the payment line item pricing.
- Event Session Categories define the structure; Event Sessions define the actual offerings
  per period. When starting a new period, sessions must be recreated (they don't carry over).

## Complete Walkthrough: Simple Event Registration Form with Payment

This walkthrough creates a basic event registration form for a single workshop with payment.
Use this as a template for simple event registrations.

### Example Scenario
- Workshop: "Demo Workshop"
- Price: $100
- Capacity: 20 registrants
- Date: Tomorrow
- Collect: Name and Email

### Step-by-Step Process

#### 1. Create Event Session Category
Navigate to: `.../Form/{formId}/EventSessionCategories`

1. Click "Add New Event Session Category"
2. Enter Category Name: "Workshop Sessions"
3. Leave "Allow multiple session selection" unchecked (for single workshop)
4. Click "Save"

#### 2. Create Event Session in Default Period
Navigate to: `.../Form/{formId}/Periods`

1. Click "Edit Sessions" next to "Default Period"
2. Click "Add New Session"
3. Fill in session details:
   - **Title**: "Demo Workshop"
   - **Field Name**: (optional, can be auto-generated)
   - **Maximum Registrants**: 20
   - **Registration End Date**: Use JavaScript for datetime fields:
     ```javascript
     const dateInputs = document.querySelectorAll('input[type="datetime-local"]');
     dateInputs[0].value = '2026-02-14T12:00';  // Start
     dateInputs[1].value = '2026-02-15T23:59';  // End
     dateInputs.forEach(input => input.dispatchEvent(new Event('change', {bubbles: true})));
     ```
4. Click "Save"

#### 3. Set Up Payment Line Item
Navigate to: `.../Form/{formId}/Contents/PaymentInformation`

1. Click "Add New Payment Line Item"
2. Fill in:
   - **Name**: "Workshop Registration Fee"
   - **Type**: "flat fee" (keep default)
   - **Amount**: 100
3. Click "Save"

#### 4. Create Registration Section
Navigate to: `.../Form/{formId}/Contents`

1. Click "Add Section"
2. Fill in:
   - **Section Name**: "Registration Information"
   - **Section Type**: Keep as "Standard"
3. Scroll down and click "Save Changes"

#### 5. Add Name Question
With the "Registration Information" section selected:

1. Click "Add Question"
2. Fill in:
   - **Question Text**: "Full Name"
   - **Field Name**: "full_name"
   - Check **Is Required**
   - **Type**: Keep as "Single Line Text"
3. Click "Save Changes"

#### 6. Add Email Question
With the "Registration Information" section still selected:

1. Click "Add Question" again
2. Fill in:
   - **Question Text**: "Email Address"
   - **Field Name**: "email"
   - Check **Is Required**
   - **Type**: Keep as "Single Line Text"
3. Optionally add email validation pattern
4. Click "Save Changes"

#### 7. Add Event Session Question (Link Registration to Workshop)
With the "Registration Information" section still selected:

1. Click "Add Question"
2. Fill in:
   - **Question Text**: "Select Workshop"
   - **Field Name**: "workshop_session"
   - Check **Is Required**
   - **Type**: Select "Event Session"
   - **Session Category**: Select "Workshop Sessions"
3. Click "Save Changes"

This Event Session question will display "Demo Workshop" as an option, and selecting it
will register the user for that session.

#### 8. Verify Form
1. Click "Full Preview" to see the complete form
2. Verify all questions appear correctly
3. Check that payment amount shows $100
4. Test the form if in Test Mode

### What Users Will See
1. Registration Information section with Name and Email fields
2. Workshop selection showing "Demo Workshop"
3. Payment summary showing $100.00
4. Submit button to complete registration

### Common Variations

**Multiple Workshops**:
- Create multiple Event Sessions in Step 2
- The Event Session question will show all available workshops as options

**Early Bird Pricing**:
- Create two payment line items (regular and early bird)
- Use question triggers or routing triggers to apply the appropriate price based on registration date

**Guest Registration**:
- Change question Type to "Guest" to allow registering additional attendees
- Payment will multiply by number of guests

**Collect Additional Info**:
- Add more questions to the Registration Information section (phone, dietary restrictions, etc.)
- Use different question types as needed (dropdown, checkboxes, etc.)