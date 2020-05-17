export const FETCH_ANIMALS = 'FETCH_ANIMALS';
export const FETCH_ANIMALS_SUCCESS = 'FETCH_ANIMALS_SUCCESS';
export const FETCH_ANIMALS_FAIL = 'FETCH_ANIMALS_FAIL';


const urls = ['https://aws.random.cat/meow', 'https://random.dog/woof.json', 'https://randomfox.ca/floof']

const fetchData = ({ client, store }) => {
    const url = getUrl();

    return client.get(url).then(result => {

        const { animals: { byUrl } } = store();
        const url = result.file || result.image || result.url;        
        if (byUrl[url]) {
            return fetchData({ client, store });
        }
        return result;
    });

};

const getUrl = function () {
    let index = Math.trunc(Math.random() * 3);
    return urls[index];
}

export const fetchAnimal = ({ id }) => ({
    types: [FETCH_ANIMALS, FETCH_ANIMALS_SUCCESS, FETCH_ANIMALS_FAIL],
    promise: (client, store) => {
        return fetchData({ client, store });
    },
    id
});