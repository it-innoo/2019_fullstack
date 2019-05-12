import axios from 'axios'

const endpoint = 'https://restcountries.eu/rest/v2/all'

const getAll = () => {
    const request = axios.get(endpoint)
    return request.then(response => response.data)
}

export default getAll
