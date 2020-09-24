import React, { Fragment }from 'react';

const NotFound = () => {;
    return (
        <Fragment>
            <h1 className="x-large text-primary">
                <i className="fas fa-exclamation-triangle"></i> Page non trouvée
            </h1>
            <p className='large'>Désolé, Cette page n'existe pas.</p>
        </Fragment>
    )
}

export default NotFound;