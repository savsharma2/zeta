import { getRandom } from '../utils';

export const fetchMoreAnimals = ({ fetchAnimal }) => {
    let i = 0;
    while (i < 10) {
        fetchAnimal({ id: getRandom() });
        i++;
    }
};


let prevScrollPos = 0;

export const getStartingAndEndingIndexToShow = ({ numberOfItems = 0, heightOfAnItem, scrollPos }) => {
    const isMovingUp = scrollPos > prevScrollPos ? false : true;
    const currentCardIndex = Math.floor(scrollPos / heightOfAnItem);

    if (isMovingUp) {
        // will be in negative
        return [currentCardIndex - 10, currentCardIndex + 5];
    } else {
        return [currentCardIndex - 5, currentCardIndex + 10];
    }

};