const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b3730e017bedf3888d25ac4e1d3b3426&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'
    
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services.')
        } else if (body.error) {
            callback('Unable to find location. Please try another search.')
        } else {
            const temperature = body.current.temperature
            const feelsLike = body.current.feelslike
            const description = body.current.weather_descriptions[0]
        
            callback(undefined, `${description}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out.`)
        }
    })
}

module.exports = forecast