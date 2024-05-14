import httpClient from "../http-common";

const getBonus = brand => {
    return httpClient.get(`/api/v1/bonus/${brand}`);
}

const getBonus2 = (id, brand) => {
    return httpClient.get(`/api/v1/bonus/getBonus2/${id}/${brand}`);
}

const getBonusById = id => {
    return httpClient.get(`/api/v1/bonus/getById/${id}`);
}

const getBonusId = brand => {
    return httpClient.get(`/api/v1/bonus/getBonusId/${brand}`);
}

export default { getBonus, getBonusById, getBonusId, getBonus2 };