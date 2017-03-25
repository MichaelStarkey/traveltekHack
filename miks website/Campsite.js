/**
 * Created by Mick Robinson and Rebekah Young.
 */

// ****** Declare variables *******//

var accommodationField, arrivalDateField, departureDateField ;
var numberOfAdultsField, numberOfChildrenField, fullNameField, addressField, postCodeField;
var telephoneNumberField, emailField;
var totalNumberOfNights, totalCostOfStay;
var totalNightsText, totalCostText;
var activitiesField , commentField;
var accommodationReference, accommodationList , activitiesList;
var adultRange, childRange ;

// ****** Arrays ********

var bookings = [];
var comments = [];

// ******* CONSTANTS FOR ADMIN OF CAMPSITE ********

    const numberOFTentPitches = 50;
    const numberOfCampervanAndCaravanPitches = 25;
    const numberOfStaticCaravans = 15;
    const numberOfCabins = 10;



// ****** Create the booking type ******

var booking = function(accommodation, arrivalDate, departureDate, numberOfAdults, numberOfChildren, fullName, address, postcode, telephoneNumber, email, totalNights, totalCost){
    this.accomadation = accommodation;
    this.arrivalDate = arrivalDate;
    this.departureDate = departureDate;
    this.numberOfAdults = numberOfAdults;
    this.numberOfChildren = numberOfChildren;
    this.fullName = fullName;
    this.address = address;
    this.postcode = postcode;
    this.telephoneNumber = telephoneNumber;
    this.email = email;
    this.totalNights = totalNights;
    this.totalCost =  totalCost;
    this.cancelled = false;
    this.completed = false;

};

// ****** Create function prototypes ******

// ****** Booking Type ********

booking.prototype.isDue = function(){                       // a comparison with the current date and the arrival date
    var now = new Date().toISOString().substring(0, 10);                                  // to check if booking is due.
    if(now.localeCompare(this.arrivalDate) != -1){
        return true;
    } else {
        return false;
    }
};

booking.prototype.howManyDaysTill = function(){             // Check how many days until a booking is due.
    return ((this.whenDue() ) / 86400000);                  // returns a value in milliSeconds
};

booking.prototype.howManyHoursTill = function(){            // Check how many hours until a booking is due.
    return ((this.howManyDaysTill()) * 24);                 // returns a value in milliSeconds
};

booking.prototype.whenDue = function(){                     // Check when an booking is due.
    return this.arrivalDate - new Date();                   //  returns a date
};

booking.prototype.getName = function() {                   // Get the string representation of a date.
    return this.fullName;
};


booking.prototype.getAccommodation = function() {        // Get the string representation of a date.
    return this.accomadation.toString();
};


booking.prototype.getArrivalDate = function() {          // Get the string representation of a date.
    return this.arrivalDate.toString();
};

booking.prototype.getDepartureDate = function() {        // Get the string representation of a date.
    return this.departureDate.toString();
};

booking.prototype.getNumberOfAdults = function() {
    return this.numberOfAdults;

}


booking.prototype.getNumberOfChildren = function() {
    return this.numberOfChildren;

}

booking.prototype.getAddress = function() {
    return this.address;

}

booking.prototype.getPostcode = function() {
    return this.postcode;

}

booking.prototype.getTelephoneNumber = function() {
    return this.telephoneNumber;

}

booking.prototype.getNumberOfNights = function() {
    return this.totalNights;

}

booking.prototype.getEmail = function() {
    return this.email;

}

booking.prototype.getTotalCost = function() {
    return this.totalCost;

}





booking.prototype.checkCancelled = function() {         // Checks to see if a booking cancelled element
                                                        // is true or false and returns either cancelled or confirmed.
    var bookingState = "";                              // as a string.
    // alert("in checkCancelled");                      // **** TEST CODE *****
    if(this.cancelled){
        bookingState += "Cancelled\n\n";                // Updates the booking stage of the booking
    } else {
        bookingState += "Confirmed\n\n";
    }
    return bookingState;                                // Returns the booking state as a string.
};

booking.prototype.tableRow = function() {               // Formats a table row for use on the HTML form
                                                        // returns it as a string.

    return "<tr><th>" + this.fullName + "<tr><th>" + this.accomadation + "</th><th>" + this.arrivalDate + "</th><th>" 
        + this.totalNights + "</th><th>" + this.totalCost + "</th><th>"
        +  "<input type='checkbox' value=' ' " + this.checkCancelled() + "/>" +
        "</th></tr>" ;

};

booking.prototype.toString = function(){                // Returns a formatted string which will return
                                                        // a booking as a fullName , accommodation , arrivalDate ,
                                                        // totalNights , totalCost and if is confirmed or cancelled.

    var bookingString = this.fullName + '\n' + this.accomadation + '\n' +
        this.arrivalDate.toString() + '\n' + this.totalNights + '\n' + this.totalCost + '\n' + this.checkCancelled() + '\n\n';

    return bookingString;
};

                                                        // Adds a booking to the bookings array.
var addBooking = function(accommodation, arrivalDate, departureDate, numberOfAdults, numberOfChildren, fullName, address, postcode, telephoneNumber, email , totalNights , totalCost){        // Adds an appointment to the appointments array

    var newBooking = new booking(accommodation, arrivalDate, departureDate, numberOfAdults, numberOfChildren, fullName, address, postcode, telephoneNumber, email , totalNights, totalCost);
    bookings.push(newBooking); // adds it to the end of the array

};



var addComment = function() {                           // Adds a comment to the comments array
    commentField = document.getElementById("comments").value;
    comments.push(commentField);
}


function initMap(lattitude,longtitude) {                                    // Initialises the Map with the location of the campsite
    var map;                                            // This is the location of a real campsite in Ayr. (Culzean Castle Camping and Caravanning Club Site)
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: longtitude, lng: lattitude},     // Lat and lng for above site.
        zoom: 8
    });
}

// ****** saveBookings function ******
// Uses JSON to convert the bookings object to a string then saves the string to local storage.

function saveBookings(alertString){
    var aBooking = JSON.stringify(bookings);
    if(aBooking !== ""){
        localStorage.bookings = aBooking;
        alert("your booking has been " + alertString);        // Alert the user their booking has been acknowledged.
    } else {
        alert("We're sorry there has been a problem , your bookin has not been " + alertString + ", Please try again later.");
    }
};

function saveComments(){                                    // saves the comments to local storage.
    alert("your comments has been acknowledged, thank you");
    localStorage.setItem("comments", JSON.stringify(comments))

};

// ****** loadBooking funtion ******
// Retrieves the string stored using JSON on local storage and parses the string back into booking objects.

var loadBookings = function() {
    var theBookings = "", todaysDate = new Date();

    if (localStorage.bookings !== undefined) {              // Check to see if any bookings exist in local storage
        theBookings = localStorage.bookings;
        bookings = JSON.parse(theBookings);                 // Parse the bookings back into the array
        var proto = new booking();

        for (var i = 0; i < bookings.length; i++) {
            var aBooking = bookings[i];
            // Attach the booking prototype to this object
            aBooking.__proto__ = proto;

            if (aBooking.arrivalDate < todaysDate)          // Check to see of the booking has expired if so change it.
                aBooking.completed = true;
            //alert(appt.datetime + "\n" + todaysDate + appt.completed);  //*****TEST CODE*****
        }
    }
};

// ****** loadComments funtion ******
// Retrieves the string stored using JSON on local storage and parses the string back into the comments array.

var loadComments = function() {
    var theComments;

    theComments = localStorage.getItem("comments"); // Check to see if any comments exist in local storage
    if(theComments) {
        comments = JSON.parse(theComments);
    }else{
                                                    // For this web app the comments are from Culzean Castle Camping and Caravanning Club Site
                                                    // a database could be used here if I had extra time.

        comments.push("So far got to be best campsite we have stayed at, amazing views and very clean facilities. - Mauro borella");
        comments.push("Fantastic. Lovely. clean!  Thank you x - Hannah Glynn");
        comments.push("Scenery to die for. - geoff lockett");
        comments.push("Worth it just for the sunsets! Friendly staff and a good pitch for our tent. Castle on the doorstep. Fantastic. - Catriona Howson");
        localStorage.setItem("comments", JSON.stringify(comments))
    }
};



var pressMakeBookingButton = function(){                                        // When user pushes the button this function checks the booking
                                                                                // validates the dates and adults, checks the phone and email are correct
                                                                                // if not it alerts the user

    var tempBookingDate , bookingToCheck;
    var currentBookingArrivalDate, currentBookingAccommodation;                                          // Set up variables
    var okToContinue = true , accommodationBooked = true;

    var today = new Date().toISOString().substring(0, 10);

    arrivalDateField = document.getElementById("arrivalDate").value;
    departureDateField = document.getElementById("departureDate").value;


    if(accommodationField.localeCompare("None") == 0) {

        alert("Please select your accommodation type. ")
        okToContinue = false;

    }
    console.log(fullNameField.value.length);
    if(fullNameField.value.length < 1) {
        alert("Please enter your full name. ")
        okToContinue = false;


    }


    if(today.localeCompare(arrivalDateField) == 1 ) {

        alert("Dates can not be booked before the current date " + today )

        okToContinue = false;
    }

    if(today.localeCompare(departureDateField) == 1 ) {

        alert("Dates can not be booked before the current date " + today )

        okToContinue = false;
    }

    if(arrivalDateField.localeCompare(departureDateField) == 1 ) {

        alert("Departure dates can not be before the arrival date ")
        okToContinue = false;
    }

    console.log("number of adult" + numberOfAdultsField);
    if(numberOfAdultsField < 1) {

        alert("At Least 1 adult Over 18 must be a member of the party staying. ")
        okToContinue = false;

    }



    var telephoneNumberCheck = document.getElementById("telephoneNumber").value;

    console.log((telephoneNumberCheck.length == 11 && telephoneNumberCheck.substr(0,2)));
    
    if(!(telephoneNumberCheck.length == 11 && (telephoneNumberCheck.substr(0,2).localeCompare("01") == 0 || telephoneNumberCheck.substr(0,2).localeCompare("07") == 0 || telephoneNumberCheck.substr(0,2).localeCompare("02") == 0))) {
                                                                            // UK AREA CODES                                                     // MOBILE CODE                                               // LONDON AREA CODE
        alert("Please enter a valid telephone number ")
        okToContinue = false;

    }

    var emailFieldCheck = document.getElementById("email").value;

    var atPosition = emailFieldCheck.indexOf("@");
    var dotPosition = emailFieldCheck.lastIndexOf(".");                                                      // adaptef from http://www.w3schools.com/js/tryit.asp?filename=tryjs_form_validate_email
    if (atPosition < 1 || dotPosition < atPosition + 2 || dotPosition + 2 >= emailFieldCheck.length) {
        alert("Please enter a valid e-mail address");
        okToContinue =  false;
    }
    


    for (var i = 0; i < bookings.length; i++) {                                                         // loop through the array
        bookingToCheck = bookings[i];
        currentBookingAccomodation = bookingToCheck.getAccommodation();
        currentBookingArrivalDate = bookingToCheck.getArrivalDate();                                    // get booking arrival date
        console.log("currentBookingArivalDate " + currentBookingArrivalDate);                                 // *** TEST CODE ***

        var tempBookingDate = arrivalDateField;                 // get new appointment date and time

        //console.log("tempBookingDate=" + tempBookingDate + "\nToday=" + today + "\n" + today.localeCompare(tempBookingDate)); //**** TEST CODE *****

        //alert("Checking Bookings" + " " + i + " " + bookingToCheck + "\n" + currentBookingArrivalDate); // *** TEST CODE ***

        if (currentBookingArrivalDate.localeCompare(tempBookingDate) == 0 && currentBookingAccomodation.localeCompare(accommodationField) == 0) {                     // Compare the strings created above
            alert("This Booking for " + accommodationField + " is unavailable on" + tempBookingDate)                       // Alert user of unavailability
            accommodationBooked = true;
            bookingToCheck = bookings[0];                                                       // reset appointments array to 0
            break;                                                                                      // exit the loop
        } else {
            accommodationBooked = false;                                                                    // if this is true the appointment can be added
        }
     }



    if (!accommodationBooked && okToContinue) {                                                                      // calculate accommodation if not booked.
        calculateNumberOfNights(arrivalDateField, departureDateField);
        //alert("total nights" + totalNumberOfNights );                                          // *** TEST CODE ***
        calculateCostOfStay(totalNumberOfNights, accommodationField);
        //alert(totalCostOfStay );
        // *** TEST CODE ***


        // add the new appointment to the array
        addBooking(accommodationField, arrivalDateField, departureDateField, numberOfAdultsField, numberOfChildrenField, fullNameField.value, addressField.value, postCodeField.value, telephoneNumberField.value, emailField.value, totalNumberOfNights, totalCostOfStay);
        clearUI();                                                                                      // Clear the fields on the page

        showTable(); // Display the whole list of appointments                                              // show the table.

        saveBookings("Saved");
    }


};

var calculateNumberOfNights = function(arrivalDate, departureDate) {                    // code adapted from http://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html#fbid=xc3kZqk-bgH
                                                                                        // and http://www.javascriptkit.com/javatutors/datedifference.shtml
    var aDay = 1000 * 60 * 60 * 24;

    var arrivalDateInMilliseconds = new Date(arrivalDate).getTime();
    var departureDateInMilliseconds = new Date(departureDate).getTime();

    var dateDifference = departureDateInMilliseconds - arrivalDateInMilliseconds;
    totalNightsText = document.getElementById("totalNights");
    if (dateDifference > 1) {
        totalNumberOfNights = Math.round(dateDifference / aDay);
    }else{
        totalNumberOfNights = 1;
    }
    totalNightsText.innerHTML = totalNumberOfNights;

    return totalNumberOfNights;


};

var calculateCostOfStay = function(numberOfNights, accommodation) {

    var accommodationTypePrice = 0;

    switch (accommodation) {
        case "Tent Pitch" : accommodationTypePrice = 7; // used for validation
                        break;
        case "Campervan Pitch" : accommodationTypePrice = 12; // used for validation
            break;
        case "Caravan Pitch" : accommodationTypePrice = 12; // used for validation
            break;
        case "Static Caravan" : accommodationTypePrice = 25; // used for validation
            break;
        case "Cabin" : accommodationTypePrice = 35; // used for validation
            break;
        default : accommodationTypePrice = -1; // used for validation

    };
    totalCostText = document.getElementById("totalCost");
    totalCostOfStay = numberOfNights * accommodationTypePrice
    totalCostText.innerHTML = totalCostOfStay;

    return totalCostOfStay;

};



var pressCancelBookingButton = function() {



    var checkboxes = document.getElementsByName("bookingCheck");
    var okay = false;
    var checkboxLocation = 0;
    for (var i = 0, l = checkboxes.length; i < l; i++) {
        if (checkboxes[i].checked) {
            okay = true;
            checkboxLocation = i;
            break;
        }
    }
    if (okay) {
        alert(checkboxLocation);
        bookings.splice(checkboxLocation , 1);
        saveBookings("cancelled");
        showTable();
    }
}

var pressEditBookingButton = function() {

    //alert("in editbooking");                  // ********** TEST CODE *********

    var checkboxes = document.getElementsByName("bookingCheck");
    var okay = false;
    var checkboxLocation = 0;
    for (var i = 0, l = checkboxes.length; i < l; i++) {
        if (checkboxes[i].checked) {
            okay = true;
            checkboxLocation = i;
            break;
        }
    }
    if (okay) {
        var editBooking = bookings[checkboxLocation];

        switch (editBooking.getAccommodation()) {                    // used to reset the accommodation list from the booking
            case "Tent Pitch" : accommodationReference = 1;
                break;
            case "Campervan Pitch" : accommodationReference = 2;
                break;
            case "Caravan Pitch" : accommodationReference = 3;
                break;
            case "Static Caravan" : accommodationReference = 4;
                break;
            case "Cabin" : accommodationReference = 5;
                break;
            default : accommodationReference = -1; // used for validation

        };


        // alert(checkboxLocation + " " + accommodationReference);                                    // ********** TEST CODE *********

        accommodationList[accommodationReference].selected = true;
        accommodationField = accommodationList.options[accommodationList.selectedIndex].value;
        var editArrivalDate = document.querySelector('#arrivalDate');
        editArrivalDate.value = editBooking.getArrivalDate();
        var editDepartureDate = document.querySelector('#departureDate');
        editDepartureDate.value = editBooking.getDepartureDate();

        departureDateField.value = editBooking.getDepartureDate();
        $("#numberOfAdults").val(editBooking.getNumberOfAdults());         // adapted from http://mobile-web-app.blogspot.co.uk/2011/11/jquery-mobile-set-value-of-slider-using.html
        $("#numberOfChildren").val(editBooking.getNumberOfChildren());
        adultValue.innerText = editBooking.getNumberOfAdults();
        childValue.innerText = editBooking.getNumberOfChildren();
        numberOfAdultsField = adultRange.value;
        numberOfChildrenField = childRange.value;
        fullNameField.value = editBooking.getName();
        addressField.value = editBooking.getAddress();
        postCodeField.value = editBooking.getPostcode();
        document.getElementById("telephoneNumber").value = editBooking.getTelephoneNumber();
        emailField.value = editBooking.getEmail();
        totalNumberOfNights = editBooking.getNumberOfNights();
        totalCostOfStay = editBooking.getTotalCost()
        totalCostText.innerHTML = totalCostOfStay;
        totalNightsText.innerHTML = totalNumberOfNights;

        bookings.splice(checkboxLocation , 1);
        saveBookings("removed from the bookings list, please press the make a booking button after you have made your changes.");
        showTable();

        
    }
}

var pressCommentButton = function() {

    //alert("in comments");                                               // ********** TEST CODE *********
    addComment();
    saveComments();
    showComments();
    commentField.value = "";


}

var clearUI = function(){  // Clear the fields on the page

    console.log("Clearing form");
    accommodationList[0].selected = true;
    setCurrentDate(arrivalDate, "arrivalDate");
    setCurrentDate(departureDate, "departureDate");
    fullNameField.value = "";
    addressField.value = "";
    postCodeField.value = "";
    telephoneNumberField.value = "";
    emailField.value = "";
    $("#numberOfAdults").val(0);         // adapted from http://mobile-web-app.blogspot.co.uk/2011/11/jquery-mobile-set-value-of-slider-using.html
    $("#numberOfChildren").val(0);
    adultValue.innerText = 0;
    childValue.innerText = 0;
    totalNumberOfNights = 1;
    totalCostOfStay = 0;
    totalNightsText.innerHTML = 0;
    totalCostText.innerHTML = 0;



};

var setCurrentDate = function(dateField, dateFieldName) {
    var date = new Date().toISOString().substring(0, 10),
        dateField = document.querySelector('#'+ dateFieldName);                 //http://jsfiddle.net/GZ46K/
    dateField.value = date;                                                 // To pre populate date fields

    console.log(dateField.value);
    return dateField.value;

};



// ****** window.onload funtion ******
// main setup when the webpage is loaded.

window.onload = function(){

    totalCostText = document.getElementById("totalCost");
    totalNightsText = document.getElementById("totalNights");
    commentField = document.getElementById("comments");

    document.bgColor = "#C0C0C0"; // set background colour of page to silver.
    loadBookings();
    loadComments();
    accommodationList = document.getElementById("accommodationList")
    accommodationField = "None";
    numberOfAdultsField = 0;
    numberOfChildrenField = 0;
    fullNameField = document.getElementById("fullName");
    addressField = document.getElementById("address");
    postCodeField = document.getElementById("postcode");
    telephoneNumberField = document.getElementById("telephoneNumber");
    emailField = document.getElementById("email");
    arrivalDateField = setCurrentDate(arrivalDate, "arrivalDate");
    departureDateField = setCurrentDate(departureDate, "departureDate");
    totalNumberOfNights = 1;                        // this is set to 1 night as if the arrival date and departure date are the same it will cost 1 nights fee
    totalNightsText.innerHTML = totalNumberOfNights.toString();


    console.log("arrivalDate" + arrivalDateField);
    console.log("DepartureDate" + departureDateField);


    $(document).ready(function(){
        $("#makeBookingFlip").click(function(){

            //alert(($("#makeBookingPanel").is(':visible')));
            if (!$("#makeBookingPanel").is(':visible'))
                document.getElementById("makeFlip").innerHTML = "Click here to close panel.";
            else
                document.getElementById("makeFlip").innerHTML = "Click HERE to make a booking.";

            $("#makeBookingPanel").slideToggle("slow");
            totalNightsText.innerHTML = totalNumberOfNights;
        });
    });

    $(document).ready(function(){
        $("#retrieveBookingFlip").click(function(){

            //alert(($("#retrieveBookingPanel").is(':visible')));
            if (!$("#retrieveBookingPanel").is(':visible'))
                document.getElementById("retrieveFlip").innerHTML = "Click here to close panel.";
            else
                document.getElementById("retrieveFlip").innerHTML = "Click HERE to View your bookings.";

            $("#retrieveBookingPanel").slideToggle("slow");
            showTable();
        });
    });

    $(document).ready(function(){
        $("#localActivitiesFlip").click(function(){
            //alert(($("#localActivitiesPanel").is(':visible')));
            if (!$("#localActivitiesPanel").is(':visible'))
                document.getElementById("activityFlip").innerHTML = "Click here to close panel.";
            else
                document.getElementById("activityFlip").innerHTML = "Click HERE to View Local Activities";

            $("#localActivitiesPanel").slideToggle("slow");


            initMap(55.3530376,-4.8385437);
        });
    });

    $(document).ready(function(){
        $("#commentFlip").click(function(){

            //alert(($("#commentPanel").is(':visible')));
            if (!$("#commentPanel").is(':visible'))
                document.getElementById("commentsFlip").innerHTML = "Click here to close panel.";
            else
                document.getElementById("commentsFlip").innerHTML = "Click HERE to View and leave a comment.";

            $("#commentPanel").slideToggle("slow");
            showComments();
        });
    });





    //alert("In onLoad");             // **** TEST CODE *****

    // get elements from the html document

    //** Accommodation List BOX **//



    accommodationList.onload = accommodationList.options[0];

    accommodationList.onchange = function() {

        accommodationField = accommodationList.options[accommodationList.selectedIndex].value;

        totalNumberOfNights = calculateNumberOfNights(arrivalDateField,departureDateField);
        totalCostOfStay = calculateCostOfStay(totalNumberOfNights,accommodationField);

    }

    activitiesList = document.getElementById("activities");
    activitiesList.onload = activitiesList.options[0];

    activitiesList.onchange = function() {

        activitiesField = activitiesList.options[activitiesList.selectedIndex].value;

        document.getElementById("activity").innerHTML = activitiesField;


    }

    //** arrivalDate  **//

    document.getElementById("arrivalDate").oninput = function () {

        arrivalDateField = document.getElementById("arrivalDate").value;

        totalNumberOfNights = calculateNumberOfNights(arrivalDateField,departureDateField);
        totalCostOfStay = calculateCostOfStay(totalNumberOfNights,accommodationField);

        document.getElementById("departureDate").value = new Date(arrivalDateField).toISOString().substring(0, 10);

    }

    //** depature Date  **//

    document.getElementById("departureDate").oninput = function () {

        departureDateField = document.getElementById("departureDate").value;

        totalNumberOfNights = calculateNumberOfNights(arrivalDateField,departureDateField);
        totalCostOfStay = calculateCostOfStay(totalNumberOfNights,accommodationField);


    }

    //** number of adults  **//

    adultRange = document.getElementById("numberOfAdults");
    adultValue = document.getElementById("adultValue");

    adultRange.onchange = function() {
        adultValue.innerText = adultRange.value;
        numberOfAdultsField = adultRange.value;
        //alert(numberOfAdultsField);

    }






    //** number of children  **//

    childRange = document.getElementById("numberOfChildren");
    childValue = document.getElementById("childValue");

    childRange.onchange = function() {
        childValue.innerText = childRange.value;
        numberOfChildrenField = childRange.value;
        //alert(numberOfChildrenField);

    }


    activitiesList.onchange = function() {

        var activity = activitiesList.options[activitiesList.selectedIndex].value;
        var activityText = document.getElementById("activityDescription");
        
        switch (activity) {
            case "Swimming" : document.getElementById("logos").src = "swim-logo.png";
                activityText.innerHTML = "There are several swimming baths and we are not to far from the beach at Ayr. \n Open air bathing is also available at \n New Cumnock";
                break;
            case "Climbing" : document.getElementById("logos").src = "Climbing-logo.png";
                activityText.innerHTML = "If you love to climb then why not visit Dont Look Down Climbing School. \n book a session at www.DontLookDown.com";
                break;
            case "Cycling" : document.getElementById("logos").src = "Cycling-logo.png";
                activityText.innerHTML = "Cycling is a bit part of ayshire culture there are cycle routes for all disciplines. \n Visit www.ayrcycle.co.uk ";
                break;
            case "Archery" : document.getElementById("logos").src = "Archery-logo.png";
                activityText.innerHTML = "To try somthing a little different there are local archery classes on site. \n book a lesson at www.ayrchery.biz";
                break;
            case "Falconry" : document.getElementById("logos").src = "Falconry-logo.png";
                activityText.innerHTML = "We are privlidged to be associated with Falconayr , the countries leading falconry school. \n To experience something outstanding visit www.falconayr.co.uk \n mention us and you will get discounted rates.";
                break;
            default : document.getElementById("logos").src = "Tent.png";
                activityText.innerHTML = "There is so much to do, were will your adventure begin.";

        };


    }



    var makeBookingButton = document.getElementById("makeBookingButton");
    var clearBookingButton = document.getElementById("clearBookingButton");
    var cancelBookingButton = document.getElementById("cancelBookingButton");
    var editBookingButton = document.getElementById("editBookingButton");
    var commentButton = document.getElementById("commentButton");









    makeBookingButton.onclick = pressMakeBookingButton;           // if ok button pressed call the pressMakeBookingButton function

    clearBookingButton.onclick = clearUI;

    cancelBookingButton.onclick = pressCancelBookingButton;                 // if cancel button is pressed call the pressCancelBookingButton function

    commentButton.onclick = pressCommentButton;

    editBookingButton.onclick = pressEditBookingButton;

    //setInterval(checkSchedule,6000);            // set the time in milliseconds to check the appointments.
};

// ****** showTable funtion ******


// Sets up table headings and will display appointmets array in table format.

var showTable = function(){
    var tableDiv = document.getElementById("bookingsTable"), tableEntry;

    var table = "<table border='3' align='center'>" + "<thead><th>Name</th><th>Accommodation</th><th>Arival Date</th><th>Number of nights</th><th>Total Cost</th></thead>"


    for(var i=0, j=bookings.length; i<j; i++){
        var currentBooking = bookings[i];

        table += "<tr>" + "<td>" + currentBooking.getName() + "</td>" + "<td>" + currentBooking.getAccommodation() + "</td>" + "<td>" + currentBooking.getArrivalDate() + "</td>" + "<td>" + currentBooking.totalNights + "</td>" + "<td>" + currentBooking.totalCost + "</td>" + "<td>" + "<input type='checkbox' name=bookingCheck value=' '/>" + "</td>" + "</tr>";

    }
    table+="</table>";
    // Now add the table to the page...
    tableDiv.innerHTML = table;
};

var showComments = function() {

    var commentText = document.getElementById("commentText");

    var text = "<td>";


    for (var i = 0, j = comments.length; i < j; i++) {
        var currentComment = comments[i];

        text += currentComment + "</td>" + "<hr>";

    }

    commentText.innerHTML = text;
}
// ****** setInterval funtion ******
// Timer to check if the appointments are past due and also display how many hours until the next appointments.

var checkSchedule = function(){
    for(var i=0; i < bookings.length; i++){
        var appt = bookings[i];

        // alert(i)             // **** TEST CODE *****
        // console.log(appt)    // **** TEST CODE *****
        if(appt.isDue()) {
            alert("Your booking at bemi is  due");
        }
    }






};