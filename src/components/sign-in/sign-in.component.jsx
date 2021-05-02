import React, {Component} from "react";
import "./sign-in.styles.scss";

import FormInput from "../form-input/form-input.component";
import FlexibleButton from "../flexible-button/flexible-button.component";

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends Component{
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        try{
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({email:'', password:''});
        } catch (error){
            console.log("HAHA! Another error for you to fix! " + error);
        }
    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({ [name]: value});
    }

    render(){
        return(
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in using your email and password</span>

                <form onSubmit={this.handleSubmit} >
                    <FormInput 
                        name="email" 
                        type="email" 
                        label="Email" 
                        value={this.state.email} 
                        required="true" 
                        handleChange={this.handleChange} 
                    />

                    <FormInput 
                        name="password" 
                        type="password" 
                        label="Password" 
                        value={this.state.password} 
                        required="true" 
                        handleChange={this.handleChange}
                    />

                    <div className="buttons">
                        <FlexibleButton type="submit" >SIGN IN</FlexibleButton>
                        <FlexibleButton type="button" onClick={signInWithGoogle} isGoogleSignIn>SIGN IN WITH GOOGLE</FlexibleButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;