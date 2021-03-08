import axios from "axios"
import dotenv from "dotenv"
import fs from "fs"
dotenv.config()


const baseURL = "https://api.thecatapi.com/v1"
const breedConfig = {
    baseURL: baseURL,
    headers: {
        "x-api-key": process.env.CAT_API_KEY
    }
}

let breeds;
let categories = []
axios.get("/breeds", breedConfig)
    .then(res => {
        breeds = res.data
        breeds.forEach(({ temperament }) => {
            let temps = temperament.split(", ")
            temps.forEach(temp => {
                if (!categories.includes(temp)) categories.push(temp)
            })
        })
        return breeds
    })
    .then(
        breeds => {
            fs.writeFileSync("./breeds.json", JSON.stringify(breeds))
            fs.writeFileSync("./categories.json", JSON.stringify(categories))
        }
    )
    .catch(err => console.log(err.message))





