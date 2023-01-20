import { axios } from "../axios"
import { Airport } from "./airport"

export class Flight {
    prefix = "flight/"
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
        Class: "Economy",
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
        this.params.DirectionInd = "Return"
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
        this.params.ArrivalDate = date
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

    cabinClass(cabinClass) {
        this.params.Class = cabinClass
        return this
    }

    async get() {
        this.endpoint = "search"
        
        return await axios.get(`${this.prefix}${this.endpoint}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            params: this.__buildParams()
        }).then(res => {
            return res.data.flights
        }).catch(err => {
            console.log(err.response.data.message);
        })
    }

    __buildParams() {
        let params = this.params
        return params
    }

    async __buildFlightData(classToShow, flights = {
        Departure: [],
        Return: []
    }) {

        let airports = await new Airport().intl().get()

        const getAirportByIata = (iata) => {
            let res = airports.filter(a => a.airportCode === iata)
            return res.length > 0 ? res[0] : iata
        }

        let dataToShow = [
            "DepartureAirport",
            "ArrivalAirport",
            "DepartureDateTime",
            "ArrivalDateTime",
            "FlightNumber",
            "OperatingAirline",
            "available"
        ]

        const process = (flights) => flights.map(flightGroup => {
            return flightGroup.map(flight => {
                flight.DepartureAirport = getAirportByIata(flight.DepartureAirport)
                flight.ArrivalAirport = getAirportByIata(flight.ArrivalAirport)

                flight.available = flight.BookingClassAvail[0] ?? {}

                let data = {}
                dataToShow.forEach(dt => {
                    data[dt] = flight[dt]
                })


                flight.BookingClassAvail = flight.BookingClassAvail.filter(bca => bca.Class === classToShow).map(bca => {
                    return {
                        ...bca,
                        ...data,
                        availableSeats: Number(bca.ResBookDesigQuantity),
                    }
                })
                return flight
            })
        })
        
        let departures = flights === undefined ? [] : process(flights.Departure)
        let returns = flights === undefined ? [] : process(flights.Return)

        return {
            Departure: departures,
            Return: returns
        }
    }

    async prebook(data) {
        this.endpoint = "prebook"
        this.method = "POST"
        this.params = data

        return await axios.post(`${this.prefix}${this.endpoint}`, this.__buildParams(), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            return res.data
        }).catch(err => {
            console.log({err});
        })
    }
}