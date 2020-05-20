import { connect } from 'react-redux';

import { fetchAnimal } from './action';
import { getAllAnimalIds } from './reducer';
import Animals from './animals';


export default connect(
    state => {
        return {
            animalIds: getAllAnimalIds(state)
        };
    },
    { fetchAnimal }
)(Animals);
