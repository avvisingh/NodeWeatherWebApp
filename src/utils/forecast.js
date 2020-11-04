const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fd3c54825cce63d01a89fbae69ceb98f&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Cannot connect to Weather forecasting services', undefined);
        } else if (body.error) {
            callback('Unable to find the location', undefined);
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                currentTemperature: body.current.temperature,
                currentFeelsLike: body.current.feelslike
            });
        }
    });
};

module.exports = forecast;