% # header template for all pages


<!DOCTYPE html>
<html>
<head>
	<title> Traveltek </title>

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" type="text/css" href="/static/css/bootstrap.min.css">

	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="/static/css/custom.css">



	<!-- JQuery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

	<!-- Bootstrap Core JavaScript -->
    <!-- <script src="/static/js/bootstrap.min.js"</script>
 -->
    <!-- Custom Javascript -->
    <script type="text/javascript" src="static/js/custom.js"></script>
	<script type="text/javascript" src="static/js/coordHandler.js"></script>
    <script>
	    function showCoords(event){
			var w = window,
			    d = document,
			    e = d.documentElement,
			    g = d.getElementsByTagName('body')[0],
			    x = w.innerWidth || e.clientWidth || g.clientWidth,
			    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
			var a = event.clientX;
			var b = event.clientY;

			var coords="Your Mouse Position Is : " + x + " and " + y + " " + a + " " + b;

			getCoords()

		}
	</script>


</head>

<body>
	<div class="bg" id="myimg" onclick="showCoords(event)" style="max-height: 100%; max-width: 100%;">
	<span id="test">x</span>
	<br />
		<canvas id="mycanvas">

		</canvas>
	</div>
