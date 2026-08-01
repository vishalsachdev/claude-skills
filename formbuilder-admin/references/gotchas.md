# Known Gotchas and Troubleshooting

## Self-Registration "Not Allowed" Error

**Symptom:** Users see "Registration Not Allowed — Sorry, self-registration is not allowed
for this form" when trying to register a local account.

**Fix:** Navigate to the **Form Group** (not the Form) > **Local Users** page. Check
**"Allow users to register their own accounts."** This is a Form Group-level setting that
is easily overlooked because the Form-level Authentication tab shows Local Authentication
as enabled.

## Breadcrumb Navigation Failures

**Symptom:** Clicking breadcrumb links in the admin interface sometimes doesn't navigate.

**Fix:** Use direct URL navigation instead. Construct the URL by appending the desired
page path to the form's base URL (e.g., `.../Form/{formId}/Contents`).

## Payment Shows $0.00

**Symptom:** The payment page shows $0.00 total even though sessions have prices.

**Cause:** Payment line items are missing for some or all session questions. Each Event
Session question that should generate a charge needs its own payment line item configured
under Payment Information.

**Fix:** Go to Form Contents > Payment Information. Add a payment line item for each
Event Session question, using type "the value of a question in dollars" and selecting
the appropriate session question as the source.

## Event Session Question Shows No Options

**Symptom:** An Event Session question appears blank with no sessions to select.

**Cause:** Either no event sessions exist in the linked category for the current period,
or the Session Category on the question doesn't match the intended category.

**Fix:** Verify sessions exist: Periods > Edit Sessions for the current period. Check
that the Event Session question's Session Category matches the category containing the
desired sessions.

## Deleting Phases Breaks Triggers

**Symptom:** After deleting a phase, routing triggers show errors or broken references.

**Cause:** Triggers that referenced the deleted phase (in conditions like "Current Phase"
or actions like "Change Phase") now point to nothing.

**Prevention:** Always edit triggers to remove references to a phase BEFORE deleting it.
If already broken, edit the affected triggers and update their conditions/actions to
reference valid phases.

## Period Date Blocking Access

**Symptom:** Form appears to be properly configured but users can't access it.

**Cause:** The current date is outside the active period's start/end date range.

**Fix:** Check Periods page and verify the period's start date is in the past and end
date is in the future.

## Email Not Validated on Registration

**Symptom:** Users can register with invalid email addresses (e.g., `.vom` instead of
`.com`) and still receive authentication emails.

**Note:** FormBuilder's local registration does not perform client-side email TLD
validation. Invalid emails may still receive messages if the mail server accepts them.
This is a known limitation of the platform.

## Form Group vs Form Level Settings

Many settings that seem like they should be on the Form are actually at the Form Group level:
- **Local Users / self-registration** → Form Group > Local Users
- **Security Groups** → Form Group > Security Groups
- **Security Sets** → Form Group > Security Sets
- **Testing email address** → Form Group settings

When a setting isn't found at the Form level, check the Form Group level.

## Event Session Categories vs Event Sessions

Categories are **form-level** (persist across periods). Sessions are **period-level**
(must be recreated each period). Don't confuse the two — if you need to add a new type of
session, first create the category, then create sessions within it for the relevant period.

## Datetime Fields Don't Accept Typed Input (Browser Automation)

**Symptom:** When creating or editing Event Sessions, typing dates into Registration Start/End
Date fields fails validation or shows errors like "Please enter both a date and time."

**Cause:** The datetime-local input fields used in Event Session forms don't reliably accept
typed input through browser automation tools. The browser's native date picker is expected.

**Fix for Browser Automation:** Use JavaScript to set datetime values directly:
```javascript
const dateTimeInputs = document.querySelectorAll('input[type="datetime-local"]');
dateTimeInputs[0].value = '2026-02-14T12:00';  // Start date
dateTimeInputs[1].value = '2026-02-15T23:59';  // End date
dateTimeInputs.forEach(input => {
  input.dispatchEvent(new Event('change', { bubbles: true }));
});
```

The ISO 8601 format is required: `YYYY-MM-DDTHH:MM` (e.g., `2026-02-15T23:59`).

**Manual Entry:** When filling forms manually, click the calendar icon or date field to use
the browser's native date/time picker rather than typing.

## Question Triggers Only Work Within Same Section

Question triggers can only reference other questions in the **same section**. If you need a
question in Section B to react to an answer in Section A, you cannot use a question trigger.
You would need to use a routing trigger with a conditional statement instead.
```

