import axios from "axios"
import { BASE_URL } from "./../constants"

console.log('BASE_URL',BASE_URL)

export default class AxiosWrapper {
  static token = null

  constructor() {
    // AxiosWrapper.retrieveToken()
  }

  static retrieveToken = async () => {
    try {
      this.token = localStorage.getItem("token")
    } catch (e) {
      console.error(e)
    }
  }

  static get = ({ endpoint, page, limit = 10, search, filter }) => {
    // AxiosWrapper.retrieveToken()
    let url = `${BASE_URL}${endpoint}`
    const searchParams = []
    let params
    if (search) {
      searchParams.push(`title=${search}`)
    }
    if (page) {
      searchParams.push(`page=${page}&_limit=${limit}`)
    }
    if (filter) {
      searchParams.push(`${filter}=true`)
    }
    if (searchParams.length > 0) {
      params = searchParams.join("&")
      url = url + "?" + params
    }
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  static getById = ({ endpoint, id, filter }) => {
    AxiosWrapper.retrieveToken()
    let url = `${BASE_URL}${endpoint}/${id}`
    const searchParams = []
    let params
    if (filter) {
      searchParams.push(`${filter}=time`)
    }
    if (searchParams.length > 0) {
      params = searchParams.join("&")
      url = url + "?" + params
    }
    return axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  static post = ({ endpoint, body }) => {
    AxiosWrapper.retrieveToken()
    return axios.post(`${BASE_URL}${endpoint}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  

  static put = ({ endpoint, id, body }) => {
    AxiosWrapper.retrieveToken()
    let url = `${BASE_URL}${endpoint}`
    if (id) {
      url += `/${id}`
    }
    return axios.put(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  static delete = ({ endpoint, id }) => {
    AxiosWrapper.retrieveToken()
    let url = `${BASE_URL}${endpoint}`
    if (id) {
      url += `/${id}`
    }
    return axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  
}
