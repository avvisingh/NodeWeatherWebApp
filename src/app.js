const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { createSecretKey } = require('crypto');
const { setMaxListeners } = require('process');


const app = express(); //Express library returns a single function which, as we've done here, we need to call to create a new express application.
//The express function doesn't take in any arguments. Instead, we configure our server using various methods provided on the application itself.

const port = process.env.PORT || 3000; //PORT is provided by Heroku. We use '||' as a fallback incase we want to run locally.
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Avvi Singh'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Avvi Singh'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'God helps those who help themselves!',
        name: 'Avvi Singh'
    })
});


app.get('/weather', (req, res) => {
    var searchLocation = req.query.address;

    if (!searchLocation) {
        return res.send({
            error: 'You need to provide an address'
        });
    }

    geocode(searchLocation, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            }); //We use 'return' here as 'return' will stop the execution of the function there after console logging the error message
        }

        forecast(latitude, longitude, (error, { description, currentTemperature, currentFeelsLike } = {}) => {

            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                Address: searchLocation,
                location,
                Description: description,
                Temperature: currentTemperature,
                Feels_Like: currentFeelsLike
            });

        });
    });


});

app.get('/products', (req, res) => {
    if (!req.query.search) { //The point of this 'if' statement is to ensure that a 'search' key is provided in the query string
        return res.send({ //We need to add return here otherwise the below 'res.send' will also run and you CANNOT have two responses to one request
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        message: 'The help article you were looking for could not be located.',
        name: 'Avvi Singh'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        message: 'Page Not Found',
        name: 'Avvi Singh'
    })
});

app.listen(port, () => {
    console.log('Server is up on port ' + port); //This message will never display to someone in the browser
})