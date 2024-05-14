import httpClient from "../http-common";

const getAll = () => { 
    return httpClient.get("/api/v1/typeRepair/");
}

const getNumbersByIdRepair = id => {
    return httpClient.get(`/api/v1/typeRepair/getNumbersByIdRepair/${id}`);
}

const getByIdRepair = id => {
    return httpClient.get(`/api/v1/typeRepair/getByIdRepair/${id}`);
}

const numberTypeCarsByType = (typeNumber, carType) => {
    return httpClient.get(`/api/v1/typeRepair/numberTypeCarsByType/${typeNumber}/${carType}`);
}

const getTotalAmount = () => {
    return httpClient.get(`/api/v1/typeRepair/getTotalAmount`);
}

const numberTypeEngineCarsByType = (typeNumber, carType) => {
    return httpClient.get(`/api/v1/typeRepair/numberTypeEngineCarsByType/${typeNumber}/${carType}`);
}

export default { getAll, getNumbersByIdRepair, getByIdRepair, numberTypeCarsByType, getTotalAmount, numberTypeEngineCarsByType };