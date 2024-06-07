import httpClient from "../http-common";

const getReport1 = (year, month) => {
    return httpClient.get(`/report/report1/${year}/${month}`);
}

const getReport2 = (month) => {
    return httpClient.get(`/report/report2/${month}`);
}

export default { getReport1, getReport2 }