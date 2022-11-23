import axios from 'axios'
const baseurl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseurl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseurl, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${baseurl}/${id}`).catch(err => {
    alert(err)
  })
  return request.then(response => response.data)
}

const update = (id, person) => {
  // const person = {
  //   name: newName,
  //   number: newNumber,
  // }
  const request = axios.put(`${baseurl}/${id}`, person).catch(err => {
    alert(err)
  })
  return request.then(response => response.data)
}

export default { getAll, create, remove, update }