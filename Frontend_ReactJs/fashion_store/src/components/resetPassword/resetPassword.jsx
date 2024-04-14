import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import "./resetPassword.css"

function ResetPasswordForm() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  let navigate=useNavigate()
 
 const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if(newPassword.length<5){
        alert("Password length shouldn't be less than 5 characters")
    }else{
        try {
            await axios.post(`http://localhost:8080/reset-password/${token}`, { newPassword});
            alert('Password reset successfully.');
            navigate('/')
          } catch (error) {
            alert('Failed to reset password. Please try again.');
          }
    }
   
       
    };

  return (
   <div className='main-container'>
        <div className='forgot-container'>
      <h2 className='h2'>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
        className='input'
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={handlePasswordChange}
          required
        />
        
        <button className='btn' type="submit">Reset Password</button>
      </form>
    
    </div>
   </div>
  );
}

export default ResetPasswordForm;
