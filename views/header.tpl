% # header template for all pages


<!DOCTYPE html>
<html>
<head>
	<title> Traveltek </title>
	
	<!-- Bootstrap CSS -->
	<link rel="stylesheet" type="text/css" href="/static/style/bootstrap.min.css">

	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="/static/style/main.css">

	<!-- Bootstrap Core JavaScript -->
    <script src="/static/js/bootstrap.min.js"</script>

    <!-- Custom Javascript -->
    <script src="/static/js/custom.js"></script>

</head>

<body>

	<div class="map" id="focusArea" onclick="getPos(event)" onmouseout="stopTracking()"><p>Mouse Over This Text And Get The Cursor Position!</p></div>

    	<p id="displayArea"></p>
    </div>