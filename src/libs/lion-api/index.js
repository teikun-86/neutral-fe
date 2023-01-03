import { Flight } from "./flight"

export class LionAPI {
    endpoint = ""
    params = {}
    method = "GET"

    flight() {
        return new Flight()
    }
}