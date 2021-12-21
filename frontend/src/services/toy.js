import http from "../http-common";

class ToyDataService {
    getToys(page = 0) {
        // added onto the baseURL
        return http.get(`/toys?page=${page}`);
    }

    get(id) {
        return http.get(`/toys?/id/${id}`);
    }

    // Search by name
    findToy(query, by = "name", page=0) {
        return http.get(`/toys?${by}=${query}&page=${page}`);
    }
}

export default new ToyDataService();