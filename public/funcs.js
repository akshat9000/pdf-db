var componentType = document.getElementById("type");
var quant = document.getElementById("quant");
var submit = document.getElementById("sub");
var id = document.getElementById('componentId')
var company = document.getElementById('company')
var bod = document.getElementById('bgcolor')
var loading = document.getElementById('loading')
var comments = document.getElementById('comments')
var lati = document.getElementById('latitude')
var longi = document.getElementById('longitude')

// const url = "https://ipinfo.io/json?token=425707346e742c"
const api_key = "cbe82715b23d411a80baffc422b20426"

var lat2
var long2

const database = firebase.firestore();
const storage = firebase.storage().ref()

_ipgeolocation.getGeolocation(handleResponse, api_key);


submit.addEventListener("click", e => {
    e.preventDefault();
    // alert('somn')
    try {
        // console.log('*******************************')
        // await getLoc(url)
        bod.style['display'] = 'none';
        loading.style['display'] = 'inline-block'
        // const {lat, long} = await locate()
        var thisID = database.collection('Data').doc(id.value)
        // console.log(thisID.id)
        var b64 = document.getElementById('b64').value.split(',')[1]
        let thisChild = storage.child(thisID.id+'.jpg')
        thisChild.putString(b64, 'base64', {contentType:'image/jpg'})
        .then(data => {
            console.log('image stored')
            try {
                thisID.set({
                    date : new Date().toISOString().slice(0, 10),
                    componentType: componentType.value,
                    quantity: parseInt(quant.value),
                    path: thisChild.fullPath,
                    id: id.value,
                    company: company.value.toLowerCase(),
                    comments: comments.value,
                    lati: lat2,
                    longi: long2
                },{merge: true})
                    .then(() => window.location.replace(`/${id.value}/about/${componentType.value}/${company.value}`))    
                    
            } catch (error) {
                console.log(error)
            }
                // .catch(e => console.log(e))
        })
        .catch(error => console.log(error))
    } catch (error) {
        console.log(error)
    }
})


function handleResponse(response) {
    try {
        console.log(response.latitude, response.longitude)
        // alert(response.latitude, response.longitude)
        lati.value = response.latitude
        longi.value = response.longitude
        lat2 = response.latitude
        long2 = response.longitude
        const para = document.getElementById('locVal')
        para.innerHTML = `Latitude ${lati.value} and Longitude ${longi.value}`
        console.log(lati, longi)
    } catch (error) {
        console.log(error)
        alert('Error getting location, please try again or with a different browser!')
    }
}
