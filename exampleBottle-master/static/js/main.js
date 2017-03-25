function _(element) {
    var e = document.getElementById(element);
    return e;
}

function hidePeople() {
  if (_('peopleList').style.display == "inline") {
    _('peopleList').style.display = "none";
    _('hidePeople').innerHTML = "Show People"
  } else {
    _('peopleList').style.display = "inline";
    _('hidePeople').innerHTML = "Hide People"
  }
}

function hideOrgs() {
  if (_('orgsList').style.display == "inline") {
    _('orgsList').style.display = "none";
    _('hideOrgs').innerHTML = "Show Organisations"
    console.log(_('hideOrgs').nodeValue)
  } else {
    _('orgsList').style.display = "inline";
    _('hideOrgs').innerHTML = "Hide Organisations"
  }
}
