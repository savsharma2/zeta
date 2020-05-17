import { FETCH_ANIMALS, FETCH_ANIMALS_SUCCESS, FETCH_ANIMALS_FAIL } from './action';

import produce from "immer";

const INITIAL_STATE = {
    isLoading: true,
    isLoaded: false
};

const animals = (state = { byId: {}, byUrl: {}, allIds: [] }, { type, result, id }) => {
    let newState = (state);
    let { byId, allIds } = state;

    switch (type) {
        case FETCH_ANIMALS: {
            if (!byId[id]) {
                newState = produce(state, draftState => {
                    draftState.byId[id] = { ...INITIAL_STATE, id };
                    draftState.allIds.push(id);
                });
            }
            break;
        }
        case FETCH_ANIMALS_SUCCESS: {
            newState = produce(state, draftState => {
                draftState.byId[id].url = result.file || result.image || result.url;
                draftState.byId[id].index = draftState.allIds.length;
                draftState.byId[id].isLoading = false;
                draftState.byId[id].isLoaded = true;
                draftState.byUrl[draftState.byId[id].url] = id;

            });
            break;
        }
    }
    return newState;
};

export const getAllAnimalIds = (state) => state.animals.allIds;

export const getAnimal = (state, id) => state.animals.byId[id]

export default animals;
