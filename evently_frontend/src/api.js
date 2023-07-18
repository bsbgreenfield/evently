import axios from "axios"
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class EventlyApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
    
        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${EventlyApi.token}` };
        const params = (method === "get")
            ? data
            : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }


      static async register(user){
        let res = await this.request(`auth/register`, user, "POST")
        return res.token;
      }

      static async login(user){
        let res = await this.request('auth/token', user, "POST")
        return res.token
      }

      static async updateUser(user){
        const {username} = user
        let res = await this.request(`users/${username}/update`, user, "PATCH")
        return res
      }

    static async deleteUser(user){
        const {username} = user
        let res = await this.request(`users/${username}/delete`, user, "DELETE")
        return res
    }

      static async getUser(username){
        let res = await this.request(`users/${username}`)
        return res
      }
      
      static async getAllUsers(){
        let res = await this.request(`users`)
        return res
      }

      static async createGroup(group_name){
        let res =  await this.request(`groups/new`,{group_name}, "POST")
        return res
      }

      static async getGroup(group_id){
        let res = await this.request(`groups/${group_id}`)
        return res.group
      }

      static async getAllGroups(){
        let res = await this.request(`groups`)
        return res.groups
      }

      static async joinGroup({username, group_id}){
        let res = await this.request(`groups/${group_id}/join/${username}`, {}, "POST")
        return res
      }

      static async leaveGroup({username, group_id}){
        let res = await this.request(`groups/${group_id}/leave/${username}`, {}, "DELETE")
        return res
      }

      static async createEvent(event){
      
        let res = await this.request(`events`, event, "POST")

        return res
      }

      static async getEventByGroup(group_id){
        let res = await this.request(`events/${group_id}`)
        return res
      }
      static async getEventsByUser(user_id){
        let res = await this.request(`events/user/${user_id}`)
        return res.events
      }
      static async rsvp(rsvpObj){
        const {event_id, username} = rsvpObj
        let res = await this.request(`events/${event_id}/join/${username}`, rsvpObj, "POST")
        return res
      }

      static async unrsvp({event_id, user_id}){
        let res = await this.request(`events/${event_id}/unrsvp/${user_id}`, {}, "DELETE")
        return res
      }

      static async requestMoney(invoice){
        const {requester} = invoice
        let res = await this.request(`users/request/${requester}`, invoice, "POST")
        return res
      }

      static async getTicketmasterRecs(filters){
   
        let res = await this.request(`ticketmaster/events`, filters, "get")
        return res;
      }
}

export default EventlyApi