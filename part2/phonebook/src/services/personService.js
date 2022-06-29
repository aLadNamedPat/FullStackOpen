import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}
const create = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const remove = id => {
    return axios.delete(`http://localhost:3001/persons/${id}`).then( response =>
        {
            console.log('promise fufilled')
            console.log(response.data)
        }
    )
}

const update = (id, newObj) => {
    return axios.put(`http://localhost:3001/persons/${id}`, newObj)
}
export default {getAll, create, remove, update}