# Authentication and Access Reference

## Form Authentication

Configure at: Form dashboard > Form Properties > Manage > "Authentication" tab.

Authentication types:
- **Shibboleth (University SSO):** For U of I users authenticating via institutional login.
- **Local Authentication:** For non-university users who register local accounts.
- Both can be enabled simultaneously.

## Self-Registration for Local Users

**This is a common pain point.** If users see "Registration Not Allowed — Sorry,
self-registration is not allowed for this form," the fix is NOT on the form's Authentication
tab. Instead:

Navigate to: **Form Group level** (one level above the form) > **Local Users** page.
Check the box: **"Allow users to register their own accounts."**

This setting lives at the Form Group level, not the Form level, which is why it's
often missed.

## Periods

Periods define when a form is active. Navigate to: Form dashboard > "Periods" under
Security and Form Lifecycle.

Key period settings:
- **Start/End dates:** When the form accepts responses. If the current date is outside
  the period range, users cannot access the form.
- **Maximum Registrants:** Total registration limit for the period.
- **Waitlist settings:** Enable/disable waitlisting when max registrants is reached.
- **Event Sessions:** Each period has its own set of event sessions.

**Common issue:** If users can't access a form that should be open, check that the period
start date has passed and the end date hasn't been reached.

## Security Groups

Security groups control admin-level access to forms. They are created at the Form Group
level and can be assigned permissions on individual phases.

Navigate to: Form Group > Security Groups (to create groups) and Form Group > Security
Sets (to assign permissions).

## Form URL

The client-facing survey URL is separate from the admin URL. Find it at:
Form dashboard > Form Properties. The URL format is typically:
`appserv7.admin.uillinois.edu/FormBuilderSurvey/Survey/{formPath}`

The form path can be customized in Form Properties.

## Test Email Mode

When enabled, all form-generated emails go to the form group's testing email address
instead of actual recipients. Enable at: Form Properties > General tab > "Test Email Mode."
Always use this when testing form workflows to avoid sending emails to real users.