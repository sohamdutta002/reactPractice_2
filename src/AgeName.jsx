import { useEffect, useState } from 'react'
import './App.css'

const urlName=`https://api.agify.io/?name=`;

const renderObj=(obj)=>{
  return(
    <ol>
      {obj&&Object.entries(obj).map(([key,value])=>(
        <li key={key}>
          <strong>{key}</strong>: {typeof value==='object'?renderObj(value):value}
        </li>
      ))}
    </ol>
  )
}


function useFetching(url,person){
  const [data, setData] = useState(null)
  useEffect(()=>{
    const fetchData=async()=>{
      const fetching=await(await fetch(url)).json();
      setData(fetching);
    };
    if(person)
      fetchData();
  },[url]);
  return data;
}



function AgeName() {
  const [person, setPerson] = useState(null)
  const [inputval, setInputval] = useState('')
  const [load, setLoad] = useState(null)

  const nameData=(useFetching(urlName.concat(person),person))

  const handleSubmit=()=>{
    setLoad(null)
    setPerson(inputval)    
    setLoad('ab')
  }
  const handleReset=()=>{
    setPerson(null)
    setInputval('')
    setLoad(null)
  }
  
  return (
    <>
      <h2>Age from name</h2>
      <input value={inputval} onChange={(e)=>(setInputval(e.target.value))} />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleReset}>Reset</button>
      {load?renderObj(nameData):<p>Loading..</p>
      }
    </>
  )
}

export default AgeName
