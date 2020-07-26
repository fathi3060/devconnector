import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
//import axios from 'axios';

const Register = () => {
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
            console.log("Mot de passe différents");
        } else {

            //METHODE AVEC REDUX
            console.log('success');

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
                required />
                </div>
                <div className="form-group">
                <input type="email" 
                placeholder="Adresse Email" 
                name="email" 
                value={email} 
                onChange={e => onChange(e)} 
                required />
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
                    minLength="6"
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirmer votre mot de passe"
                    name="password2"
                    value={password2}
                    onChange={e => onChange(e)}
                    minLength="6"
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

export default Register;
