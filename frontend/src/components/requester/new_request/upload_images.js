import React from 'react';
import { useState,} from 'react';
//import { Link } from 'react-router-dom';
import './Upload_images.css';
import { Display } from './Preview';

const uploadImages =()=>{
    const [files, setFiles]= useState([]);
    const [num, setNum] = useState(0);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState([]);
    const [Medicine, setMedicine] = useState(false);
    const [Grocery, setGrocery] = useState(false);    
    const [Misc,setMisc] = useState(false);
  
    

    const onInputChange = (e)=>{
       
        if(num + e.target.files.length<=3)
        {
            
            for(let i=0;i<e.target.files.length;i++){
            
            var t=e.target.files[i].type.split('/').pop().toLowerCase();
            
            if(t!= "jpeg" && t!="jpg" && t!="png")
            {
                setError("Please select a valid image file");
            }
            else{

            if(e.target.files[i].size>10240000){
                setError("Maximum file size is 10MB");         
                
            }else{

                setNum(num => num + 1)
                setFiles(files=> [...files, e.target.files[i]]);
                setPreview(preview=> [...preview, URL.createObjectURL(e.target.files[i])])    
                setError(" ");    
            }
            }
  
            }
        }
        else{
            
            setError("More than 3 files are not allowed");
            setTimeout(() => {
                setError("");
              }, 5000);            
            
        }
       
        }

    const on_change = (e)=>{

        console.log(e.target.name);

        if(e.target.name==="Medicine")
        {
            setMedicine(Medicine=>!Medicine);
        }
        else if(e.target.name === "Grocery")
        {
            setGrocery(Grocery=>!Grocery);
        }
        else if(e.target.name === "Misc")
        {
            setMisc(Misc=>!Misc);
        }
     
        console.log(Medicine);
        console.log(Grocery);
        console.log(Misc);

     } 

        

    const onSubmit = (e) =>{
        e.preventDefault();

        const data = new FormData();

        for(let i=0; i<files.length; i++){
            data.append('file',files[i]);
        }
        }    

    return(

        <div className="uploadScreen">
            <div className="up-title ribbon">               
            <p>Upload Image</p>
            <div className="load_back">
            <button className="fa fa-angle-left"></button>
            </div>
            </div>
            <div className="content-up">
            {/* <form method="post" action="#" id="#" onSubmit={onSubmit}>            */}
            <p className="up-img-header">Please choose the items you want to request</p>
           
               
             
             <p className="up-error-msg">{error ? error : ""}</p>
             {/* <p> {num} files uploaded</p>
             <p> {files.length}</p> */}
             <label htmlFor="file">
             <p className="up-msg">Upload Images: </p>
            <div className="form-group">
                <i className="fa fa-upload"></i>
                 <p>Tap to add Image</p>
             <input type="file" id="file"
             onChange={onInputChange} 
             multiple />             
           </div>
           </label>

           <div className="up-img-preview">         
             <Display previewImages={preview}/>
          </div>

          {/* <div className="up-img-list"> 
              <ul> 
                  <li> 
                     <label className="up-check-label">Medicine
                      <input type="checkbox" name="Medicine" value={false} onClick={on_change} />
                      <span className="up-check check-1"></span>
                      </label>
                  </li>
                  <li> 
                     <label className="up-check-label">Grocery
                      <input type="checkbox" name="Grocery" value={false} onClick={on_change} />
                      <span className="up-check check-2"></span>
                      </label>
                  </li>
                  <li> 
                      <label className="up-check-label">Misc.
                      <input type="checkbox" name="Misc" value={false} onClick={on_change}/>
                      <span className="up-check check-3"></span>
                      </label>
                  </li>
              </ul>

          </div> */}

          <div className="up-list"> 
               
                  <div>
                     <label className="up-check-label">Medicine
                      <input type="checkbox" name="Medicine" value={false} onClick={on_change} />
                      <span className="up-check check-1"></span>
                      </label>
                  </div>
                  <div> 
                     <label className="up-check-label">Grocery
                      <input type="checkbox" name="Grocery" value={false} onClick={on_change} />
                      <span className="up-check check-2"></span>
                      </label>
                  </div>
                  <div> 
                      <label className="up-check-label">Misc.
                      <input type="checkbox" name="Misc" value={false} onClick={on_change}/>
                      <span className="up-check check-3"></span>
                      </label>
                  </div>
             

          </div>

          

           <br/>
           {/* {Medicine && <p>{Medicine} value1</p>}
           {Grocery && <p>{Grocery} value2</p>}
           {Misc && <p>{Misc} value3</p>} */}
           <button onClick={onSubmit} className="up-img-button">Proceed</button>
       {/* </form> */}
       </div>
           
         
       
      </div>

    );
}

export default uploadImages;