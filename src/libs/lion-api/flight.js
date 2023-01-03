import { axios } from "../axios"

export class Flight {
    prefix = "flight/"
    params = {
        DepartureAirport: "",
        ArrivalAirport: "",
        DepartureDate: new Date(),
        ArrivalDate: new Date(),
        DirectionInd: "OneWay",
        returnDate: null,
        Adult: 1,
        Children: 0
    }
    method = "GET"
    endpoint = ""
    
    constructor(endpoint = "", method = "GET", params = {}) {
        this.params = params
        this.endpoint = endpoint
        this.method = method
    }
    
    departure(airport) {
        this.params.DepartureAirport = airport
        return this
    }

    arrival(airport) {
        this.params.ArrivalAirport = airport
        return this
    }

    roundTrip() {
        this.params.DirectionInd = "Round"
        return this
    }

    oneWayTrip() {
        this.params.DirectionInd = "OneWay"
        return this
    }

    departureDate(date) {
        this.params.DepartureDate = date
        this.params.ArrivalDate = date
        return this
    }

    returnDate(date) {
        this.params.returnDate = date
        return this
    }
    
    adult(pax = 1) {
        this.params.Adult = pax
        return this
    }

    children(pax = 0) {
        this.params.Children = pax
        return this
    }

    async get() {
        this.endpoint = ""

        console.log({
            params: this.params
        });
        
        return await axios.post(`${this.prefix}${this.endpoint}`, this.params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => res.data.data).catch(err => {
            console.log({err});
        })
    }
}