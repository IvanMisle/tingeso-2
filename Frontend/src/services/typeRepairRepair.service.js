import httpClient from "../http-common";

const updateTypesByIdRepair = (id, data) => {
    return httpClient.put(`/api/v1/typeRepair_Repair/${id}`, data);
}

export default { updateTypesByIdRepair };