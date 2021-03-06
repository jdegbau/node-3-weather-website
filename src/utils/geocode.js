const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamRlZ2JhdSIsImEiOiJja3VhbDN6d2IwaHVoMnhubmM2M2hoczVsIn0.84uSF8qSlXsMk2fNExIY6Q&language=en&limit=1&types=country,region,postcode,district,place,locality,neighborhood'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services.')
        } else if (!body.features.length) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode