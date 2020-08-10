import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
//import axios from 'axios';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState ({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2} = formData;
    
    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async e => {
        e.preventDefault();
        if( password !== password2) {
            setAlert("Mot de passe différents.", "danger");
        } else {

            //METHODE AVEC REDUX
            register({ name, email, password });

            //METHODE NORMALE ACCES SERVEUR VIA AXIOS
            // const newUser = {
            //     name,
            //     email,
            //     password
            // }

            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }
            //     const body = JSON.stringify(newUser);

            //     const res = await axios.post('/api/users', body, config);
            //     console.log(res.data);

            // } catch (err) {
            //     console.error(err.response.data);
            // }
        }
    }

    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Enregistrement</h1>
            <p className="lead"><i className="fas fa-user"></i> Créer votre compte</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Nom" 
                    name="name" 
                    value={name}
                    onChange={e => onChange(e)}
                />
                </div>
                <div className="form-group">
                <input type="email" 
                    placeholder="Adresse Email" 
                    name="email" 
                    value={email} 
                    onChange={e => onChange(e)} 
                />
                <small className="form-text">
                    Ce site utilise Gravatar donc si vous voulez une image de profil, utilisez un email Gravatar
                </small>
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirmer votre mot de passe"
                    name="password2"
                    value={password2}
                    onChange={e => onChange(e)}
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Enregister" />
            </form>
            <p className="my-1">
                Vous avez déjà un compte? <Link to="/login">Connectez-vous</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated : PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, register }
)(Register);
