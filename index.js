const path = require('path')
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const firebase = require('./fbdb')
// const { getDoc } = require('./functions')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.set('view engine','ejs')

const firestore = firebase.firestore()

const port = process.env.PORT || 5000

const getDoc = async (data, id) => {  
    data.forEach(doc => {
        //     // console.log(doc.id,doc.data())
        // const reqDoc
        var obj = doc.data()
        if(obj.id === id) {
            // console.log(obj)
            return obj
        }
    })
}

app.get('/complaints', (req,res) => {
    res.render('complaints')
})

app.get('/:id/about/:componentType/:company', async (req,res,next) => {
    try{
        let id = req.params.id
        let componentType = req.params.componentType
        let arr = []
        let company = req.params.company.toLowerCase()
        console.log(company)
        // console.log(componentType,company)
        var docRef = await firestore.collection(componentType).where("company","==",company)
        docRef.get()
            .then(docs => {
                try {
                    docs.forEach(doc => {
                        var obj = doc.data()
                        arr.push(obj)
                        console.log('line 52 - pushed')
                    })   

                } catch (error) {
                    console.log(error)
                    res.status(404).send('No such company found in records')
                    console.log('line 57 - no such company')
                    firestore.collection('Data').doc(id).delete()
                        .then(() => console.log('file Deletes'))
                }
            })
            .then(datat => {
                try {
                    const obj2 = arr[0]
                    const pdf = obj2.pdf
                    const video = obj2.video
                    const paraData = obj2.data
                    res.render('about',{id, pdf, video, paraData})
                    console.log('line 69 - try - page rendered')
                } catch (error) {
                    console.log(error)
                    res.status(404).send('Page not found')
                }

            })
            .catch(error => {
                console.log('line 77 - error ',error)
            })
    } catch (error) {
        console.log(error)
        res.status(400).send('Server unresponsive')
    }
})

app.get('/:id', (req,res) => {
    let id = req.params.id
    res.render('index', {id: id})
})

app.get('*',(req,res) => {
    res.send('Enter id in url')
})

app.listen(port, () => console.log(`Listening on port ${port}...`))