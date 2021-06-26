const axios = require('axios')

const getLoc = async (url) => {
    const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
    axios.get(url,{
        headers: {
            'User-Agent': userAgent
        }
    })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

module.exports = getLoc