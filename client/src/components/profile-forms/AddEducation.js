import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });
    
    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 className="large text-primary">
                Ajouter une formation
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Ajouter un diplome, formation, bootcamp suivis.
            </p>
            <small>* = champs requis</small>
            <form className="form" onSubmit={e =>{
                e.preventDefault();
                addEducation(formData, history);
            }}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="* Ecole ou formation" 
                        name="school" 
                        value={school} 
                        onChange={e => onChange(e)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="* Niveau ou Diplôme" 
                        name="degree" 
                        value={degree} 
                        onChange={e => onChange(e)} 
                        required
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Intitulé de la formation" 
                        name="fieldofstudy" 
                        value={fieldofstudy} 
                        onChange={e => onChange(e)} 
                    />
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
                        Formation actuel
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
                        placeholder="Descriptif de la formation"
                        value={description} onChange={e => onChange(e)} 
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Retour</Link>
            </form>            
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(
    null,
    { addEducation }
)(withRouter(AddEducation));
