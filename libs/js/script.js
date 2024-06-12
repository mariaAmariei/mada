$(document).ready(function() {
	function updateResults(data) {
			console.log("Updating results with data:", data);

			if (data.timezone) {
					let timezoneHTML = `
							<p>Country Code: ${data.timezone.countryCode}</p>
							<p>Country Name: ${data.timezone.countryName}</p>
							<p>Timezone ID: ${data.timezone.timezoneId}</p>
							<p>Time: ${data.timezone.time}</p>
							<p>Sunset: ${data.timezone.sunset}</p>
							<p>Sunrise: ${data.timezone.sunrise}</p>
							<p>Raw Offset: ${data.timezone.rawOffset}</p>
							<p>GMT Offset: ${data.timezone.gmtOffset}</p>
							<p>DST Offset: ${data.timezone.dstOffset}</p>
					`;
					$('#txtTimezone').html(timezoneHTML);
			} else {
					$('#txtTimezone').text("No Data");
			}

			if (data.weatherObservations) {
					let weatherHTML = '';
					data.weatherObservations.forEach(observation => {
							weatherHTML += `<p>Temperature: ${observation.temperature}°C</p>`;
					});
					$('#txtWeather').html(weatherHTML);
			} else {
					$('#txtWeather').text("No Data");
			}

			if (data.neighbourhood) {
					let neighbourhoodHTML = `Neighbourhood: ${data.neighbourhood.name}<br>`;
					neighbourhoodHTML += `City: ${data.neighbourhood.city}<br>`;
					neighbourhoodHTML += `State: ${data.neighbourhood.adminName1}<br>`;
					$('#txtNeighbourhood').html(neighbourhoodHTML);
			} else {
					$('#txtNeighbourhood').text("No Data");
			}
	}

	$('#btnNeighbourhood').click(function() {
			console.log("Neighbourhood button click");
			$.ajax({
					url: "libs/php/getNeighbourhood.php",
					type: 'POST',
					dataType: 'json',
					data: {
							latitude: $('#neighbourhood-latitude').val(),
							longitude: $('#neighbourhood-longitude').val()
					},
					success: function(result) {
							console.log("Neighbourhood result:", result);
							if (result.status.name == "ok") {
									const neighbourhoodData = result.data.neighbourhood;
									updateResults({ neighbourhood: neighbourhoodData });
							}
					},
					error: function(jqXHR, textStatus, errorThrown) {
							console.error("Error:", textStatus, errorThrown);
					}
			});
	});

	$('#btnWeather').click(function() {
			console.log("Weather button click");
			$.ajax({
					url: "libs/php/getWeather.php",
					type: 'POST',
					dataType: 'json',
					data: {
							north: $('#weather-north').val(),
							south: $('#weather-south').val(),
							east: $('#weather-east').val(),
							west: $('#weather-west').val()
					},
					success: function(result) {
							console.log("Weather result:", result);
							if (result.status.name == "ok") {
									const weatherData = result.data.weatherObservations;
									updateResults({ weatherObservations: weatherData });
							}
					},
					error: function(jqXHR, textStatus, errorThrown) {
							console.error("Error:", textStatus, errorThrown);
							console.log("Response Text:", jqXHR.responseText);
					}
			});
	});

	$('#btnTimezone').click(function() {
			console.log("Timezone button click");
			$.ajax({
					url: "libs/php/getTimezone.php",
					type: 'POST',
					dataType: 'json',
					data: {
							latitude: $('#timezone-latitude').val(),
							longitude: $('#timezone-longitude').val()
					},
					success: function(result) {
							console.log("Timezone result:", result);
							if (result.status.name == "ok") {
									const timezoneData = result.data;
									updateResults({ timezone: timezoneData });
							}
					},
					error: function(jqXHR, textStatus, errorThrown) {
							console.error("Error:", textStatus, errorThrown);
					}
			});
	});
});
