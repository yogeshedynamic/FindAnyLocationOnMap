var dummylocations = [
    [
    "Dynamic House",
     "<div style='text-align:center'> <img src='https://www.w3schools.com/bootstrap/cinqueterre.jpg' class='img-circle' width='100' height='100'> Plot no. 29, Sub.Major Laxmi Chand Rd, Maruti Udyog, Sector 18, Gurugram, Haryana 122008  <p style='color:blue'> storage house is also availble here</p></div>",
    "28.4828871",
    "77.0679477"
    ],
    [
    "Weil, Gotshal & Manges LLP",
    "767 5th Ave, New York, NY 10153, United States",
    "40.7635883",
    "-73.9745854"
    ],
    [
    "All India Institute of Medical Sciences, Jhajjar Campus",
    "Tehsil Badli, Jhajjar District, Badsa, Haryana 124105, India",
    "28.555286",
    "77.000785"
    ],
    [
    "Girard Avenue",
    "1350 W Girard Avenue 19123",
    "39.9713524",
    "-75.1590360"
    ],
    [
    "Self Storage Warehouse India",
    "Plot No B34/1, Block E Sector 59 Near New Pearl Academy, Noida, Uttar Pradesh 201301, India",
    "28.556",
    "76.7906325"
    ]
    ];

gmarkers = [];

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(39.9995601, -75.1395161),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();


function createMarker(latlng, html) {
    var marker = new google.maps.Marker({
        position: latlng,
        map: map
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(html);
        infowindow.open(map, marker);
    });
    return marker;
}

var gmarkers = [];
function activateLocationsFunctionMaker(title,address,lat,long){
		 
 		 
		var showHtml = title + "<br>" + address;
	 
	    gmarkers[title] = createMarker(new google.maps.LatLng(lat, long), showHtml);
}

function fireLocation(title){
	google.maps.event.trigger(gmarkers[title],'click');
}



//activate location marker (pass locations)

var Locations = [];

function addIntoHtml(html){
	$('#locations').append(html);
}

function locationCollector(title,address,lat,long){
	Locations.push([
    title,
    address,
    lat,
    long
    ]);

	var html = `<div class="result-body">
                   <div class="results-inner">
                   <p class="result-title" onclick="fireLocation('`+title+`')">`+title+`</p>
                   </div>
                </div>`;


    addIntoHtml(html);
    activateLocationsFunctionMaker(title,address,lat,long);

}

function formDataSubmit(e){
	e.preventDefault();

	var title = $('#Title').val();
	var address = $('#Address').val();
	var lat = $('#Lat').val();
	var long = $('#long').val();

	if(!!title && !!address && !!lat && !!long){
		locationCollector(title,address,lat,long);	
		$('.dismiss-modal').click();
	}else{
		alert('Please fill All Fields');
	}



	
}

//for dummy location

function callDemoJSON(){
	 
	for (var i = 0; i < dummylocations.length; i++) {
		locationCollector(dummylocations[i][0],dummylocations[i][1],dummylocations[i][2],dummylocations[i][3]);
	}
}