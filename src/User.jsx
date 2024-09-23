import { useEffect, useState } from 'react'
import './App.css'

const urlUser='https://randomuser.me/api/'

function useFetching(count){
  const [data,setData]=useState(null);
  const [img,setImg]=useState(null);
  useEffect(()=>{
    if(count===0) return
    const fetching=async()=>{
      const fetchdata=await(await fetch(urlUser)).json()
      const imgdata=fetchdata.results.map(user=>({picture:user.picture}))
      const filtereddata=fetchdata.results.map(user=>({
        gender:user.gender,
        name:user.name,
        location:user.location,
        email:user.email,
        dob:user.dob,
      }))
      setData(filtereddata)
      setImg(imgdata)
    }
    fetching()
  },[count])
  // data&&console.log(data)
  return [data,img]
}

const renderObject=(obj)=>{
  return(
    <ol>
      {
        obj&&Object.entries(obj).map(([key,value])=>(
          <li key={key}>
            <strong>{key}</strong>: {typeof value==='object'?renderObject(value):value}
          </li>
        ))
      }
    </ol>
  )
}

function User() {
  const [count,setCount]=useState(0)
  const [data,image]=useFetching(count);
  
  const handleClick=()=>{
    setCount(count+1)
  }  
  const handleReset=()=>{
    setCount(0)
  }

  return (
    <>
      <h2>Random User </h2>
      <button onClick={handleClick}>Different User</button>
      <button onClick={handleReset}>Reset</button>
      <div>{image&&console.log(image[0].picture.large)}
      {
        (image&&count>0)&&(<img src={image[0].picture.large} alt='user' />)
      }{
        (data&&count>0)?renderObject(data[0]):<p>no</p>
      }
      </div>
    </>
  )
}

export default User
