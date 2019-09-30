import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';


const app = new Clarifai.App({
 apiKey: '806659a2aff24347a97e11059f3af0f9'
});


const particlesOptions = {
	particles: {
		number: {
			value: 100
		}
	}
}

class App extends Component {
	constructor(){
		super();
		this.state = {
			input: "",
			imageURL: "",
			box: {}
		}
	}

	onInputChange = (event) =>{
		this.setState({input: event.target.value});
	}

	calculateFaceLocation = (data) =>{
		const regions_obj_arr = data.outputs[0].data.regions;
		// const bounding_boxes_arr = regions_obj_arr.map((obj) =>{
		//     	return (obj.region_info.bounding_box);
		// 	})
		const clarifai_face = regions_obj_arr[0].region_info.bounding_box;
		console.log(clarifai_face);
	}

	onButtonSubmit = (event)=>{
		this.setState({imageURL: this.state.input});
		app.models
		.predict(
		Clarifai.FACE_DETECT_MODEL,
		    // URL
		    this.state.input
		)
		.then(response => this.calculateFaceLocation(response))
		.catch(err => console.log(err));
	}

	render(){
		return (
    		<div className="App">
	    	<Particles className="particles"
	      		params={particlesOptions}/>
	      	<Navigation />
	      	<Logo />
      		<Rank />
      		<ImageLinkForm 
      			onInputChange={this.onInputChange}
      			onButtonSubmit={this.onButtonSubmit}/>
			<FaceRecognition imageURL={this.state.imageURL}/>
		    </div>
		  );
	}
}

export default App;
