import { useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import styles from "./styles/Form.css";

function noenter() {
  return !(window.event && window.event.keyCode == 13); }
const Form1 = () => {
  const onComponent2Click = useCallback(() => {
    // Please sync "Frame 1" to the project
  }, []);

  return (
    <div className={styles.form}>
      <div className={styles.formChild} />
      <div className={styles.formChild} />
      <div className={styles.courseName}>Course Name - Section Name</div>
      <div className={styles.formInner} />
      <div className={styles.postName}>Post Name</div>
      <div className={styles.description}>Description</div>
      
      <div className={styles.postTitleInput}>
      <form className="postTitleInput">
        <input 
          type="text"
          name="title"
          placeholder="Title"
          style={{width:"1200px", height: "30px"}}
          onkeypress="return noenter()"
        />
      </form>
       </div>      
       
       
          
        
      
      <div className={styles.postDescriptionInput}>
      <form className="postDescriptionInput">
        <textarea
          required
          type="text" 
          name="Post Description Input"
          placeholder="Post Description"
          style = {{width:"1200px", height:"200px", maxHeight:"260px"}}
        >
        </textarea>
      </form>
      </div>
      
      <div className={styles.rectangleDiv} />
      <button className={styles.component1}>
        <button className={styles.component1Child} />
        <div className={styles.attachFiles}>Attach Files</div>
      </button>
      <button className={styles.component2} onClick={onComponent2Click}>
        <button className={styles.component1Child} />
        <div className={styles.submit}>Submit</div>
      </button>
      
    </div>
       
  );
};

export default Form1;