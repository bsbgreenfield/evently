const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../ExpressError");

const app = require("../app");
const axios = require("axios")
class ticketmaster {

    static async getEvent(filters={}){
        if (Object.keys(filters).length){
            let resp = await axios.get(
                `https://app.ticketmaster.com/discovery/v2/events.json?apikey=HvNIrvNLdMohr3FrpiGwNSXfqrvjAN8n`,
                {params: filters})
                
            return resp.data;
        }
       else{
        let resp = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=HvNIrvNLdMohr3FrpiGwNSXfqrvjAN8n`)
        
        return resp.data;
       }
    }

}

module.exports = ticketmaster;