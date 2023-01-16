import { axios } from "../axios"

export class Cart
{
    prefix = "/cart/"
    params = {
        id: ""
    }
    method = "GET"
    endpoint = ""

    constructor(endpoint = "", method = "GET", params = {}) {
        this.params = params
        this.endpoint = endpoint
        this.method = method
    }

    id(id) {
        this.params.id = id
        return this
    }

    async get() {
        this.endpoint = this.params.id
        return await this.__send()
    }

    async prebook(data) {
        this.endpoint = `${this.params.id}/prebook`
        this.method = "POST"
        this.params = {
            id: this.params.id,
            ...data
        }
        return (await this.__send())
    }

    async add(data) {
        this.endpoint = "store"
        this.method = "POST"
        this.params = data
        return (await this.__send()).cart
    }

    async __send() {
        return await axios({
            method: this.method,
            url: `${this.prefix}${this.endpoint}`,
            data: this.params
        }).then(res => res.data).catch(err => {
            console.log({err});
            return err.response.data
        })
    }
}