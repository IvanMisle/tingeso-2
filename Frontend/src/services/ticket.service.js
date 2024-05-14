import httpClient from "../http-common";

const createTicket = id => {
    return httpClient.get(`/api/v1/ticket/createTicket/${id}`);
}

const save = data => {
    return httpClient.post('/api/v1/ticket/', data);
}

export default { createTicket, save };