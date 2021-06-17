import React from 'react'

export const Display = ({previewImages}) => {

    if(!previewImages){
        return null;
    }

    return previewImages.map((image, index) => <img className="img-style" style={{maxWidth:'350px', maxHeight:'350px'}} key={index} src={image}/>);
};
