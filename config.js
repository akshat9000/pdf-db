const PORT = 5000 || process.env.PORT
const HOST = 'localhost'
const HOST_URL = 'http://localhost:' + PORT
const API_KEY = "AIzaSyDXqiBHQggKFDDJQF5yJ24YJR5RI9M_UD8"
const AUTH_DOMAIN = "innate-might-285613.firebaseapp.com"
const PROJECT_ID = "innate-might-285613"
const STORAGE_BUCKET = "gs://innate-might-285613.appspot.com"
const MESSAGE_SENDER = "735355390056"
const API_ID = "1:735355390056:web:a97d898e81477e9d5c53dd"

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig : {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGE_SENDER,
        appId: API_ID
    }
}