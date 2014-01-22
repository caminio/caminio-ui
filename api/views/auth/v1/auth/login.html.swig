{% extends '../../../layouts/application.html.swig' %}
{% block content %}
<h1>here</h1>
<form action="/login" method="post">
  <input type="text" name="username" />
  <input type="password" name="password" />
  <input type="submit" />
</form>
{% endblock %}