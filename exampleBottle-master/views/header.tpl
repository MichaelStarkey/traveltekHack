% # header template for all pages, contains a side bar with all contacts
% # requires content-dictionary in the form:
% # {... people: [list, of, all, people], orgs: [list, of, all, organisations]}
% # and subsequent pages must close the body and html tags

<!DOCTYPE html>
<html>
<head>
  <title> AddressBook </title>
  <link rel="stylesheet" type="text/css" href="/static/style/main.css">
  <script src="/static/js/main.js"></script>
</head>
<body>
  <div id="aside">
    <ul id="type">
      <li onclick="hidePeople()" id="hidePeople">Hide People</li>
      <li onclick="hideOrgs()" id="hideOrgs">Hide Organisations</li>
      <a href="/add/person"><li>Add New Person</li></a>
      <a href="/add/organisation"><li>Add New Organisation</li></a>
    </ul>
    <ul id="peopleList">
      <li id="head"><strong>People</strong></li>
      %for p in contdict['people']:
      <a href="/contact/{{p[1]}}"><li>{{p[0]}}</li></a>
      %end
    </ul>
    <ul id="orgsList">
      <li id="head"><strong>Organisations</strong></li>
      %for o in contdict['orgs']:
      <a href="/contact/{{o[1]}}"><li>{{o[0]}}</li></a>
      %end
    </ul>
  </div>
