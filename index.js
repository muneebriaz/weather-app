const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = "869209b95a648aa01d5de2d60946b42e"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index')
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    request(url, function (err, response, body) {
        console
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body)
            console.log(weather)
            if (weather.main == undefined) {
                res.render('index', { hasData: false, weather: null, error: 'Error, please try again' });
            } else {
                let weatherDetails = {
                    city: weather.name,
                    temprature: weather.main.temp.toFixed(),
                    wind: weather.wind.speed,
                    humidity: weather.main.humidity,
                }
                res.render('index', { hasData: true, weatherDetails, error: null });
            }
        }
    });
})

app.listen(3000, function () {
    console.log('Weather app listening on port 3000!')
})