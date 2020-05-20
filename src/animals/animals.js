import React, { useEffect, useState } from 'react';
import { throttle } from 'lodash';

import CardContainer from './cardContainer';
import { getStartingAndEndingIndexToShow, fetchMoreAnimals } from './helper';

import styles from './style.module.scss';


let totalAnimals = 0;
const Animals = ({ animalIds, fetchAnimal }) => {
    const [indexes, setIndexes] = useState([0, 10]);
    totalAnimals = animalIds.length;
    useEffect(() => {
        const parentContainer = document.querySelector(`.${styles.parent}`);
        const onScroll = throttle(() => {
            let indexes = getStartingAndEndingIndexToShow({ numberOfItems: totalAnimals, heightOfAnItem: 520, scrollPos: parentContainer.scrollTop });
            console.log(indexes);
            setIndexes(indexes);

        }, 300);

        parentContainer.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            parentContainer.removeEventListener('scroll', onScroll);
        };

    }, []);


    useEffect(() => {
        fetchMoreAnimals({ fetchAnimal });
    }, []);

    const indexToObserve = animalIds.length - 4;
    const animals = animalIds
        // .filter((id, index) => index > indexes[0] && index < indexes[1])
        .map((id, index) => {
            if (index < indexes[0] || index > indexes[1]) {
                return null;
            }
            const observe = index === indexToObserve ? true : false;
            return <div index={index} className={styles.cardContainer} style={{ top: 520 * index }}>
                <CardContainer key={id} observe={observe} fetchMoreAnimals={fetchMoreAnimals.bind(null, { fetchAnimal })} id={id}> </CardContainer>
            </div>;
        });

    return <div className={styles.parent}>
        <div className={styles.child} style={{ height: animalIds.length * 520 }}>
            {animals}
        </div>
    </div>

};


export default Animals;