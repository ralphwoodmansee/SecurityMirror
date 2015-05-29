jQuery.fn.updateWithText = function(text, speed)
{
	var dummy = $('<div/>').html(text);

	if ($(this).html() != dummy.html())
	{
		$(this).fadeOut(speed/2, function() {
			$(this).html(text);
			$(this).fadeIn(speed/2, function() {
				//done
			});
		});
	}
}

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

function roundVal(temp)
{
	return Math.round(temp);
}

function kmh2beaufort(kmh)
{
	var speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
	for (var beaufort in speeds) {
		var speed = speeds[beaufort];
		if (speed > kmh) {
			return beaufort;
		}
	}
	return 12;
}

jQuery(document).ready(function($) {

	var news = [];
	var newsIndex = 0;

	var eventList = [];

	var lastCompliment;
	var compliment;

    moment.lang(lang);

	//connect do Xbee monitor
	// var socket = io.connect('http://rpi-alarm.local:8082');
	// socket.on('dishwasher', function (dishwasherReady) {
	// 	if (dishwasherReady) {
	// 		$('.dishwasher').fadeIn(2000);
	// 		$('.lower-third').fadeOut(2000);
	// 	} else {
	// 		$('.dishwasher').fadeOut(2000);
	// 		$('.lower-third').fadeIn(2000);
	// 	}
	// });


	(function checkVersion()
	{
		$.getJSON('githash.php', {}, function(json, textStatus) {
			if (json) {
				if (json.gitHash != gitHash) {
					window.location.reload();
					window.location.href=window.location.href;
				}
			}
		});
		setTimeout(function() {
			checkVersion();
		}, 3000);
	})();

	(function updateTime()
	{
        var now = moment();
        var date = now.format('LLLL').split(' ',4);
        date = date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3];

		$('.date').html(date);
		$('.time').html(now.format('h') + ':' + now.format('mm') + '<span class="ampm">'+now.format('A')+'</span>' + '<span class="sec">'+now.format('ss')+'</span>');
		$('.second').html(now.format('ss'));

		setTimeout(function() {
			updateTime();
		}, 1000);
	})();

	
//	(function updateCompliment()
//	{
//        //see compliments.js
//		while (compliment == lastCompliment) {
//     
//      //Check for current time  
//      var compliments;
//      var date = new Date();
//      var hour = date.getHours();
//      //set compliments to use
//      if (hour >= 3 && hour < 12) compliments = morning;
////      if (hour >= 12 && hour < 17) compliments = afternoon;
//      if (hour >= 17 || hour < 3) compliments = evening;
//
//		compliment = Math.floor(Math.random()*compliments.length);
//		}
//
//		$('.compliment').updateWithText(compliments[compliment], 4000);
//
//		lastCompliment = compliment;
////
//		setTimeout(function() {
//			updateCompliment(true);
//		}, 30000);
//
//	})();

	(function updateWeather()
	{
		var iconTable = {
			'01d':'wi-day-sunny',
			'02d':'wi-day-cloudy',
			'03d':'wi-cloudy',
			'04d':'wi-cloudy-windy',
			'09d':'wi-showers',
			'10d':'wi-rain',
			'cloudy':'wi-thunderstorm',
			'13d':'wi-snow',
			'50d':'wi-fog',
			'01n':'wi-night-clear',
			'02n':'wi-night-cloudy',
			'03n':'wi-night-cloudy',
			'04n':'wi-night-cloudy',
			'09n':'wi-night-showers',
			'10n':'wi-night-rain',
			'11n':'wi-night-thunderstorm',
			'13n':'wi-night-snow',
			'50n':'wi-night-alt-cloudy-windy'
		}

		$.getJSON('http://api.wunderground.com/api/1ca3f207343e6548/conditions/q/CA/San_Diego.json', function(json, textStatus) {

			var temp = roundVal(json.current_observation.temp_f);
			//var temp = roundVal(json.main.temp);
			//var temp_min = roundVal(json.main.temp_min);
			//var temp_max = roundVal(json.main.temp_max);

			//var wind = roundVal(json.wind.speed*2.237);

			var iconClass = iconTable[json.current_observation.icon];
			var icon = $('<span/>').addClass('icon').addClass('dimmed').addClass('wi').addClass(iconClass);
			//$('.currenttemp').updateWithText(+temp+'&deg;', 1000);
			$('.currenttemp').updateWithText(icon.outerHTML()+temp+'&deg;', 1000);

			// var forecast = 'Min: '+temp_min+'&deg;, Max: '+temp_max+'&deg;';
			// $('.forecast').updateWithText(forecast, 1000);

			//var now = moment();
			//var sunrise = moment(json.sys.sunrise*1000);
			//var sunset = moment(json.sys.sunset*1000);

			//var now = new Date();
			//var nowunix = now.getTime();
			//var sunrise = new Date(json.sys.sunrise*1000).toTimeString().substring(0,5);
			//var sunset = new Date(json.sys.sunset*1000).toTimeString().substring(0,5);
			//console.log(nowunix);
			//var windString = '<span class="wi wi-strong-wind xdimmed"></span> ' + wind ;
			//var sunString = '<span class="wi wi-sunrise xdimmed"></span> ' + moment(sunrise).format("h:mm a"); + " am";
			//if (sunrise < now && sunset > now) {
			//	sunString = '<span class="wi wi-sunset xdimmed"></span> ' + moment(sunset).format("h:mm a"); + " pm";
			//}

//			if (json.sys.sunrise*1000 < nowunix && json.sys.sunset*1000 > nowunix) {
//				sunString = '<span class="wi wi-sunset xdimmed"></span> ' + sunset + " pm";
//			}
			//console.log(json.sys.sunrise*1000 < nowunix && json.sys.sunset*1000 > nowunix);
			//console.log(json.sys.sunset*1000);
			//var windString = '<span class="wi wi-strong-wind xdimmed"></span> ' + kmh2beaufort(wind);
			//var sunString = '<span class="wi wi-sunrise xdimmed"></span> ' + sunrise.format("LT");
			//if (sunrise < now && sunset > now) {
			//	sunString = '<span class="wi wi-sunset xdimmed"></span> ' + sunset.format("LT");
			//}

			//$('.windsun').updateWithText(windString+' '+sunString, 1000);
		});

		setTimeout(function() {
			updateWeather();
		}, 300000);
	})();
	
	
	
	(function updateCurrentWeather()
	{
		var iconTable = {
			'01d':'wi-day-sunny',
			'02d':'wi-day-cloudy',
			'03d':'wi-cloudy',
			'04d':'wi-cloudy-windy',
			'09d':'wi-showers',
			'10d':'wi-rain',
			'11d':'wi-thunderstorm',
			'13d':'wi-snow',
			'50d':'wi-fog',
			'01n':'wi-night-clear',
			'02n':'wi-night-cloudy',
			'03n':'wi-night-cloudy',
			'04n':'wi-night-cloudy',
			'09n':'wi-night-showers',
			'10n':'wi-night-rain',
			'11n':'wi-night-thunderstorm',
			'13n':'wi-night-snow',
			'50n':'wi-night-alt-cloudy-windy'
		}


		$.getJSON('http://api.openweathermap.org/data/2.5/weather', weatherParams, function(json, textStatus) {

			var temp = roundVal(json.main.temp);
			var temp_min = roundVal(json.main.temp_min);
			var temp_max = roundVal(json.main.temp_max);

			var wind = roundVal(json.wind.speed*2.237);

			var iconClass = iconTable[json.weather[0].icon];
			var icon = $('<span/>').addClass('icon').addClass('dimmed').addClass('wi').addClass(iconClass);
			$('.temp').updateWithText(icon.outerHTML()+temp+'&deg;', 1000);
			//$('.tempnew').updateWithText(+temp+'&deg;', 1000);

			// var forecast = 'Min: '+temp_min+'&deg;, Max: '+temp_max+'&deg;';
			// $('.forecast').updateWithText(forecast, 1000);

			var now = moment();
			var sunrise = moment(json.sys.sunrise*1000);
			var sunset = moment(json.sys.sunset*1000);

			//var now = new Date();
			//var nowunix = now.getTime();
			//var sunrise = new Date(json.sys.sunrise*1000).toTimeString().substring(0,5);
			//var sunset = new Date(json.sys.sunset*1000).toTimeString().substring(0,5);
			//console.log(nowunix);
			var windString = '<span class="wi wi-strong-wind xdimmed"></span> ' + wind ;
			var sunString = '<span class="wi wi-sunrise xdimmed"></span> ' + moment(sunrise).format("h:mm a"); + " am";
			if (sunrise < now && sunset > now) {
				sunString = '<span class="wi wi-sunset xdimmed"></span> ' + moment(sunset).format("h:mm a"); + " pm";
			}

//			if (json.sys.sunrise*1000 < nowunix && json.sys.sunset*1000 > nowunix) {
//				sunString = '<span class="wi wi-sunset xdimmed"></span> ' + sunset + " pm";
//			}
			//console.log(json.sys.sunrise*1000 < nowunix && json.sys.sunset*1000 > nowunix);
			//console.log(json.sys.sunset*1000);
			//var windString = '<span class="wi wi-strong-wind xdimmed"></span> ' + kmh2beaufort(wind);
			//var sunString = '<span class="wi wi-sunrise xdimmed"></span> ' + sunrise.format("LT");
			//if (sunrise < now && sunset > now) {
			//	sunString = '<span class="wi wi-sunset xdimmed"></span> ' + sunset.format("LT");
			//}

			$('.windsun').updateWithText(windString+' '+sunString, 1000);
		});

		setTimeout(function() {
			updateCurrentWeather();
		}, 60000);
	})();

	(function updateWeatherForecast()
	{
		var iconTable = {
			'01d':'wi-day-sunny',
			'02d':'wi-day-cloudy',
			'03d':'wi-cloudy',
			'04d':'wi-cloudy-windy',
			'09d':'wi-showers',
			'10d':'wi-rain',
			'11d':'wi-thunderstorm',
			'13d':'wi-snow',
			'50d':'wi-fog',
			'01n':'wi-night-clear',
			'02n':'wi-night-cloudy',
			'03n':'wi-night-cloudy',
			'04n':'wi-night-cloudy',
			'09n':'wi-night-showers',
			'10n':'wi-night-rain',
			'11n':'wi-night-thunderstorm',
			'13n':'wi-night-snow',
			'50n':'wi-night-alt-cloudy-windy'
		}
			$.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily', weatherParams, function(json, textStatus) {

			var forecastData = {};


			//console.log(json.cnt);
			var forecastTable = $('<table />').addClass('forecast-table');
			for (var i in json.list) {
				if (i==0){continue;}
				var forecast = json.list[i];			
				var icon = forecast.weather[0].icon;
				//console.log(forecast.dt);
				var temp_min = forecast.temp.min;
				var temp_max = forecast.temp.max;
				var timestamp = forecast.dt * 1000;


				var opacity = 1;
			    var iconClass = iconTable[icon];
				var dt = new Date(timestamp);
				var row = $('<tr />').css('opacity', opacity);

				row.append($('<td/>').addClass('day').html(moment.weekdaysShort(dt.getDay())));
				row.append($('<td/>').addClass('icon-small').addClass(iconClass));
				row.append($('<td/>').addClass('temp-max').html(roundVal(temp_max)));
				row.append($('<td/>').addClass('temp-min').html(roundVal(temp_min)));

				forecastTable.append(row);
				//opacity -= 0.155;
			}


			$('.forecast').updateWithText(forecastTable, 1000);
		});

		setTimeout(function() {
			updateWeatherForecast();
		}, 60000);
	})();

	(function fetchNews() {
		$.feedToJson({
			feed: feed,
			success: function(data){
				news = [];
				for (var i in data.item) {
					var item = data.item[i];
					//news.push(item.description);
					news.push(item.title);
				}
			}
		});
		setTimeout(function() {
			fetchNews();
		}, 900000);
	})();

	(function showNews() {
		var newsItem = news[newsIndex];
		$('.news').updateWithText(newsItem,2000);

		newsIndex--;
		if (newsIndex < 0) newsIndex = news.length - 1;
		setTimeout(function() {
			showNews();
		}, 10000);
	})();

});
