import React from 'react';
import styles from './Section.module.scss';

const Section = ({title, children, classArr}) => {
    let classString = classArr ? [...classArr, styles.Section].join(" ") : styles.Section;
    return(
        <section className={classString}>
            {title && (<h2>{title}</h2>)}
            {children}
        </section>
    );
}

export default Section;