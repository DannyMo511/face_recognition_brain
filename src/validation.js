const validate_name = (name) => {
		if(!name){
			alert('Invalid name');
			return false;
		}
		return true;
	}

const validate_email = (email) => {
		const num_of_at = (email.match(/@/g) || []).length;
		const at_position = email.indexOf('@');
		const dot_position = email.indexOf('.', at_position);

		if(num_of_at !== 1 || dot_position < 2){
			alert('Invalid email');
			return false;
		}
		return true;
	}

const validate_password = (password) => {
		if(password.length < 6){
			alert('Password should be longer then 6 charcters');
			return false;
		}
		return true;
	}

export const validate_signin_fields = (email, password) =>{
		return validate_email(email) && 
			   validate_password(password);
	}

export const validate_register_fields = (name, email, password) =>{
		return validate_name(name) && 
			   validate_email(email) && 
			   validate_password(password);
	}
