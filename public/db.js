// const getLoc = require('../functions')
// import getLoc from '../functions'

var componentType = document.getElementById("type");
var quant = document.getElementById("quant");
var submit = document.getElementById("sub");
var id = document.getElementById('componentId')
var company = document.getElementById('company')
var bod = document.getElementById('bgcolor')
var loading = document.getElementById('loading')
var comments = document.getElementById('comments')
const lati = document.getElementById('latitude')
const longi = document.getElementById('longitude')
const url = "https://ipinfo.io/?token=425707346e742c"

const database = firebase.firestore();
const storage = firebase.storage().ref()

submit.addEventListener("click", async e => {
    e.preventDefault();
    await getLoc(url)
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
                    // lati: lati.value,
                    // longi: longi.value
                },{merge: true})    
                
            } catch (error) {
                console.log(error)
            }
            // .catch(e => console.log(e))
        })
        .then(() => {
            console.log('form data uploaded')
            fetch("https://ipinfo.io/?token=425707346e742c", {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
                }
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
        // console.log(b64)
        // window.location.replace(`/${id.value}/about/${componentType.value}/${company.value}`)
        // console.log(thisChild.fullPath)
    })
    .then(() => {
        
    })
    .catch(error => console.log(error))
})

function locate() {

    function success(position) {
        lati.value = position.coords.latitude
        longi.value = position.coords.longitude
        const para = document.getElementById('locVal')
        para.innerHTML = `Latitude ${lati.value} and Longitude ${longi.value}`
        console.log(lati, longi)
    }

    function error() {
        alert('Unable to get your location, Please try later!')
    }

    if(!navigator.geolocation) {
        alert('Geolocation not supported!, Please try with a different browser (Chrome) or use a different device!')
    } else {
        navigator.geolocation.getCurrentPosition(success,error)
    }
}

document.getElementById('locate').addEventListener('click', locate)