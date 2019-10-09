import React, {Component} from 'react';

class Register extends Component{
	constructor(props){
		super(props);
		this.state = {
			register_email: '',
			register_password: '',
			register_name: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({register_email: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({register_password: event.target.value});
	}

	onNameChange = (event) => {
		this.setState({register_name: event.target.value});
	}

	onSubmitRegister = () =>{
		fetch(this.props.serverAddress + 'register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.register_email,
				password: this.state.register_password,
				name: this.state.register_name
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user){
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}
			})
	}

	render() {

		return (
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
					<main className="pa4 black-80">
					  <div className="measure">
					    <fieldset id="register" className="ba b--transparent ph0 mh0">
					      <legend className="f2 fw6 ph0 mh0">Register</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
					        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	   type="text" 
					        	   name="name" 
					        	   id="name"
					        	   onChange={this.onNameChange}/>
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
					        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
					        	   type="email" 
					        	   name="email-address" 
					        	   id="email-address"
					        	   onChange={this.onEmailChange}/>
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
					        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	   type="password"
					        	   name="password"  
					        	   id="password"
					        	   onChange= {this.onPasswordChange}/>
					      </div>
					    </fieldset>
					    <div className="">
					      <input 
					      	onClick={this.onSubmitRegister}
					      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
					      	type="submit" 
					      	value="Register"/>
					    </div>
					  </div>
					</main>
				</article>
			)
	}
}

export default Register;