import React from 'react';
import {useState,useEffect} from "react";
import axios from 'axios'
import styles from "./editRequesterProfile.module.css";
import InputField from "../../global_ui/input";
import Navbar from "../../global_ui/nav";
import { useHistory } from 'react-router-dom';

const EditRequesterProfile = () => {

  const history = useHistory();
  const token = localStorage.getItem('token')
  const [requestError, setRequestError] = useState(null); 

  //use when you pass prop

  // const [data, setData] = useState({
  //   profilePhoto:profile.profilePhoto ,
  //   fullName :profile.fullName,
  //   phoneNumber:profile.phoneNumber,
  //   yearOfBirth:profile.yearOfBirth,
  //   address:profile.address,
  //   city:profile.city,
  //   pincode:profile.pincode,
  // });

  const [data, setData] = useState({
    profilePhoto:"" ,
    fullName :"",
    phoneNumber:"",
    yearOfBirth:"",
    address:"",
    city:"",
    pincode:"",
  });   

  const [errors, setErrors] = useState({ 
    fullName :null,
    phoneNumber:null,
    yearOfBirth:null,
    address:null,
    city:null,
    pincode:null,
  });

  useEffect(
    () => {
    console.log("Making HTTP Request");
    const options = {
        headers: {
            'authorization': 'Bearer ' + token
        }
    }           
    axios.put('http://localhost:8000/requester/profile',options)
          .then(response => setData(response.data));          
    }, error => {
        console.log("An error occured", error);
        setRequestError();
    },
    [])   
    
    const submit = async(event)=> {
      let makeRequest=true;
      event.preventDefault();
      const d=data;

      setTimeout(() => {
        validateCity({target:{value:d.city}})
        // validateName({target:{value:d.fullName}})
        // validatePincode({target:{value:d.city}})
        // validateYear({target:{value:d.yearOfBirth}})
        // validatePhNumber({target:{value:d.phoneNumber}})
        // validateAddress({target:{value:d.address}})         
        
        for (var key in errors) {
          if (errors[key]!= null){
            console.log("ldl");

            console.log(10,errors[key]);
            makeRequest=false
            break;
          }
        }
        if(makeRequest){
          //Make HTTP Request
          console.log("make Req");
        }
        else{
          console.log("Cancel Req");
        }
      }, 500); 
    }
  
    const validatePhNumber = (e) => {
      const phoneNumber = e.target.value;
      const regE = /^[6-9]\d{9}$/;

      if (phoneNumber.length > 10) {
        setErrors({
          ...errors,
          phoneNumber: "Phone number exceeds 10 digits",
        });
      } 
      else if (!regE.test(phoneNumber)) {
        setErrors({
          ...errors,
          phoneNumber: "Please enter a valid number",
        });
      } 
      else {
        setErrors({
          ...errors,
          phoneNumber:null,
        });
      }
      setData({
        ...data,
        phoneNumber: e.target.value,
      });
    };
  
    const validateName = (e) => {
      const fullName = e.target.value;

      if (fullName === "") {
        setErrors({
          ...errors,  
          fullName: "Please enter your name",
        });
      } 
      else if (!/^[a-zA-Z]*$/.test(fullName)) {
        setErrors({
          ...errors,            
          fullName: "Please enter a valid name",
        });
      } 
      else if (fullName.length < 3) {
        setErrors({
          ...errors,  
          fullName: "Name must be atleast 3 characters!",
        });
      } 
      else {
        setErrors({
          ...errors,
          fullName:null,
        });
      }      
      setData({
        ...data,
        fullName: e.target.value,
      });
    };

    const validateAddress = (e) => { 
      const address = e.target.value;
      
      if(address===""){
        setErrors({
          ...errors,
          address:"Address cannot be Empty"
        })
      } 
      else{
        setErrors({
          ...errors,
          address:null,
        })
      }      
      setData({
          ...data,
          address: e.target.value
      })
    };

    const validateCity = (e) => {
      const city = e.target.value;

      if(city===""){
        setErrors({
          ...errors,
          city:"City field cannot be Empty"
        })
      }  
      else{
        setErrors({
          ...errors,
          city:null,
        })
      }     
      setData({
          ...data,
          city: city
      })
      console.log(data.city);
    };

    const validatePincode = (e) => {
      const pincode = e.target.value;

       if (pincode === "") {
          setErrors({
            ...errors,   
            pincode: "Please enter Pincode",
          });
        }
        else if(pincode.length>6){
            setErrors({
                ...errors,
                pincode: "Invalid Pincode!",
            });
        }
        else if(pincode.length<6){
          setErrors({
              ...errors,
              pincode: "Invalid Pincode!",
          });
        } 
        else {
            setErrors({
                ...errors,
                pincode: null,
            });
        } 
        setData({
            ...data,
            pincode: e.target.value,
        });
    };
  
    const validateYear = (e) => {
      console.log(new Date().getFullYear() - 100);
      const year = e.target.value;
      const cyear = new Date().getFullYear();
  
      if (!parseInt(year) || parseInt(year) < cyear - 100) {
        setErrors({
          ...errors,  
          yearOfBirth: "Invalid Year!",
        });
      } 
      else if (parseInt(year) > cyear - 13) {
        setErrors({
          ...errors,  
          yearOfBirth: "Invalid Year!",
        });
      } 
      else if (year.length == 0) {
        setErrors({
          ...errors,  
          yearOfBirth: "Enter Year!",
        });
      } 
      else if (year.length != 4) {
        setErrors({
          ...errors,  
          yearOfBirth: "Invalid Year",
        });
      } 
      else {
        setErrors({
          ...errors,
          yearOfBirth: null,
        });
      }
      setData({
        ...data,
        yearOfBirth: e.target.value,
      });
    };

    return (        
        <div className={styles.requesterProfileContainer}>

            <Navbar back={true} backStyle={{ color: 'white' }} title="My Account" titleStyle={{ color: 'white' }} style={{ backgroundColor: '#79CBC5', marginBottom: "10px" }} />
            
            <form className={styles.editProfileForm} onSubmit={submit}>
                
                <img className={styles.profileImage}></img>

                <InputField 
                
                value={data.fullName}
                type = "text"
                maxLength ="40"
                placeholder="Name"
                error={errors.fullName? errors.fullName :null}
                onChange={validateName}                
                />
                <InputField
                value={data.phoneNumber}
                type="number"
                maxLength="10"
                placeholder="Mobile Number"
                error={errors.phoneNumber? errors.phoneNumber : null}
                onChange={validatePhNumber}            
                />
                <InputField
                value={data.yearOfBirth}
                type="number"
                maxLength="4"
                placeholder="Year Of Birth"
                error={errors.yearOfBirth? errors.yearOfBirth : null}
                onChange={validateYear}
                />

                <div className={styles.address}>
                    <div className={styles.completeAddress}>
                        <InputField                
                        value={data.address}
                        placeholder="Address"
                        onChange={validateAddress}
                        error={errors.address? errors.address :null}
                        />
                    </div>

                    <div className={styles.city}>
                        <InputField
                          value={data.city}
                          type="text"
                          placeholder="City"
                          error={errors.city? errors.city : null}
                          onChange={validateCity}
                          />                        
                    </div>

                    <div className={styles.pincode}>
                        <InputField 
                        value={data.pincode}
                        type="number"
                        placeholder="Pincode"
                        error={errors.pincode? errors.pincode :null}
                        onChange={validatePincode}
                        />
                    </div>  

                </div>       
            </form>
              
            <button onClick={submit} className="submit">Save Changes</button>

        </div>  
        );
      };
  
export default EditRequesterProfile;
  
