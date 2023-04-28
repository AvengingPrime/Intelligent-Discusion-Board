import { useCallback } from "react";
import styles from "../styles/Form.module.css";
import React, { useState } from "react"
import { ReactDOM } from "react-dom";


const ai = ()=> {
  return (<div styles={{top:"100px"}}><table>
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
<form action = "/HomePage">
<button type = "submit">Confirm Submit
        </button>
</form>        
</div>);
}
const Form1 = () => {
  const [aiTable,aiNew] = useState()
  const aiSubmit = event => {
    aiNew(ai)
  }
  const onComponent2Click = useCallback(() => {
    // Please sync "Frame 1" to the project
  }, []);

  return (
    <div>
      
      <div className={styles.courseName}><div className={styles.bottomDiv}><p styles={{left:"100px"}}><label>Course Name</label> <label>Section Name</label></p>
      </div>
      </div>
      
      <div className={styles.formInner} />
      <div className={styles.postName}>Post Name</div>
      <div className={styles.description}>Description</div>
      
      <div className={styles.postTitleInput}>
      <form className="postTitleInput">
        <textarea className = "postTitleInput"
          type="text"
          name="title"
          placeholder="Title"
          style={{width:"90vw"}}
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
          style = {{width:"90vw", height:"200px", maxHeight:"260px"}}
        >
        </textarea>
      </form>
      </div>
      <div className={styles.rectangleDiv}>
      <div className={styles.bottomDiv}>
      <input styles={styles.bottomDiv} type="file" name="attach files"  multiple/>
      
      
      
      
      <input type="checkbox" id="switch"
                     />
        <label>
            Anonymous
        </label>
       
      
      
      
      <div style = {{height:"10vw"}}>
      <input type="text" id="inputText" placeholder="tags" 
      style = {{width:"90vw", left:"10"}}/>
      <div>
      <button style = {{left:"0px"}} 
        onClick={aiSubmit}
        >Submit
        </button>
        </div>
      </div>  
      
      
      <div>
        
        
        </div>
      <div styles={{top:"100px"}}>
      {aiTable}
      </div>
      </div>
    </div>
     </div>
  );
};

export default Form1;
