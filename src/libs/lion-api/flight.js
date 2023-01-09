import { axios } from "../axios"

export class Flight {
    prefix = "lionair/flight/"
    params = {
        DepartureAirport: "",
        ArrivalAirport: "",
        DepartureDate: new Date(),
        ArrivalDate: new Date(),
        DirectionInd: "OneWay",
        ReturnDate: null,
        Adult: 1,
        Children: 0,
        Infant: 0,
    }
    method = "GET"
    endpoint = ""
    credentials = {
        "key": "",
        "secret": ""
    }
    
    constructor(endpoint = "", method = "GET", params = {}, credentials = {
        "key": "",
        "secret": ""
    }) {
        this.params = params
        this.endpoint = endpoint
        this.method = method
        this.credentials = credentials
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
        this.params.ReturnDate = date
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

    infant(pax = 0) {
        if (pax > this.params.Adult) {
            throw new Error("Infant must be less than or equal to adult passenger count.")
        }
        
        this.params.Infant = pax
        return this
    }

    async get() {
        this.endpoint = ""
        
        return await axios.post(`${this.prefix}${this.endpoint}?key=${this.credentials.key}&secret=${this.credentials.secret}`, this.__buildParams(), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => res.data.data).catch(err => {
            console.log({err});
        })
    }

    __buildParams() {
        let params = this.params
        return params
    }
}