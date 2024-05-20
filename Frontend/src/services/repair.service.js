import httpClient from "../http-common";

const get = id => {
    return httpClient.get(`/api/v1/repair/${id}`);
}

const getByIdCar = id => {
    return httpClient.get(`/repair/getByIdCar/${id}`);
}

const remove = id => {
    return httpClient.delete(`/repair/${id}`);
}

const update = data => {
    return httpClient.put('/api/v1/repair/', data);
}

const create = data => {
    return httpClient.post('/api/v1/repair/', data);
}

export default { getByIdCar, remove, get, update, create };