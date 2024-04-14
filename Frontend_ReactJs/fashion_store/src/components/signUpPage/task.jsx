import React from 'react'

const Task=()=>{
    return(
        <>
        Hello
        <div>
            <input type="text" id="name" className="name-input"  placeholder="Enter your name"
                            name="name" value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}/>
        </div>
        
        </>
    )
}
export default Task