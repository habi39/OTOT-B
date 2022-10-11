import axios from "./axios"

export const getAllContacts = async () => {
    const {data}= await axios.get("/api/contacts")
    console.log(data)
    return data
}