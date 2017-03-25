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

	<script>
	function getPos(e){
		x=e.clientX;
		y=e.clientY;
		cursor="Your Mouse Position Is : " + x + " and " + y ;
		document.getElementById("displayArea").innerHTML=cursor
	}
    
	function stopTracking(){
		document.getElementById("displayArea").innerHTML="";
	}
	</script>
</head>

<body>

	<div class="map" id="focusArea" onclick="getPos(event)" onmouseout="stopTracking()">
		<img src="static/images/worldmap.jpg" alt="">
	</div>

    	<p id="displayArea"></p>
    </div>