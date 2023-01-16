import { Airport } from "./airport"
import { Cart } from "./cart"
import { Flight } from "./flight"

export class LionAPI {
    endpoint = ""
    params = {}
    method = "GET"
    env = process.env.NODE_ENV ?? "development"

    flight() {
        return new Flight("", "GET", {}, this.__cred())
    }

    __cred() {
        return {
            "key": this.env === "development" ? process.env.TEST_BACKEND_KEY : process.env.PROD_BACKEND_KEY,
            "secret": this.env === "development" ? process.env.TEST_BACKEND_SECRET : process.env.PROD_BACKEND_SECRET
        }
    }

    airport() {
        return new Airport()
    }

    cart() {
        return new Cart()
    }
}