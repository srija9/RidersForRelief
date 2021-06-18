
import React from 'react';
import { useState,} from 'react';
//import { Link } from 'react-router-dom';
//import { AuthContext } from "../../context/auth/authProvider";
import './Upload_images.css';
import Navbar from '../../global_ui/nav';

const uploadImages =()=>{

    // const { loading} = useContext(AuthContext);

    const [files, setFiles]= useState([]);
    const [num, setNum] = useState(0);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState([]);
    const [Medicine, setMedicine] = useState(false);
    const [Grocery, setGrocery] = useState(false);    
    const [Misc,setMisc] = useState(false);
    const [categories,setcategories] = useState([]);
  
    

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

    }

    const onSubmit = (e) =>{
        e.preventDefault();

        if(num===0)
        {
            setError("No file uploaded");
        }

        if(Medicine===true)
        {
            setcategories(categories=> [...categories,"MEDICINES"]);
        }
        if(Grocery===true)
        {
            setcategories(categories=> [...categories,"GROCERIES"]);            
        }
        if(Misc===true)
        {
            setcategories(categories=> [...categories,"MISC."]);           
        }

        for(let i=0; i<categories.length; i++)
        {
            console.log(categories[i]);
        }

     

        

        const data = new FormData();

        for(let i=0; i<files.length; i++){
            data.append('file',files[i]);
        }
        }    

    return(

        
        

        <div className="uploadScreen99">
            
            <Navbar style={{background:"palegreen",marginBottom:0.75+'em'}} back={true} title="Upload Images"/>
            <div className="content-up99">
                   
            <p className="up-img-header99">Please choose the items you want to request</p>
           
               
             
             <p className="up-error-msg99">{error ? error : ""}</p>
             
             
             
           
             
             <label htmlFor="file">
             <p className="up-msg99">Upload Images: </p>
             <div className="form-group99">
                <i className="fa fa-upload"></i>
                <p>Tap to add Image</p>
             <input type="file" id="file" name="files"
             onChange={onInputChange} 
             multiple />  
                      
            </div>
            </label>
            
 
             <div className="up-img-preview99">         
             <Display previewImages={preview}/>
           </div>
           


          <div className="up-list99"> 
               
                  <div>
                     <label className="up-check-label99">Medicine
                      <input type="checkbox" name="Medicine" value={false} onClick={on_change} />
                      <span className="up-check99 check-199"></span>
                      </label>
                  </div>
                  <div> 
                     <label className="up-check-label99">Grocery
                      <input type="checkbox" name="Grocery" value={Grocery} onClick={on_change} />
                      <span className="up-check99 check-299"></span>
                      </label>
                  </div>
                  <div> 
                      <label className="up-check-label99">Misc.
                      <input type="checkbox" name="Misc" value={false} onClick={on_change}/>
                      <span className="up-check99 check-399"></span>
                      </label>
                  </div>
             

          </div>

           <button onClick={onSubmit} className="up-img-button99">Proceed</button> 
    
       </div>         
       
      </div>
      

    );
}

export default uploadImages;

const Display = ({previewImages}) => {

    if(!previewImages){
        return null;
    }

    return previewImages.map((image, index) => <img className="img-style99" style={{maxWidth:'350px', maxHeight:'350px'}} key={index} src={image}/>);
};
