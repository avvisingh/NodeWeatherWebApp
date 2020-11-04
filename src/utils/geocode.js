const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXZ2aXNpbmdoIiwiYSI6ImNrZ2l4YjFnMzBhd3kzMnBpNnJxd25uMXgifQ.UyfTNowjHn_ZL1OuGedYug&limit=1';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to locations sercvices', undefined); //We don't actually have to say 'undefined' here for the second argument (data). If we leave it empty, JavaScript will automatically associate it as being undefined.
        } else if (body.features.length === 0) {
            callback('The location you have entered does not exist. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
};

module.exports = geocode;