
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
var messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //preventDefault, here, is going to prevent the page automatically refreshing after eah time we click 'submit'

    const location = encodeURIComponent(search.value);
    const queryURL = 'http://localhost:3000/weather?address=' + location;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(queryURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = ('Uh Oh!');
                messageTwo.textContent = data.error;
            } else {
                console.log(data);
                messageOne.textContent = data.location;
                messageTwo.textContent = ('The current weather conditions are ' + data.Description + '. The current temperature is ' + data.Temperature + ' and it feels like ' + data.Feels_Like + '.');
            }
        });
    });

    console.log(location);
})