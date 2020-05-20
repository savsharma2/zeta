import React, { useEffect, useRef } from 'react';

import './style.scss';

const Card = ({ src, observe, fetchMoreAnimals }) => {
    const inputEl = useRef(null);

    useEffect(() => {
        if (observe) {
            let observer;

            let options = {
                root: null,
                rootMargin: "0px"
            };

            observer = new IntersectionObserver((entries, observer) => {

                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) {
                        // debugger;
                        fetchMoreAnimals();
                        observer.unobserve(inputEl.current);
                    }
                });

            }, options);


            observer.observe(inputEl.current);

            return () => {
                if (observer) {
                    observer.unobserve(inputEl.current);
                };
            };
        }

    }, [observe]);

    return <div ref={inputEl} class="card">
        {src ? <img src={src}></img> : <span>loading</span>}
    </div>;
}

export default Card;