
// gets restaurant id from pathname

let path = window.location.pathname

let pathArray = path.split('/') // gets the id number which is the last part of the file path (after /)

let id = pathArray.pop()

// other variables from HTML

let comments = document.getElementById('comments')

let restaurantInfo = document.getElementById('restaurant-info')

let button = document.getElementById('button')
let message = document.getElementById('feedback')

let savedComments

// function to add inputted comments to comment space

button.addEventListener('click', function () {
	populateStorage()
	retrieveSavedComments()
	console.log(localStorage.notes)
	console.log(savedComments)
	comments.innerHTML += `<li style='padding-top: 1vh; list-style-type: none'>"${savedComments}"</li>`
	message.value = ""

})

// button.addEventListener('click', function () {
// 	comments.innerHTML += `<li style='padding-top: 1vh; list-style-type: none'>"${message.value}"</li>`
// 	message.value = ""

// })

// function to retrieve from database all info concerning the restaurant

// async function getRestoInfo() {
// 	let restaurant = await fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants/' + id)
// 		.then((response) => {
// 			return response.json()
// 		}).then((jsonObj) => {
// 			return jsonObj

// 		})
// 	// initializing variables for info to be added to sidebar on restaurant page

// 	let name = restaurant.name
// 	let address = restaurant.address
// 	let phone = restaurant.phone
// 	let website = restaurant.website
// 	let hours = restaurant.hours
// 	let notes = restaurant.notes

// 	// checks for missing information 

// 	if (!restaurant.hasOwnProperty('hours')) {
// 		hours = 'No hours available'
// 	}

// 	if (!restaurant.hasOwnProperty('website')) {
// 		website = ''
// 	}

// 	// adds restaurant info to restaurant page

// 	restaurantInfo.innerHTML = `<li><p style='font-size: 3vh; text-decoration: underline'>${name}</p></li><li><p>${address}</p></li><li><p>802-${phone}</p></li><li><a href='${website}'>${website}</a></li><li><p>${hours}</p></li>`

// 	// iterates over notes array and adds each comment to the comments box

// 	notes.forEach((note) => {
// 		comments.innerHTML += `<li style='padding-top: 1vh; list-style-type: none'>"${note}"</li>`
// 	})

// 	// adds restaurant name to page title

// 	let title = document.getElementById('title')

// 	title.innerHTML = name

// 	// calls placeMarker function

// 	placeMarker(address, name)
// }

// getRestoInfo()

// function to retrieve restaurant info from my api

async function getMoreRestoInfo() {
	let restaurant = await fetch('/api/' + id + '.json')
		.then((response) => {
			return response.json()
		}).then((jsonObj) => {
			return jsonObj

		})
	// initializing variables for info to be added to sidebar on restaurant page

	let name = restaurant.name
	let address = restaurant.address
	let phone = restaurant.phone
	let website = restaurant.website
	let hours = restaurant.hours
	let notes = restaurant.notes

	// checks for missing or aberrant information 

	if (!restaurant.hasOwnProperty('hours')) {
		hours = 'No hours available'
	}

	if (!restaurant.hasOwnProperty('website')) {
		website = ''
	}
	if (phone.length <= 8) {
		phone = "802-" + phone
	}
// 
	// adds restaurant info to restaurant page

	restaurantInfo.innerHTML = `<li><p style='font-size: 3vh; text-decoration: underline'>${name}</p></li><li><p>${address}</p></li><li><p>${phone}</p></li><li><a href='${website}' target="_blank">${website}</a></li><li><p>${hours}</p></li>`

	// iterates over notes array and adds each comment to the comments box

	notes.forEach((note) => {
		comments.innerHTML += `<li style='padding-top: 1vh; list-style-type: none'>"${note}"</li>`
	})

	// adds restaurant name to page title

	let title = document.getElementById('title')

	title.innerHTML = name

	// calls placeMarker function

	placeMarker(address, name)

}

getMoreRestoInfo()


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

			// inserts map and focuses in on specific location by retrieved lat and long coordinates

			let myMap = L.map('map').setView([lat, long], 17);

			L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
				maxZoom: 19,
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
			}).addTo(myMap)

			// places a marker at restaurant location

			let thisMarker = L.marker([lat, long]).addTo(myMap).bindPopup(name)
			thisMarker.on('mouseover', () => {
				thisMarker.openPopup()
			})
			thisMarker.on('mouseout', () => {
				thisMarker.closePopup()
			})
		})
}

// function to store feedback and repopulate comments section

function populateStorage() {
	localStorage.setItem('notes', message.value)
}

function retrieveSavedComments() {
	savedComments = localStorage.getItem('notes')
}


