
// initializes map

let myMap = L.map('map').setView([44.476, -73.212], 15);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
}).addTo(myMap)

// function to retrieve list of restaurant names from my api and add them to sidebar on homepage; also places markers for all restaurants

let listContainer = document.getElementById('resto-list')

async function getMoreRestos() {
    let restoList = await fetch('/api/indexRestaurants.json')
        .then((response) => {
            return response.json()
        }).then((jsonArr) => {
            return jsonArr
        })

    restoList.forEach((resto) => {
        let name = resto.name
        let id = resto.id
        let address = resto.address

        // creates list of restaurant name links and inserts into homepage

        listContainer.innerHTML += `<li><a href='/restaurant-page/${id}' style="text-decoration: none">${name}</a></li>`

        // calls function to place address marker

        placeMarker(address, name, id)

    })
}

getMoreRestos()

// function to place a marker on the map by lat and long coordinates

function placeMarker(address, name, id) {

    fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
        .then(data => {
            return data.json()
        })
        .then((locInfo) => {
            let info = locInfo[0]
            let lat = info.lat
            let long = info.lon

            let thisMarker = L.marker([lat, long]).addTo(myMap).bindPopup(name)
            thisMarker.on('mouseover', () => {
                thisMarker.openPopup()
            })
            thisMarker.on('mouseout', () => {
                thisMarker.closePopup()
            })
            thisMarker.addEventListener('click', () => {
                window.open("/restaurant-page/" + id, '_self')
            })
        })
}
