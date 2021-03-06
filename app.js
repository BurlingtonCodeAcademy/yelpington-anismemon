const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000

app.use(express.static('public'))

app.get('/restaurant-page/:id', (request, response) => {
    response.sendFile(path.resolve('./public/restaurant-page.html'))
})

app.listen(PORT, () => { console.log(`Running on port: ${PORT}`) })
