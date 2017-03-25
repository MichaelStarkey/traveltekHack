function getCoords() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			do_coords(this.response);
		}
	};
	xhttp.open("GET", "/getCoords/", true);
	xhttp.send();
}

function do_coords(r) {
	console.log(r);
}
