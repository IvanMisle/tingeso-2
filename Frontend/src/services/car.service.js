import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/car/');
}

const create = data => {
    return httpClient.post("/car/", data);
}

const get = id => {
    return httpClient.get(`/car/${id}`);
}

const remove = id => {
    return httpClient.delete(`/car/${id}`);
}

const update = data => {
    return httpClient.put(`/car/`, data);
}

const getBonus = id => {
    return httpClient.get(`/car/getBonus/${id}`);
}

export default { getAll, create, get, remove, update, getBonus };