# Start Here Page Template

## HTML Structure

```html
<link rel="stylesheet" href="https://instructure-uploads.s3.amazonaws.com/account_145590000000000001/attachments/9675811/dp_app.css">

<div id="kl_wrapper_3" class="kl_flat_sections variation_2 kl_wrapper">

  <!-- Header -->
  <div id="kl_banner" class="" style="margin-bottom: 0px; padding-top: 40px; padding-bottom: 10px;">
    <h2>
      <span id="kl_banner_left">
        <span class="kl_mod_text">Week </span>
        <span class="kl_mod_num">{WEEK_NUM}</span>
      </span>
      <span id="kl_banner_right">{TOPIC_TITLE}</span>
    </h2>
  </div>

  <!-- Banner Image -->
  <div id="kl_banner_image">
    <img class="kl_image_full_width"
         style="width: 100%; height: auto; max-width: 100%;"
         role="presentation"
         src="https://files.ciditools.com/illinoisedu/UIUC_banner_Creative_1.png"
         alt=""
         loading="lazy">
  </div>

  <!-- Topic Overview -->
  <div id="kl_custom_block_0" class="">
    <h3 class="">
      <i class="fas fa-binoculars" style="color: #ff5f05;" aria-hidden="true">
        <span class="dp-icon-content" style="display: none;">&nbsp;</span>
      </i>
      Topic Overview
    </h3>
    <p><strong>{MAIN_QUESTION}</strong></p>
    <p>{OVERVIEW_PARAGRAPH}</p>
    <p><strong>Unit {UNIT_LETTER}: {UNIT_NAME}</strong> | {UNIT_CONTEXT}</p>
  </div>

  <!-- Objectives -->
  <div id="kl_objectives2" class="">
    <h3>
      <i class="fa fa-check" style="color: #ff5f05;" aria-hidden="true">
        <span class="dp-icon-content" style="display: none;">&nbsp;</span>
      </i>
      Learning Objectives
    </h3>
    <p>By the end of this week, you will be able to:</p>
    <ol style="list-style-type: decimal;">
      {OBJECTIVES_LIST}
    </ol>
  </div>

  <!-- TUESDAY SESSION -->
  <div id="kl_custom_block_tuesday" class="">
    <h3 class="">
      <i class="fas fa-calendar-day" style="color: #ff5f05;" aria-hidden="true">
        <span class="dp-icon-content" style="display: none;">&nbsp;</span>
      </i>
      TUESDAY | Session 1: {SESSION1_TITLE} (75 min)
    </h3>

    <h4 style="margin-top: 15px; color: #12284c;">Before Class</h4>
    <ul style="list-style-type: none; padding-left: 0;">
      {TUESDAY_BEFORE_CLASS}
    </ul>

    <h4 style="margin-top: 15px; color: #12284c;">During Class</h4>
    <table style="width: 100%; border-collapse: collapse;" border="1">
      <thead>
        <tr style="background-color: #f5f5f5;">
          <th style="text-align: left; padding: 8px; width: 15%;">Time</th>
          <th style="text-align: left; padding: 8px; width: 45%;">Activity</th>
          <th style="text-align: left; padding: 8px; width: 40%;">Purpose</th>
        </tr>
      </thead>
      <tbody>
        {TUESDAY_AGENDA_ROWS}
      </tbody>
    </table>

    <h4 style="margin-top: 15px; color: #12284c;">After Class</h4>
    <ul style="list-style-type: none; padding-left: 0;">
      {TUESDAY_AFTER_CLASS}
    </ul>
  </div>

  <!-- THURSDAY SESSION -->
  <div id="kl_custom_block_thursday" class="">
    <h3 class="">
      <i class="fas fa-calendar-day" style="color: #ff5f05;" aria-hidden="true">
        <span class="dp-icon-content" style="display: none;">&nbsp;</span>
      </i>
      THURSDAY | Session 2: {SESSION2_TITLE} (75 min)
    </h3>

    <h4 style="margin-top: 15px; color: #12284c;">Before Class {TIME_ESTIMATE}</h4>
    <ul style="list-style-type: none; padding-left: 0;">
      {THURSDAY_BEFORE_CLASS}
    </ul>

    <h4 style="margin-top: 15px; color: #12284c;">During Class</h4>
    <table style="width: 100%; border-collapse: collapse;" border="1">
      <thead>
        <tr style="background-color: #f5f5f5;">
          <th style="text-align: left; padding: 8px; width: 15%;">Time</th>
          <th style="text-align: left; padding: 8px; width: 45%;">Activity</th>
          <th style="text-align: left; padding: 8px; width: 40%;">Purpose</th>
        </tr>
      </thead>
      <tbody>
        {THURSDAY_AGENDA_ROWS}
      </tbody>
    </table>

    <h4 style="margin-top: 15px; color: #12284c;">After Class</h4>
    <ul style="list-style-type: none; padding-left: 0;">
      {THURSDAY_AFTER_CLASS}
    </ul>
  </div>

  <!-- Readings/Resources -->
  <div id="kl_readings2">
    <h3>
      <i class="fa fa-book" style="color: #ff5f05;" aria-hidden="true">
        <span class="dp-icon-content" style="display: none;">&nbsp;</span>
      </i>
      Readings &amp; Resources
    </h3>
    {READINGS_CONTENT}
  </div>

  <!-- Key Discussion Questions (optional) -->
  <div id="kl_custom_block_discussion" class="">
    <h3 class="">
      <i class="fas fa-comments" style="color: #ff5f05;" aria-hidden="true">
        <span class="dp-icon-content" style="display: none;">&nbsp;</span>
      </i>
      Key Discussion Questions
    </h3>
    <p>Come prepared to discuss:</p>
    <ol>
      {DISCUSSION_QUESTIONS}
    </ol>
  </div>

  <!-- Next Steps -->
  <div id="kl_custom_block_3" class="">
    <h3 class="">
      <i class="far fa-arrow-alt-circle-right" style="color: #ff5f05;" aria-hidden="true">
        <span class="dp-icon-content" style="display: none;">&nbsp;</span>
      </i>
      Next Steps
    </h3>
    <p><strong>This Week:</strong></p>
    <ul>
      {THIS_WEEK_TASKS}
    </ul>
    <p><strong>Looking Ahead:</strong> {LOOKING_AHEAD}</p>
  </div>

  <!-- Footer -->
  <div id="kl_custom_block_2" class="" style="background-color: #12284c; color: #ffffff; padding: 5px 0px 0px;">
    <p class="kl_module_progress_completion" style="display: none; background-color: #ff5f05; color: #000000;">
      Module Item Completion
    </p>
  </div>

</div>

<script src="https://instructure-uploads.s3.amazonaws.com/account_145590000000000001/attachments/9675810/dp_app.js"></script>
```

## Placeholder Reference

| Placeholder | Source | Example |
|-------------|--------|---------|
| `{WEEK_NUM}` | Week number | `1`, `2`, `3` |
| `{TOPIC_TITLE}` | Markdown h1 or theme | `IS Fundamentals` |
| `{MAIN_QUESTION}` | Theme question | `What is an Information System?` |
| `{OVERVIEW_PARAGRAPH}` | Generate from theme | 2-3 sentences |
| `{UNIT_LETTER}` | From markdown Unit field | `A`, `B`, `C`, `D`, `E` |
| `{UNIT_NAME}` | Unit full name | `Foundations` |
| `{OBJECTIVES_LIST}` | From Learning Objectives table | `<li>` items with L-C-E tags |
| `{SESSION1_TITLE}` | From Session 1 heading | `Course Introduction` |
| `{TUESDAY_BEFORE_CLASS}` | Pre-class prep items | `<li>` checkboxes |
| `{TUESDAY_AGENDA_ROWS}` | From activity table | `<tr>` rows |
| `{TUESDAY_AFTER_CLASS}` | Post-class tasks | `<li>` checkboxes |
| `{SESSION2_TITLE}` | From Session 2 heading | `IS Foundations` |
| `{TIME_ESTIMATE}` | Total prep time | `<span>(~60 min)</span>` |
| `{THURSDAY_BEFORE_CLASS}` | Readings + prep | `<li>` with nested `<ul>` |
| `{THURSDAY_AGENDA_ROWS}` | From activity table | `<tr>` rows |
| `{THURSDAY_AFTER_CLASS}` | Deliverables + preview | `<li>` items |
| `{READINGS_CONTENT}` | From Readings section | Required + Supplementary |
| `{DISCUSSION_QUESTIONS}` | Key Discussion Questions | `<li>` items |
| `{THIS_WEEK_TASKS}` | Summary of deliverables | `<li>` items |
| `{LOOKING_AHEAD}` | Preview of next week | 1 sentence |

## HTML Snippets

### Objective Item
```html
<li><strong>{VERB}</strong> {description} <em>({LCE_TIER})</em></li>
```

### Before Class Checkbox
```html
<li>&#9744; {task_description}</li>
```

### Before Class with Nested List
```html
<li>&#9744; <strong>{main_task}</strong> — {time_estimate}
  <ul style="margin-top: 5px;">
    <li>{subtask_1}</li>
    <li>{subtask_2}</li>
  </ul>
</li>
```

### Agenda Table Row
```html
<tr>
  <td style="padding: 8px;">{time_range}</td>
  <td style="padding: 8px;">{activity}</td>
  <td style="padding: 8px;">{purpose}</td>
</tr>
```

### External Link
```html
<a href="{url}" target="_blank" class="inline_disabled">{text}</a>
```

### Internal Canvas Link (Relative)
```html
<a href="/courses/67619/{path}">{text}</a>
```

### Common Internal Links
- Syllabus: `/courses/67619/assignments/syllabus`
- Grades: `/courses/67619/grades`
- Modules: `/courses/67619/modules`
- Pages: `/courses/67619/pages/{page-url}`
