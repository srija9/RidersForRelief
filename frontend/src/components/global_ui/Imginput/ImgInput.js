import React from "react";
import imageCompression from "browser-image-compression";
import {useSessionStorageState} from "../../../utils/useLocalStorageState";
import styles from "./ImgInput.module.css";

const ImgInput = ({ImgHeader,ImgText,Name,Key})=>{

  const [Image, setImage] = useSessionStorageState(`${Key}`, []);
  
 async function onInputChange(e){

  var imageFile = e.target.files[0];

  var options = {
    maxSizeMB: 0.1,
    useWebWorker: true
  }
  const compressed = await imageCompression(imageFile,options);
  let reader = new FileReader()
  reader.onload = function(){    
    setImage((Image)=>[...Image, reader.result])  
  }
  reader.readAsDataURL(compressed);
  document.getElementById("file").value = null;

  }

  for(let i=0;i<Image.length;i++) {
    console.log(Image[i]);
  }

    return(
        <div className={styles.container}>

        <label htmlFor="file" className={styles.labels}>
          <p className={styles.up_msg}>{ImgHeader}</p>
          <div className={styles.form_group}>
            <p>{ImgText}</p>
            <input
              type="file"
              id="file"
              name={Name}
              onChange={onInputChange}
              multiple
            />
          </div>
        </label>
        

        </div>
    );
};

export default ImgInput;