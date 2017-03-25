function getPos(e){
	x=e.clientX;
	y=e.clientY;
	cursor="Your Mouse Position Is : " + x + " and " + y ;
	document.getElementById("displayArea").innerHTML=cursor
}
    
function stopTracking(){
	document.getElementById("displayArea").innerHTML="";
}