import React, { useState } from "react"
import './loginPage.css'
import { useNavigate } from "react-router-dom"
const LoginPage = () => {
    const[data,setData]=useState({
        email:"",
        password:""
    })
    const[error,setError]=useState("")
    const navigate=useNavigate()
    function Navigation(){
        navigate('/signup')
    }
    function navigateToForgotPassword(){
        navigate('/forgot-password')
    }
   async function submitForm(e){
        e.preventDefault()

        if(!data.email&&!data.password){
            setError("Fields shouldn't be empty")
        }else if(!data.email){
            setError("Email field shouldn't be empty")
        }else if(!data.password){
            setError("Password field shouldn't be empty")
        }else if(data.password.length<5){
            setError("Password length shouldn't be less than 5 characters")
        }else{
            try{
              let response=await fetch("http://localhost:8080/signin",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:data.email,
                    password:data.password
                })
              })
             const responseData=response.json()
              if(response.ok){
                setError("")
                alert("Login Successfull")
                const token = responseData;

                sessionStorage.setItem("token", token);
                      navigate('/home')
                    }else{
                      setError("Invalid credentials")
                    }
                  }catch(error){
                        setError("An error occured please try after sometime!")
                  }
              }
        setTimeout(()=>{
            setError("")
        },3000)
    }
    return (
        <>
         <form method="post" onSubmit={submitForm}>
            <div className="container">

                <div className="left-section">
                    <img src='https://i.pinimg.com/originals/07/3d/73/073d733feed0eb3d967513fc2532b625.jpg' className="bird-img" alt="bird" />
                </div>
           
            <div className="right-section">
                    <h1>Fashion Store</h1>
                    <div className="content">
                        <h2>Welcome to Fashion Store</h2>
                        {error !== "" && <div style={{color:"red"}} className="error">{error}</div>}
                        <label htmlFor="email">Username :</label>
                        <div>
                            <input type="email" id="email"  placeholder="Enter email"
                            name="email" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
                        </div>
                        <label htmlFor="password">Password :</label>
                        <div>
                            <input type="password" id="password" placeholder="Enter password"
                            name="password" value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}/>
                        </div>
                        <div className="forgot">
                            <p onClick={navigateToForgotPassword}>forgot password ?</p>
                        </div>
                        <div>
                            <button  className="submit" type="submit">Submit</button>
                        </div>
                        <div className="or-container">
                          <div className="line"></div>
                          <div className="or-text">OR</div>
                          <div className="line"></div>
                        </div>
                        <div className="google-btn">
                        <span>
                            <img src="https://img.freepik.com/premium-photo/google-application-logo-3d-rendering-white-background_41204-8013.jpg?size=626&ext=jpg&ga=GA1.2.2037738906.1693045033&semt=ais" className="google" alt="google" />
                        </span>
                        <span  className="sign-google">
                            <b>Sign in with google</b>
                        </span>
                        </div>
                        <div className="signup">
                           <span> Don't have an account ?</span> <span style={{color:'blue',cursor:"pointer"}} onClick={Navigation}>Sign Up</span>
                        </div>
                    </div>
                </div>
                
            </div>
            </form>
        </>
    )
}
export default LoginPage