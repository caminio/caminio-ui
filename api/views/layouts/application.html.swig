<!doctype html>
<html lang="{{ i18n.locale() }}">
<head>
  <meta charset="utf-8">
  <title>{% block title %}camin.io{% endblock %}</title>

  {% block head %}
  <link rel="stylesheet" href="main.css">
  {% endblock %}

</head>
<body class="side-panel-active">
  {% block content %}
    <div id="splash">
      <div class="text">{{ t('initializing_application') }}</div>
      <div class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
  {% endblock %}
</body>
</html>