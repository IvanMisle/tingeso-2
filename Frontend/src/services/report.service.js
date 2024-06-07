import httpClient from "../http-common";

const getReport1 = (year, month) => {
    return httpClient.get(`/report/report1/${year}/${month}`);
}

export default { getReport1 }