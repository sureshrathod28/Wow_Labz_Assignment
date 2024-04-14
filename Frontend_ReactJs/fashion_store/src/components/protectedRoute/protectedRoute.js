import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Protectedroute(props) {
    
    const {Component} = props
    let navigate = useNavigate()
    useEffect(()=>{
   const token = sessionStorage.getItem('token');
   if(!token){
    navigate('/')
   }
    })
  return (
    <div>
     <Component/> 
    </div>
  )
}