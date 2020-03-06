
// fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')

let listContainer = document.getElementById('resto-list')

async function getRestos() {
    let restoList = await fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
        .then((response) => {
            return response.json()
        }).then((jsonArr) => {
            return jsonArr
        })

    restoList.forEach((resto) => {
        let name = resto.name
        let id = resto.id
        
        listContainer.innerHTML += `<li><a href='/restaurant-page/${id}'>${name}</a></li>`
        
    })
}

getRestos()   
