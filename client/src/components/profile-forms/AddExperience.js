import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });
    
    const [toDateDisabled, toggleDisabled] = useState(false);

    const { company, title, location, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 className="large text-primary">
                Ajouter une experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Ajouter un poste de programmeur que vous avez occupés dans le passé.
            </p>
            <small>* = champs requis</small>
            <form className="form" onSubmit={e =>{
                e.preventDefault();
                addExperience(formData, history);
            }}>
                <div className="form-group">
                    <input type="text" placeholder="* Intitulé du poste" name="title" value={title} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Société" name="company" value={company} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Lieu" name="location" value={location} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <h4>Date du </h4>
                    <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <p>
                        <input 
                            type="checkbox" 
                            name="current" 
                            checked={current} 
                            value={current} 
                            onChange={e => {
                                setFormData({ ...formData, current: !current });
                                toggleDisabled(!toDateDisabled);
                            }} 
                        />{' '}
                        Emploi actuel
                    </p>
                </div>
                <div className="form-group">
                    <h4>Date à</h4>
                    <input 
                        type="date" 
                        name="to" 
                        value={to} 
                        onChange={e => onChange(e)} 
                        disabled={toDateDisabled ? 'disabled' : ''} 
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Descriptif du poste"
                        value={description} onChange={e => onChange(e)} 
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Retour</Link>
            </form>            
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(AddExperience);
