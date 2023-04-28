import styles from "./FrameComponent.module.css";
const FrameComponent = () => {
  return (
    <div className={styles.rectangleParent}>
      <div className={styles.frameChild} />
      <img
        className={styles.utDallasTexOrangeRemovebgIcon}
        alt=""
        src="/ut-dallas-tex-orangeremovebgpreview-1@2x.png"
      />
      <div className={styles.logIn}>Log in</div>
      <div className={styles.logInButton}>
        <b className={styles.logIn1}>Log in</b>
      </div>
      <input
        className={styles.usernameInputField}
        type="text"
        placeholder="Username"
      />
      <div className={styles.passwordInputField}>
        <input
          className={styles.usernameInputField1}
          type="password"
          placeholder="Password"
          id="password"
        />
      </div>
      <a className={styles.logInButton1}>
        <b className={styles.logIn1}>Register</b>
      </a>
    </div>
  );
};

export default FrameComponent;
