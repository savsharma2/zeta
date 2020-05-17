
const methods = ['get', 'post', 'put', 'patch', 'del'];

export default class ApiClient {
    constructor(req, res) {
        methods.forEach(method => {
            this[method] = (path) => fetch(path)
        });
    }
};