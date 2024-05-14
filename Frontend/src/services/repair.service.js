import httpClient from "../http-common";

const get = id => {
    return httpClient.get(`/api/v1/repair/${id}`);
}

const getByIdCar = id => {
    return httpClient.get(`/api/v1/repair/getByIdCar/${id}`);
}

const remove = id => {
    return httpClient.delete(`/api/v1/repair/${id}`);
}

const update = data => {
    return httpClient.put('/api/v1/repair/', data);
}

const create = data => {
    return httpClient.post('/api/v1/repair/', data);
}

const calculateAmount = data => {
    return httpClient.post('/api/v1/repair/calculateAmount', data);
}

const haveTicket = id => {
    return httpClient.get(`/api/v1/repair/haveTicket/${id}`);
}

const getBonus = data => {
    return httpClient.get(`/api/v1/repair/getBonus/${data}`);
}

const getR3 = () => {
    return httpClient.get('/api/v1/repair/r3');
}

export default { getByIdCar, remove, get, update, create, calculateAmount, haveTicket, getBonus, getR3 };