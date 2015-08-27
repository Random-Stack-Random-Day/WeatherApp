/* Removes button if you don't support GeoLocation*/
if ("geolocation" in navigator) {
  $('.js-geolocation').show();
} else {
  $('.js-geolocation').hide();
}

/* Finds your Current Location */
$('.js-geolocation').on('click', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude + ',' + position.coords.longitude); //load weather using your lat/lng coordinates
  });
});

$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude + ',' + position.coords.longitude); //load weather using your lat/lng coordinates
  });
});

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      html = '<h2><i class="icon-' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
      html += '<ul><li>' + weather.city + ', ' + weather.region + '</li>';
      html += '<li class="currently">' + weather.currently + '</li>';
      html += '<li>' + weather.alt.temp + '&deg;C</li></ul>';
     
      /*var heatIndex = 
          if (weather.temp <= 40){
            $('.progress').append('<div class="progress-bar progress-bar-info" role-"progressbar" aria-valuenow="')
          }
     */
  //This is how the bar changes color based on temp  
   var declare = ''
   var saying = ''
   if (weather.temp <= 55){
     declare='info'
     saying= "Brr, better bundle up! It's cold out there!"
   } else if (weather.temp <= 70){
     declare='success';
     saying="It's a bit chilly, might I recommend a sweater?";;
   } else if (weather.temp <=80){
     declare='warning';
     saying="It's getting a bit warm outside, but not too bad.";
   } else{
     declare='declare';
     saying="It's gonna be a scorcher! Dress cool!"
   }
   var tempProg = '<div class="progress bar progress-bar-'+declare+'" role="progressbar" aria-valuenow="'+weather.temp+' "aria-valuemin="0" aria-valuemax="100" style="width:'+weather.temp+'%">'+saying+'It\'\s <b>'
   +weather.temp+'&deg;</b>F outside!</p></div>';
     $('.progress').append(tempProg);
      //End Bar Creation
   
   
      
      
      
      
      
  //End Test Area    
if (weather.temp <= 30){
  $('body').css("background", "url('http://www.psdgraphics.com/file/snow-background.jpg')");
} else if (weather.temp <= 60){
  $('body').css("background", "url('http://dreamatico.com/data_images/autumn/autumn-5.jpg')");
}
  else if (weather.temp <= 80){
    $('body').css("background-image", "url('https://s3.amazonaws.com/staticblog.virtualvocations.com/2014/06/Hot-Thermometer.jpg')")
      }
      $("#weather").html(html);
    },
    
    error: function(error) {
      $("#weather").html('<p>' + error + '</p>');
    }
  });
}