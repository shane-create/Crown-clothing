import React from "react";

import FormInput from "../form-input/form-input.component";
import FlexibleButton from "../flexible-button/flexible-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import "./sign-up.component.scss";

class SignUp extends React.Component {
    constructor(){
        super();

        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert("The Passwords don't match. Don't panick! Just try again.");
            return;
        } 

        try{

            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, {displayName});

            this.setState({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

        } catch (error) {
            console.error("Ups! There was an error! " + error);
        }
    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({[name] : value})

        /*The reason it's the name that is an object, is because remember every time you type a letter the word comes in as a new object? so the name is really an array of objects!*/
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className="sign-up">

                <h2 className="title">I do not have an account</h2>
                <span>Sign up using your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>

                    <FormInput 
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={this.handleChange}
                        label="Display Name"
                        required
                    />
                    <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        label="Email"
                        required
                    />
                    <FormInput 
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <FormInput 
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label="Confirm Password"
                        required
                    />

                    <FlexibleButton type="submit">SIGN UP</FlexibleButton>
                </form>
            </div>
        )
    }
}

export default SignUp;