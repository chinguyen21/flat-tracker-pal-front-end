import React, {useState} from 'react';
import {TextField, Button} from "@material-ui/core"
import Styling from '../styling/Styling'

const Signup = ({setUser, setLoggedIn}) => {
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
      console.log(e.target.email.value)
    e.preventDefault();
    let new_user = {
      email: e.target.email.value,
      password: e.target.password.value,
      password_confirmation: e.target.password_confirmation.value,
      age: e.target.age.value,
      gender: e.target.gender.value,
      name: e.target.name.value,
      target_calories: e.target.target_calories.value
    }

    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(new_user)
    })
    .then(res => res.json())
    .then(response => {
      if (response.user) {
        setUser(JSON.parse(response.user))
        setLoggedIn(true)
        localStorage.token = response.token
      } else {
        setErrors(response.message)
      }
    })
  }

  return(
    <div>
       <header className="App-page-1">
        <div className="error">{errors ? errors.map(error => <p>{error}</p>) : null}</div>
        <div className="auth">SIGN UP</div>
        
      <form className={Styling().authForm} onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="Email"
          variant="filled"
          color="secondary"
          type="email"
          placeholder="email@email.com"
        />
        <br/>
        <TextField
          id="password"
          label="Password"
          variant="filled"
          color="secondary"
          type="password"
          placeholder="12345678"
          />
        <br/>
        <TextField
          id="password_confirmation"
          label="Password Confirmation"
          variant="filled"
          color="secondary"
          type="password"
          placeholder="12345678"
          />
          <br/>
        <TextField
          id="name"
          label="Name"
          variant="filled"
          color="secondary"
          type="text"
          placeholder="Dwayne Johnson"
          />
          <br/>
        <TextField
          id="age"
          label="Age"
          variant="filled"
          color="secondary"
           type="number"
          placeholder="20"
          />
          <br/>
        <TextField
          id="gender"
          label="Gender"
          variant="filled"
          color="secondary"
          type="text"
          placeholder="Female or Male"
          />
          <br/>
        <TextField
          id="target_calories"
          label="Target Calories"
          variant="filled"
          color="secondary"
          type="number"
          placeholder="2000"
        />
          <div className='submit'>
          <Button type='submit' variant="outlined" color="default">
            SIGN UP
          </Button>
        </div>
        </form>
      </header>
    </div>
  )
}

export default Signup;