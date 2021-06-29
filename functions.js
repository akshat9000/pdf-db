const axios = require('axios')
const url = "https://ipinfo.io/json?token=425707346e742c"

// const loc = async () => {
//     const request = await fetch("https://ipinfo.io/json?token=425707346e742c")
//     const json = await request.json()
    
//     console.log(jsonResponse.ip, jsonResponse.country)
// }

// loc()

axios.get(url)
    .then(data => {
        // return data.json()
        console.log(data.data.loc)
    })
    // .then(loc => {
    //     console.log(loc.ip, loc.country)
    // })
    .catch(e => console.log(e))