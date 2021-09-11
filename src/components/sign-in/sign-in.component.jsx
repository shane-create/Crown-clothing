import React, {Component} from "react";
import "./sign-in.styles.scss";

import FormInput from "../form-input/form-input.component";
import FlexibleButton from "../flexible-button/flexible-button.component";

import { connect } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../redux/user/user.actions";

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
        const { emailSignInStart } = this.props;
        const {email, password} = this.state;
        emailSignInStart(email, password);

        // try{
        //     await auth.signInWithEmailAndPassword(email, password)
        //     this.setState({email:'', password:''});
        // } catch (error){
        //     console.log("HAHA! Another error for you to fix! " + error);
        // }
    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({ [name]: value});
    }

    render(){
        const { googleSignInStart } = this.props;
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
                        <FlexibleButton type="button" onClick={googleSignInStart} isGoogleSignIn>SIGN IN WITH GOOGLE</FlexibleButton>
                    </div>
                </form>
            </div>
        )
    } 
} 

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);