function addCoord(eid) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			do(eid);
		}
	};
	xhttp.open("GET", "/GET/Coords/", true);
	xhttp.send();
}