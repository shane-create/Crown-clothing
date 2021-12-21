import React, {useState} from "react";

import FormInput from "../form-input/form-input.component";
import FlexibleButton from "../flexible-button/flexible-button.component";

import { connect } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../redux/user/user.actions";

import "./sign-in.styles.scss";

function SignIn({ emailSignInStart, googleSignInStart }){
    const [userCredentials, setUserCredentials] = useState({email:"", password:""});
    const {email, password} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const {value, name} = event.target;

        setUserCredentials({...userCredentials, [name]: value});
    }
        return(
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in using your email and password</span>

                <form onSubmit={handleSubmit} >
                    <FormInput 
                        name="email" 
                        type="email" 
                        label="Email" 
                        value={email} 
                        required="true" 
                        handleChange={handleChange} 
                    />

                    <FormInput 
                        name="password" 
                        type="password" 
                        label="Password" 
                        value={password} 
                        required="true" 
                        handleChange={handleChange}
                    />

                    <div className="buttons">
                        <FlexibleButton type="submit" >SIGN IN</FlexibleButton>
                        <FlexibleButton type="button" onClick={googleSignInStart} isGoogleSignIn>SIGN IN WITH GOOGLE</FlexibleButton>
                    </div>
                </form>
            </div>
        )
    } 

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);