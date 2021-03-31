const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./methods/geocode')
const forecast = require('./methods/forecast')

const app = express()
const port = process.env.PORT || 25565


// Paths
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Static dir
app.use(express.static(publicPath))


// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        body: 'Take forecasts for any location.'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.'
    })
})

app.get('/weather', (req, res) => {
    if (req.query.address) {
        // Pull cords by place
        geocode(req.query.address, (cordsError, {latitude, longitude, place} = {}) => {
            if (!cordsError) {
                // Pull forecast by cords
                forecast(latitude, longitude, (forecastError, forecast) => {
                    if (!forecastError) {
                        res.send({
                            forecast,
                            place
                        })
                    }
                    else res.send({ forecastError })
                })
            }
            else res.send({ cordsError })
        })
    } 
    else res.send({
        error: 'No location provided.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page was not found.'
    })
})


// Server
app.listen(port, () => {
    console.log('Server is up.')
})
