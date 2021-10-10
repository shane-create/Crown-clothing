import React, {useState} from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import FlexibleButton from "../flexible-button/flexible-button.component";
import { signUpStart } from "../../redux/user/user.actions";
import swal from "sweetalert2"

import "./sign-up.component.scss";

function SignUp({ signUpStart }){
    const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""});

    const {displayName, email, password, confirmPassword} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            await swal.fire("Whoops!", "The passwords don't seem to match! Don't panick, just try again.", "error");
            return;
        } 

        signUpStart({displayName, email, password});
        await swal.fire("Success!", "You have now signed up!", "success");
    };

    const handleChange = event => {
        const {name, value} = event.target;

       setUserCredentials({...userCredentials, [name] : value})

        /*The reason it's the name that is an object, is because remember every time you type a letter the word comes in as a new object? so the name is really an array of objects!*/
    }
        return(
            <div className="sign-up">

                <h2 className="title">I do not have an account</h2>
                <span>Sign up using your email and password</span>
                <form className="sign-up-form" onSubmit={handleSubmit}>

                    <FormInput 
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={handleChange}
                        label="Display Name"
                        required
                    />
                    <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        label="Email"
                        required
                    />
                    <FormInput 
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        label="Password"
                        required
                    />
                    <FormInput 
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        label="Confirm Password"
                        required
                    />

                    <FlexibleButton type="submit">SIGN UP</FlexibleButton>
                </form>
            </div>
        )
    }

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);