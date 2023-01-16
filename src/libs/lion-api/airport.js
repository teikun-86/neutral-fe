import { axios } from "@/libs/axios"

export class Airport {
    prefix = "/airports/"
    params = {}
    method = "GET"
    endpoint = ""
    
    constructor(endpoint = "", method = "GET", params = {}) {
        this.params = params
        this.endpoint = endpoint
        this.method = method
    }
    
    intl() {
        this.params.intl = true
        return this
    }
    
    iata(iata) {
        this.params.iata = iata
        return this
    }

    search(keyword) {
        this.params.search = keyword
        return this
    }

    country(country) {
        this.params.country = country
        return this
    }

    city(city) {
        this.params.city = city
        return this
    }

    limit(limit) {
        this.params.limit = limit
        return this
    }

    offset(offset) {
        this.params.offset = offset
        return this
    }

    sort(sort) {
        this.params.sort = sort
        return this
    }

    order(order) {
        this.params.order = order
        return this
    }

    async get() {
        this.endpoint = ""

        return await axios.get(`${this.prefix}${this.endpoint}`, {
            params: this.params
        }).then(res => res.data.airports)
    }

    async first() {
        this.endpoint = ""
        
        let airport = await axios.get(`${this.prefix}${this.endpoint}`, {
            params: this.params
        }).then(res => res.data.airports)

        return airport.length > 0 ? airport[0] : null
    }
}