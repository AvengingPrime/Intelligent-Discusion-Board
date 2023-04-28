import styles from "./FrameComponent.module.css";
import { useState } from "react"
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const FrameComponent = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    window.location.href ='/Homepage';
    const response = await axios.post('http://localhost:3001/FrameComponent', {
      username,
      password,
    });
    console.log(response)
  };
  return (
    <div className={styles.rectangleParent}>
      <div className={styles.frameChild} />
      <img
        className={styles.utDallasTexOrangeRemovebgIcon}
        alt=""
        src="/ut-dallas-tex-orangeremovebgpreview-1@2x.png"
      />
      <form action = "/HomePage" onSubmit={handleSubmit}>
      <div>
      <button className = {styles.logInButton} type="submit">  
        Log in
      </button>
      </div>
      <input
        className={styles.usernameInputField}
        type="text"
        placeholder="Username"
        outline-color="black"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <div outline-color="black" border= "1px" solid ="black"
  outline-style= "solid" className={styles.passwordInputField}>
        <input
          className={styles.usernameInputField1}
          type="password"
          placeholder="Password"
          outline-color="black"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      </form>
      <a className={styles.logInButton1}>
        <b className={styles.logIn1}>Register</b>
      </a>
    </div>
    
  );
};

export default FrameComponent;
