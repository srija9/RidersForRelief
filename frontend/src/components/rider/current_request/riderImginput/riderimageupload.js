import React from 'react';
import imageCompression from 'browser-image-compression';
import styles from "./riderimagestyles.module.css";

const riderimages = ({ImgHeader,ImgText,Name,Callback})=>{


 async function onInputChange(e){

  var imageFile = e.target.files[0];

  var options = {
    maxSizeMB: 0.1,
    useWebWorker: true
  }
  const compressed = await imageCompression(imageFile,options);
  let reader = new FileReader()
  reader.onload = function(){    
    Callback(reader.result);
  
  }
  reader.readAsDataURL(compressed);
  document.getElementById("file").value = null;

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

export default riderimages;