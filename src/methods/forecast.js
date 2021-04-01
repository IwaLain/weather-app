const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,daily,alerts&units=metric&appid=4200e02031ad31ba70b9a5f2492c7d31`
    
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Weather service is not available.', undefined)
        } else if (body.cod) {
            callback('Wrong coordinates. Try another.', undefined)
        } else {
            callback(undefined, `${body.hourly[0].weather[0].main}. Forecast for next hour: ${(body.hourly[0].temp).toPrecision(3)} degrees. Feels like ${(body.hourly[0].feels_like).toPrecision(3)}.`)
        }
    })
}

module.exports = forecast