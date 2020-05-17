import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchAnimal } from './action';

import { getRandom } from '../utils';

import { getAllAnimalIds, getAnimal } from './reducer';

import Card from './components/card';

const CardContainer = connect(
    (state, props) => {
        const { isLoaded, id, url } = getAnimal(state, props.id);
        return {
            src: isLoaded ? url : ''
        };
    }
)(Card);

const fetchMoreAnimals = ({ fetchAnimal }) => {
    let i = 0;
    while (i < 10) {
        fetchAnimal({ id: getRandom() });
        i++;
    }
};

const Animals = ({ animalIds, fetchAnimal }) => {

    useEffect(() => {
        fetchMoreAnimals({ fetchAnimal });
    }, []);
    // debugger;
    const indexToObserve = animalIds.length - 4;
    return animalIds.map((id, index) => {
        const observe = index === indexToObserve ? true : false;
        return <CardContainer key={id} observe={observe} fetchMoreAnimals={fetchMoreAnimals.bind(null, {fetchAnimal})} id={id}> </CardContainer>;
    });

};

export default connect(
    state => {
        return {
            animalIds: getAllAnimalIds(state)
        };
    },
    { fetchAnimal }
)(Animals);
