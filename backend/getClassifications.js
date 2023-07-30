const axios = require("axios")
async function getCl() {
    let c = [];
    let resp = await axios.get("https://app.ticketmaster.com/discovery/v2/classifications/genres.json?apikey=HvNIrvNLdMohr3FrpiGwNSXfqrvjAN8n")
    for (let cl of resp.data._embedded.classifications ){
        c.push(cl)
        console.log(cl.segment.name)
    }

    console.log(c)
}
getCl()