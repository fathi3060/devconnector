import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const CreateProfile = props => {
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    
    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;
    return (
        <Fragment>
            <h1 className="large text-primary">
                Créer Votre Profil
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Obtenons quelques informations pour faire ressortir votre profil.
            </p>
            <small>* = champs requis</small>
            <form className="form">
                <div className="form-group">
                <select name="status">
                    <option value="0">* Selectionner votre statut professionnel</option>
                    <option value="Developer">Développeur</option>
                    <option value="Junior Developer">Développeur Junior</option>
                    <option value="Senior Developer">Développeur Senior</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Etudiant ou en Formation</option>
                    <option value="Instructor">Formateur</option>
                    <option value="Intern">Interne</option>
                    <option value="Other">Autres</option>
                </select>
                <small className="form-text">
                    Donnez-nous une idée de votre situation dans votre carrière.
                </small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Société" name="company" />
                <small className="form-text" >
                    De votre propre entreprise ou celle pour laquelle vous travaillez.
                </small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Site Web" name="website" />
                <small className="form-text">
                    Il peut s'agir du vôtre ou du site Web de votre entreprise.
                </small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Ville" name="location" />
                <small className="form-text">
                    Votre ville.
                </small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Compétences" name="skills" />
                <small className="form-text">
                Veuillez les séparer par des virgules (ex : HTML,CSS,JavaScript,PHP).
                </small>
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="Nom Github"
                    name="githubusername"
                />
                <small className="form-text">
                Si vous voulez le lien Github de votre dernier dépôts, incluant votre nom d'utilisateur.
                </small>
                </div>
                <div className="form-group">
                <textarea placeholder="Votre biographie" name="bio"></textarea>
                <small className="form-text">Parle-nous un peu de toi.</small>
                </div>

                <div className="my-2">
                <button type="button" className="btn btn-light">
                    Ajouter des liens de réseau social.
                </button>
                <span>Optionnel</span>
                </div>

                <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter URL" name="twitter" />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" name="facebook" />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" placeholder="YouTube URL" name="youtube" />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input type="text" placeholder="Linkedin URL" name="linkedin" />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input type="text" placeholder="Instagram URL" name="instagram" />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Retour</a>
            </form>
        </Fragment>
    )
}

CreateProfile.propTypes = {

}

export default CreateProfile

