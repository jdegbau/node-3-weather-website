const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up Handlebard engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Joshua DeGrasse-Baumann'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Joshua DeGrasse-Baumann'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Joshua DeGrasse-Baumann',
        helpMessage: 'This is a helpful message.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided.'
        })
    }

    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })

        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help page not found',
        name: 'Joshua DeGrasse-Baumann',
        errorMessage: 'Sorry. This help article does not exist.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Joshua DeGrasse-Baumann',
        errorMessage: 'Sorry. This page does not exist.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})