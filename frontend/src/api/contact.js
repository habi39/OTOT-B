import axios from "./axios"

export const getAllContacts = async () => {
    const {data}= await axios.get("/api/contacts")
    return data
}

export const createContacts = async ({name, gender,email,phone}) => {
    const {data}= await axios.post("/api/contacts",{name,gender,email,phone})
    return data
}

export const updateContact = async ({id,name,gender,email,phone}) => {
    const {data}= await axios.put(`/api/contacts/${id}`,{name,gender,email,phone})
    return data
}

export const deleteContacts = async ({id}) => {
    const {data}= await axios.delete(`/api/contacts/${id}`)
    return data
}