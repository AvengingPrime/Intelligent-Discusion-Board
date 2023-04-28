import { useCallback } from "react";
import styles from "./Form.module.css";
import React, { useState, useEffect } from "react"
import { ReactDOM } from "react-dom";
const axios = require('axios');
const handleSubmit = (event) => {
  event.preventDefault();

  const titleInput = event.target.titleInput.value;
  const descriptionInput = event.target.descriptionInput.value;
  console.log(titleInput)
  console.log(descriptionInput)
  event.target.reset();
};
const ai = ()=> {
  return (<div><table>
  <thead>
  <tr>
    <th>Post Name</th>
    <th>Post Preview</th>
    <th>Document</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>Post Title 1</td>
    <td>Post Preview 1</td>
    <td>Doc 1</td>
  </tr>
  </tbody>
  <tfoot>
  <tr>
    <td>Post Title 2</td>
    <td>Post Preview 2</td>
    <td>Doc 2</td>
  </tr>
  </tfoot>
</table>
<form onSubmit = {handleSubmit}>
<button type = "submit">Confirm Submit
        </button>
</form>        
</div>);
}
const Form1 = () => {
  
  const [aiTable,aiNew] = useState()
  const [titleInput, settitle] = useState('');
  const [descriptionInput, setdescription] = useState('');
  const aiSubmit = event => {
    aiNew(ai)
  }
  const onComponent2Click = useCallback(() => {
    // Please sync "Frame 1" to the project
  }, []);
  
  return (
    <div>
      <div className={styles.formChild} />
      <div className={styles.formChild} />
      <div className={styles.courseName}>Course Name - Section Name</div>
      <div className={styles.formInner} />
      <div className={styles.postName}>Post Name</div>
      <div className={styles.description}>Description</div>
      
      <div className={styles.postTitleInput}>
      <form className="postTitleInput">
        <textarea 
          type="text"
          name="title"
          id = "titleInput"
          placeholder="Title"
          style={{width:"1200px"}}
        />
      </form>
       </div>      
       
       
          
        
      
      <div className={styles.postDescriptionInput}>
      <form className="postDescriptionInput">
        <textarea
          required
          type="text"
          id = "descriptionInput" 
          name="Post Description Input"
          placeholder="Post Description"
          style = {{width:"1200px", height:"200px", maxHeight:"260px", minWidth:"1200px"}}
          
        >
        </textarea>
      </form>
      </div>
      
      <div className={styles.rectangleDiv} />
      <input type="file" name="attach files" className={styles.component1} multiple/>
      
      
      
      <div className={styles.component4} >
      <input type="checkbox" id="switch"
                     />
        <label>
            Anonymous
        </label>
      </div> 
      
      
      
      <div className={styles.component3}><span id="tagContainer"></span>
      <input type="text" id="inputText" placeholder="tags" 
      style = {{width:"1200px"}}/>
      </div>  
      
     
      <div className={styles.component2}>
        
        <button className={styles.component1Child}
        onClick={aiSubmit}>Submit
        </button>
        <div className={styles.componentTable}>
      {aiTable}
      </div>
      </div>
    </div>
     
  );
};

export default Form1;
