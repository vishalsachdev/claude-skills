# Assignment Templates

## Template Selection Logic

| Pattern | Points | Submission | Example |
|---------|--------|------------|---------|
| **Lab** | 10 | Text entry | Magazine Analysis, SQL Practice |
| **Discussion** | 10-15 | Discussion board | Case Discussion, Yellowdig |
| **Position Paper** | 15-20 | Text + file | AI Debate, Ethics Paper |
| **Essay** | 15 | File upload | Framework Application |

## Lab Assignment Template

```html
<link rel="stylesheet" href="https://instructure-uploads.s3.amazonaws.com/account_145590000000000001/attachments/9675811/dp_app.css">

<div id="kl_wrapper_3" class="kl_flat_sections variation_2 kl_wrapper">

  <div id="kl_custom_block_sub_0">
    <h2>Week {N} Assignment: {TITLE}</h2>
  </div>

  <div id="kl_custom_block_purpose" class="">
    <h3 class="">
      <i class="fas fa-street-view" style="color: #ff5f05;" aria-hidden="true">
        <span class="dp-icon-content" style="display: none;">&nbsp;</span>
      </i>
      Purpose
    </h3>
    <p>This assignment helps you:</p>
    <ul>
      {PURPOSE_ITEMS}
    </ul>
  </div>

  <div id="kl_custom_block_assessment" class="">
    <h3 class="">
      <i class="fas fa-apple-alt" style="color: #ff5f05;" aria-hidden="true">
        <span class="dp-icon-content" style="display: none;">&nbsp;</span>
      </i>
      Assessment
    </h3>
    <ul>
      <li><strong>{POINTS} points</strong> (part of Weekly Labs, 25% of course grade)</li>
      <li>See rubric below for grading criteria</li>
    </ul>
  </div>

  <div id="kl_custom_block_instructions" class="">
    <h3 class="">
      <i class="fas fa-clipboard-list" style="color: #ff5f05;" aria-hidden="true">
        <span class="dp-icon-content" style="display: none;">&nbsp;</span>
      </i>
      Instructions
    </h3>
    {INSTRUCTIONS_CONTENT}
  </div>

  <div id="kl_custom_block_submission" class="">
    <h3 class="">
      <i class="fas fa-upload" style="color: #ff5f05;" aria-hidden="true">
        <span class="dp-icon-content" style="display: none;">&nbsp;</span>
      </i>
      Submission
    </h3>
    <p><strong>Format:</strong> {SUBMISSION_FORMAT}</p>
    <p><strong>Due:</strong> {DUE_DATE}</p>
    {SUBMISSION_TEMPLATE}
  </div>

  <div id="kl_custom_block_rubric" class="">
    <h3 class="">
      <i class="fas fa-th-list" style="color: #ff5f05;" aria-hidden="true">
        <span class="dp-icon-content" style="display: none;">&nbsp;</span>
      </i>
      Rubric ({POINTS} points)
    </h3>
    {RUBRIC_TABLE}
  </div>

  <div id="kl_custom_block_tips" class="">
    <h3 class="">
      <i class="fas fa-lightbulb" style="color: #ff5f05;" aria-hidden="true">
        <span class="dp-icon-content" style="display: none;">&nbsp;</span>
      </i>
      Tips for Success
    </h3>
    <ul>
      {TIPS_ITEMS}
    </ul>
  </div>

  <div id="kl_custom_block_3" class="">
    <h3 class="">
      <i class="far fa-arrow-alt-circle-right" style="color: #ff5f05;" aria-hidden="true">
        <span class="dp-icon-content" style="display: none;">&nbsp;</span>
      </i>
      Next Steps
    </h3>
    <p>{NEXT_STEPS}</p>
  </div>

  <div id="kl_custom_block_2" class="" style="background-color: #12284c; color: #ffffff; padding: 5px 0px 0px;">
    <p class="kl_module_progress_completion" style="display: none;">Module Item Completion</p>
  </div>

</div>

<script src="https://instructure-uploads.s3.amazonaws.com/account_145590000000000001/attachments/9675810/dp_app.js"></script>
```

## Rubric Table Template

```html
<table style="width: 100%; border-collapse: collapse;" border="1">
  <thead>
    <tr style="background-color: #12284c; color: #ffffff;">
      <th style="padding: 10px; text-align: left;">Criterion</th>
      <th style="padding: 10px; text-align: center; width: 20%;">Full Credit</th>
      <th style="padding: 10px; text-align: center; width: 20%;">Partial Credit</th>
      <th style="padding: 10px; text-align: center; width: 20%;">No Credit</th>
      <th style="padding: 10px; text-align: center; width: 10%;">Points</th>
    </tr>
  </thead>
  <tbody>
    {RUBRIC_ROWS}
  </tbody>
  <tfoot>
    <tr style="background-color: #f5f5f5;">
      <td colspan="4" style="padding: 10px; text-align: right;"><strong>Total</strong></td>
      <td style="padding: 10px; text-align: center;"><strong>{TOTAL_POINTS}</strong></td>
    </tr>
  </tfoot>
</table>
```

## Rubric Row Template

```html
<tr>
  <td style="padding: 10px;"><strong>{CRITERION_NAME}</strong><br><em>{CRITERION_QUESTION}</em></td>
  <td style="padding: 10px; text-align: center;">{FULL_DESCRIPTION}</td>
  <td style="padding: 10px; text-align: center;">{PARTIAL_DESCRIPTION}</td>
  <td style="padding: 10px; text-align: center;">{NO_CREDIT_DESCRIPTION}</td>
  <td style="padding: 10px; text-align: center;"><strong>{POINTS}</strong></td>
</tr>
```

## Submission Template Box

```html
<div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #ff5f05; margin: 10px 0;">
  <p><strong>Field 1:</strong> [Description]</p>
  <p><strong>Field 2:</strong> [Description]</p>
</div>
```

## Instructions Step Pattern

```html
<h4 style="margin-top: 15px; color: #12284c;">Step {N}: {STEP_TITLE}</h4>
<p>{STEP_INTRO}</p>
<ul>
  {STEP_ITEMS}
</ul>
```

## Position Paper Additions

For position papers, add debate structure:

```html
<div id="kl_custom_block_debate" class="">
  <h3 class="">
    <i class="fas fa-balance-scale" style="color: #ff5f05;" aria-hidden="true">
      <span class="dp-icon-content" style="display: none;">&nbsp;</span>
    </i>
    Debate Position
  </h3>
  <p>You will be assigned to argue <strong>FOR</strong> or <strong>AGAINST</strong> the following statement:</p>
  <blockquote style="border-left: 4px solid #ff5f05; padding-left: 15px; margin: 15px 0; font-style: italic;">
    "{DEBATE_STATEMENT}"
  </blockquote>
  <p><strong>Your assigned position:</strong> You will be notified in class.</p>
</div>
```

## Essay Additions

For essays, add citation requirements:

```html
<div id="kl_custom_block_format" class="">
  <h3 class="">
    <i class="fas fa-file-alt" style="color: #ff5f05;" aria-hidden="true">
      <span class="dp-icon-content" style="display: none;">&nbsp;</span>
    </i>
    Format Requirements
  </h3>
  <ul>
    <li><strong>Length:</strong> {WORD_COUNT} words</li>
    <li><strong>Format:</strong> {FORMAT_REQUIREMENTS}</li>
    <li><strong>Citations:</strong> {CITATION_STYLE}</li>
    <li><strong>File type:</strong> PDF or Word document</li>
  </ul>
</div>
```
