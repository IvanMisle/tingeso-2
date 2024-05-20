import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/car/');
}

const create = data => {
    return httpClient.post("/api/v1/car/", data);
}

const get = id => {
    return httpClient.get(`/car/${id}`);
}

const update = data => {
    return httpClient.put('/api/v1/car/', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/car/${id}`);
}

const getReport = id => {
    return httpClient.get(`/api/v1/car/getReport/${id}`);
}

const getCarsWithTicket = () => {
    return httpClient.get('/api/v1/car/carsWithTicket');
}

export default { getAll, create, get, update, remove, getReport, getCarsWithTicket };