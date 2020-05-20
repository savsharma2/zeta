import { connect } from 'react-redux';

import { getAnimal } from './reducer';
import Card from './components/card';


const CardContainer = connect(
    (state, props) => {
        const { isLoaded, id, url } = getAnimal(state, props.id);
        return {
            src: isLoaded ? url : ''
        };
    }
)(Card);

export default CardContainer;