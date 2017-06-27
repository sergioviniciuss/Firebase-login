import React, { Component } from 'react';
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBRZf8YyX_2Wq-kWg4EIxa2THXUjBebL-w",
    authDomain: "fir-login-dc677.firebaseapp.com",
    databaseURL: "https://fir-login-dc677.firebaseio.com",
    projectId: "fir-login-dc677",
    storageBucket: "fir-login-dc677.appspot.com",
    messagingSenderId: "505245001361"
  };
firebase.initializeApp(config);

class Authentication extends Component {

	login(event) {
		const email = this.refs.email.value;
		const password = this.refs.password.value;
		const auth = firebase.auth();
		const promise = auth.signInWithEmailAndPassword(email, password);

		promise.then(user => {
			var greetingsMsg = "Hello " + user.email;
			var logoutBtn = document.getElementById("logout");
			var loginBtn = document.getElementById("login");
			var signupBtn = document.getElementById("signup");
			var loginInput = document.getElementById("email");
			var passInput = document.getElementById("pass");

			this.setState({
				err: greetingsMsg
			})
			
			logoutBtn.classList.remove('hide');
			loginBtn.classList.add('hide');
			signupBtn.classList.add('hide');
			loginInput.classList.add('hide');
			passInput.classList.add('hide');
		});
		promise.catch(e => {
			var err = e.message;
			console.log(err);
			this.setState({err: err});
		});
	}

	signup(event) {
		const email = this.refs.email.value;
		const password = this.refs.password.value;
		const auth = firebase.auth();
		const promise = auth.createUserWithEmailAndPassword(email, password);

		promise
		.then(user => {
			var err = "Welcome " + user.email;
			firebase.database().ref('users/' + user.uid).set({
				email: user.email
			});
			console.log(user);
			this.setState({err: err});
		});
		promise
		.catch(e => {
			var err = e.message;
			console.log(err);
			this.setState({err: err});
		});
	}

	logout(event) {
		const promise = firebase.auth().signOut();
		promise.then(user => {
			var logoutBtn = document.getElementById("logout");
			var loginBtn = document.getElementById("login");
			var signupBtn = document.getElementById("signup");
			var loginInput = document.getElementById("email");
			var passInput = document.getElementById("pass");
			
			logoutBtn.classList.add("hide");
			loginBtn.classList.remove("hide");
			signupBtn.classList.remove("hide");
			loginInput.classList.remove("hide");
			passInput.classList.remove("hide");
			this.setState({err:""});
		});

	}

	constructor(props){
		super(props);
	
		this.state = {
			err: ""
		};
		this.login = this.login.bind(this);
		this.signup = this.signup.bind(this);
		this.logout = this.logout.bind(this);
	}
	render() {
		return(
			<div>
				<input id="email" ref="email" type="email" placeholder="Enter your email"/> <br/>
				<input id="pass" ref="password" type="password" placeholder="Enter your password"/> <br />
				<p>{this.state.err}</p>
				<button id="login" onClick={this.login}>Login</button>
				<button id="signup" onClick={this.signup}>Sign Up</button>
				<button id="logout" onClick={this.logout} className="hide">Logout</button>
			</div>
		)
	}
}

export default Authentication