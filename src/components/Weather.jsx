import React, { useState, useEffect } from "react";
import Search from "./Search";

function Weather() {
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [weatherData, setWeatherData] = useState(null);

	async function fetchWeatherData(place) {
		setLoading(true);
		try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${process.env.REACT_APP_API_KEY}`
			);
			const data = await response.json();
			if (data) {
				setWeatherData(data);
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	}

	function handleSearch() {
		fetchWeatherData(search);
		setSearch("");
	}

	function getCurrentDate() {
		return new Date().toLocaleString("en-us", {
			weekday: "long",
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	}

	useEffect(() => {
		fetchWeatherData("kathmandu");
	}, []);

	if (loading) {
		return <h1>Loading... Please wait</h1>;
	}

	console.log(weatherData);

	return (
		<div className="weather-container">
			<Search
				search={search}
				setSearch={setSearch}
				handleSearch={handleSearch}
			/>

			{weatherData && weatherData.cod === 200 ? (
				<div className="weather-data">
					<div className="city-name">
						<h2>
							{weatherData.name},{weatherData.sys.country}
						</h2>
					</div>
					<div className="date">
						<p>{getCurrentDate()}</p>
					</div>
					<div className="temp">{weatherData.main.temp} K</div>
					<p className="description">
						{weatherData &&
						weatherData.weather &&
						weatherData.weather[0]
							? weatherData.weather[0].description
							: ""}
					</p>
					<div className="longitude-latitude">
						<p>Longitude: {weatherData.coord.lon}&#176;</p>
						<p>Latitude: {weatherData.coord.lat}&#176;</p>
					</div>
					<div className="weather-info">
						<div className="column">
							<p className="wind">
								Wind Speed: {weatherData.wind.speed}
							</p>
						</div>
						<div className="column">
							<p className="humidity">
								Humidity: {weatherData.main.humidity}
							</p>
						</div>
					</div>
				</div>
			) : (
				<div>Sorry, No weather data found</div>
			)}
		</div>
	);
}

export default Weather;
