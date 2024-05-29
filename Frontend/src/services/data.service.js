import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get(`/data/TypeRepair/`);
}

export default { getAll };