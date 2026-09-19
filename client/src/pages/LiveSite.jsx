import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App';
import { useParams } from 'react-router-dom';

function LiveSite() {
    const {id} = useParams()
    const [html,setHtml] = useState("")
    const [error,setError] = useState("")
    useEffect(() => {
           const handleGetWebsite = async () => {
               try {
                   
                   const result = await axios.get(
                       `${serverUrl}/api/website/get-by-slug/${id}`,
                       {
                           withCredentials: true,
                       }
                   );
                   setHtml(result.data.latestCode)
   
                
               } catch (error) {
                   console.log(error);
                   setError("site not found")
               }
           };
               handleGetWebsite();
           
       }, [id]);
       if(error){
        <div className='h-screen flex items-center justify-center bg-black text-white'>
            {error}
        </div>
       }
  return (
    <iframe title="Live Site" srcDoc={html} className='w-screen h-screen border-none' sandbox='allow-scripts allow-same-origin allow-forms'/>
  )
}

export default LiveSite
