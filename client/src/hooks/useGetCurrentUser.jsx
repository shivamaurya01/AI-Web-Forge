import axios from 'axios'
import React from 'react'
import { serverUrl } from '../App'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'



function useGetCurrentUser() {
    const dispatch = useDispatch()
    useEffect(()=>{
        const getCurrentUser = async ()=>{
            try{
                const result =await axios.get(`${serverUrl}/api/user/me`,{withCredentials:true})
                dispatch(setUserData(result.data))
                console.log(result);
            }catch(error){
                console.log(error);
            }
        }
        getCurrentUser()
    },[])
}

export default useGetCurrentUser
