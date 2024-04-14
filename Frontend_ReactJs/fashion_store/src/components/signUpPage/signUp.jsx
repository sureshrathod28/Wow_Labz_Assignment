import React,{useState} from "react"
import { useNavigate } from "react-router-dom"
import './signUp.css'
const SignUpPage=()=>{
    const[data,setData]=useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        ConfirmPassword:""
    })
    const[error,setError]=useState("")
    let navigate=useNavigate()

    async function SubmitForm(e){
        e.preventDefault()
       
        if(!data.name&&!data.email&&!data.phone&&!data.password&&!data.ConfirmPassword){
            setError("All fields are compulsory")
        }else if(!data.name){
            setError("Name field can't be empty")
        }else if(!data.email){
            setError("Email field can't be empty")
        }else if(!data.phone){
            setError("Phone field can't be empty")
        }else if(!data.password){
            setError("Password field can't be empty")
        }else if(!data.ConfirmPassword){
            setError("Confirm-Password field can't be empty")
        }else if(data.password!==data.ConfirmPassword){
            setError("Password isn't matching")
        }else if(data.password.length<5){
            setError("Password length shouldn't less than 5 characters")
        }else{
            try{
                let response=await fetch("http://localhost:8080/register",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        name:data.name,
                        email:data.email,
                        phone:data.phone,
                        password:data.password
                    })
                })
                if (response.ok){
                    setError("")
                    alert("Registration Successfull")
                    navigate('/')
                 await response.json()
                }else{
                    await response.text()
                    if(response.status===400){
                      setError("User already exists")
                    }
                }

            }catch(error){
               console.log("ErrorDesc"+error)
            }
        }

        setTimeout(()=>{
            setError("")
        },5000)

    }
    return(
        <>
        <form method="post" onSubmit={SubmitForm}>
            <div className="container">

                <div className="left-section">
                    <img src='https://i.pinimg.com/originals/07/3d/73/073d733feed0eb3d967513fc2532b625.jpg' className="bird-img" alt="bird" />
                </div>
           
            <div className="right-section">
                    <h1>Fashion Store</h1>
                    <div className="content">
                        <h2>Welcome to Fashion Store</h2>
                        {error !== "" && <div style={{color:"red"}} className="error">{error}</div>}
                        <label htmlFor="name">Name :</label>
                        <div>
                            <input type="text" id="name" className="name-input"  placeholder="Enter your name"
                            name="name" value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}/>
                        </div>
                        <label htmlFor="email">Email :</label>
                        <div>
                            <input type="email" id="email" className="signup-input"   placeholder="Enter email"
                            name="email" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
                        </div>
                        <label htmlFor="phone">Mobile No :</label>
                        <div>
                            <input type="tel" id="phone" className="name-input"   placeholder="Enter your mobile number"
                            name="phone" value={data.phone} onChange={(e)=>setData({...data,phone:e.target.value})}/>
                        </div>
                        <label htmlFor="password">Password :</label>
                        <div>
                            <input type="password" id="password" className="signup-input"   placeholder="Enter password"
                            name="password" value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}/>
                        </div>
                        <label htmlFor="confirm-password">Confirm Password :</label>
                        <div>
                            <input type="password" id="confirm-password" className="signup-input"   placeholder="Confirm password"
                            name="ConfirmPassword" value={data.ConfirmPassword} onChange={(e)=>setData({...data,ConfirmPassword:e.target.value})}/>
                        </div>
                        
                        <div>
                            <button  className="submit" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
                
            </div>
            </form>
        </>
    )
}
export default SignUpPage