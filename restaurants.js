// map

let myMap = L.map('map').setView([44.477, -73.212], 15);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
}).addTo(myMap)

// get restaurant id from pathname

let path = window.location.pathname

let pathArray = path.split('/') // gets the id number which is the last part of the file path (after /)

let id = pathArray.pop()

console.log(id)

// function to retrieve from database all info concerning the restaurant

async function getRestoInfo() {
	let restaurant = await fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants/' + id)
		.then((response) => {
			return response.json()
		}).then((jsonObj) => {
			return jsonObj

		})

	let name = restaurant.name
	console.log(restaurant.name)
	let address = restaurant.address
	let phone = restaurant.phone
	let website = restaurant.website
	let hours = restaurant.hours
	let notes = restaurant.notes

	let comments = document.getElementById('comments')

	// iterates over notes array and adds each comment to the comments box

	notes.forEach((note) => {
		comments.innerHTML += `<li style='padding-top: 1vh'>"${note}"</li>`
	})

	//let sidebar = document.getElementById('sidebar')
	
	let restaurantInfo = document.getElementById('restaurant-info')

	if (hours = 'undefined') {
		hours = 'No hours available'
	}

	restaurantInfo.innerHTML = `<li><p style='font-size: 4vh; text-decoration: underline'>${name}</p></li><li><p>${address}</p></li><li><p>802-${phone}</p></li><li><a href='${website}'>${website}</a></li><li><p>${hours}</p></li>`

	
	placeMarker(address, name)
}

getRestoInfo()



console.log('Hi')

// function to place a marker on the map by lat and long coordinates

function placeMarker(address, name) {

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
		})

}

//placeMarker("163 Main St. Burlington, VT 05401")

