# Payments Reference

## Enabling Payments

Navigate to: Form dashboard > Form Properties > Manage > "Payment Details" tab.

Check "This form accepts payments" and select payment types:
- **Allow credit card payments:** Requires a CFOAPAL (Chart of Accounts string). Must verify
  with OBFS Merchant Card Services.
- **Allow check payments:** Optional custom text shown to users when confirming check payment.

## Payment Line Items

Navigate to: Form Contents page > Global Settings > "Payment Information" link.
Or URL: `.../Form/{formId}/Contents/PaymentInformation`

### Payment Line Item Types

1. **Flat fee:** A fixed cost added to every form submission regardless of answers.

2. **The value of a question in dollars:** Variable pricing based on a question's answer.
   After selecting the source question, the form shows each possible answer value with a
   price field. For Event Session questions, session prices auto-populate from the event
   session definitions.

3. **The value of a question multiplied by a base rate:** For quantity-based pricing
   (e.g., ordering multiple items). The question's answer is multiplied by the base rate.

### Creating a Payment Line Item

1. Click "+ ADD NEW PAYMENT LINE ITEM"
2. Enter the **Name** (descriptive label, e.g., "Minecraft and 3D Printing")
3. Select the **Type** (usually "the value of a question in dollars" for event sessions)
4. Select the **Source Question** (the Event Session or other question that determines price)
5. Set prices for each answer option (auto-populated for Event Session questions)
6. Verify the **Destination CFOAPAL** (defaults to the form's CFOAPAL; can override per
   line item)
7. Click **Save**

### CFOAPAL

The CFOAPAL is the University of Illinois accounting string (Chart-Fund-Organization-Account-
Program-Activity-Location) that determines where payment revenue is deposited. Format example:
`1-303853-902000-305265-902085`. Each line item can use the form default or specify an
alternate CFOAPAL.