import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';


const serverAddress = 'https://intense-mountain-31190.herokuapp.com/';


const particlesOptions = {
	particles: {
		number: {
			value: 100
		}
	}
}

const initial_state = {
			input: "",
			imageURL: "",
			boxes: [],
			route: 'signin',
			isSingedIn: false,
			user: {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: ''
			}
		};

class App extends Component {
	constructor(){
		super();
		this.state = initial_state;
	}


	loadUser = (data) =>{
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}
		})
	}

	onInputChange = (event) =>{
		this.setState({input: event.target.value});
	}

	calculateFaceLocation = (data) =>{
		const regions_obj_arr = data.outputs[0].data.regions;

		if (!regions_obj_arr) return [];

		const input_image = document.getElementById('input_image');
		const width = Number(input_image.width);
		const height = Number(input_image.height);

		const bounding_boxes_arr = regions_obj_arr.map((obj) =>{
				const clarifai_face = obj.region_info.bounding_box;

				return {
					left_col: clarifai_face.left_col * width,
					top_row: clarifai_face.top_row * height,
					right_col: width - (clarifai_face.right_col * width),
					bottom_row: height - (clarifai_face.bottom_row * height)
				}
			})
		return bounding_boxes_arr;
	}

	displayFaceBoxes = (boxes) =>{
		this.setState({boxes: boxes});
	}

	onButtonSubmit = (event)=>{
		this.setState({imageURL: this.state.input});
		
		fetch(serverAddress + 'imageurl', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						input: this.state.input
				})})
		.then(response => response.json())
		.then(response => {
			if(response){
				fetch(serverAddress + 'image', {
					method: 'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						id: this.state.user.id
				})})
					.then(response => response.json())
					.then(count => {
						this.setState(Object.assign(this.state.user, {entries: count}))
					})
					.catch(console.log);
			}
			this.displayFaceBoxes(this.calculateFaceLocation(response))
		})
		.catch(err => console.log(err));
	}

	onRouteChange = (route) =>{
		if (route === 'signout'){
			this.setState(initial_state);
		} else if (route === 'home'){
			this.setState({isSingedIn: true});
		}

		this.setState({route: route});
	}

	render(){
		const {imageURL, boxes, route, isSingedIn} = this.state;
		return (
    		<div className="App">
		    	<Particles className="particles"
		      		params={particlesOptions}/>
		      	<Navigation 
		      			onRouteChange={this.onRouteChange}
		      			isSignedIn={isSingedIn}/>
		      	{ route === 'home'
		      		? <div>
		      			<Logo />
			      		<Rank name={this.state.user.name}
			      			  entries={this.state.user.entries}/>
			      		<ImageLinkForm 
			      			onInputChange={this.onInputChange}
			      			onButtonSubmit={this.onButtonSubmit}/>
						<FaceRecognition imageURL={imageURL} boxes={boxes}/>
		      		  </div>
		      		: (
		      			route === 'signin'
		      				? <Signin loadUser={this.loadUser}
		      						  onRouteChange={this.onRouteChange} 
		      						  serverAddress={serverAddress}/>

		      				: <Register loadUser={this.loadUser}
		      							onRouteChange={this.onRouteChange} 
		      							serverAddress={serverAddress}/>
	      			   )
		      	}
		    </div>
		  );
	}
}

export default App;
