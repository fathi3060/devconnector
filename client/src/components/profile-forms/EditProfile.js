import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
    profile: { profile, loading },
    createProfile,
    getCurrentProfile,
    history
}) => {
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

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills,
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram,
        });
    }, [loading]);
    
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

    const onChange = e => setFormData ({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Créer Votre Profil
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Obtenons quelques informations pour faire ressortir votre profil.
            </p>
            <small>* = champs requis</small>
            <form className="form" onSubmit={e => onSubmit(e)} >
                <div className="form-group">
                <select name="status" value={status} onChange={e => onChange(e)}>
                    <option value="0">* Selectionner votre statut professionnel</option>
                    <option value="Developpeur">Développeur</option>
                    <option value="Developpeur Junior">Développeur Junior</option>
                    <option value="Developpeur Senior">Développeur Senior</option>
                    <option value="Manager">Manager</option>
                    <option value="Etudiant ou en Formation">Etudiant ou en Formation</option>
                    <option value="Formateur">Formateur</option>
                    <option value="Autodidacte">Autodidacte</option>
                    <option value="Autres">Autres</option>
                </select>
                <small className="form-text">
                    Donnez-nous une idée de votre situation dans votre carrière.
                </small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Société" name="company" value={company} onChange = {e => onChange(e)} />
                <small className="form-text" >
                    De votre propre entreprise ou celle pour laquelle vous travaillez.
                </small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Site Web" name="website" value={website}  onChange = {e => onChange(e)} />
                <small className="form-text">
                    Il peut s'agir du vôtre ou du site Web de votre entreprise.
                </small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Ville" name="location" value={location}  onChange = {e => onChange(e)}  />
                <small className="form-text">
                    Votre ville.
                </small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Compétences" name="skills" value={skills}  onChange = {e => onChange(e)} />
                <small className="form-text">
                Veuillez les séparer par des virgules (ex : HTML,CSS,JavaScript,PHP).
                </small>
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="Nom Github"
                    name="githubusername"
                    value={githubusername}  onChange = {e => onChange(e)} 
                />
                <small className="form-text">
                Si vous voulez le lien Github de votre dernier dépôts, incluant votre nom d'utilisateur.
                </small>
                </div>
                <div className="form-group">
                <textarea placeholder="Votre biographie" name="bio" value={bio}  onChange = {e => onChange(e)} ></textarea>
                <small className="form-text">Parle-nous un peu de toi.</small>
                </div>

                <div className="my-2">
                <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                    Ajouter des liens de réseau social.
                </button>
                <span>Optionnel</span>
                </div>

                {displaySocialInputs && <Fragment>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter"  value={twitter}  onChange = {e => onChange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook URL" name="facebook"  value={facebook}  onChange = {e => onChange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" placeholder="YouTube URL" name="youtube"  value={youtube}  onChange = {e => onChange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input type="text" placeholder="Linkedin URL" name="linkedin"  value={linkedin}  onChange = {e => onChange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input type="text" placeholder="Instagram URL" name="instagram"  value={instagram}  onChange = {e => onChange(e)} />
                    </div>

                </Fragment>}

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Retour</Link>
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
