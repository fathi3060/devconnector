import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i> Modifier le Profil
            </Link>
            <Link to="/add-experience" className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i> Ajout d'Expèrience
            </Link>
            <Link to="/add-education" className="btn btn-light">
                <i className="fas fa-graduation-cap text-primary"></i> Ajout de Formation
            </Link>
        </div>
    )
}

export default DashboardActions
