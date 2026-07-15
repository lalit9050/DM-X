import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'

function SiqnUp() {
    let navigate = useNavigate()
    let [show, setShow] = useState(false)
    let [userName, setUserName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [loading,setLoading] = useState(false)
    let [err,setErr] = useState("")
    let [userNameError ,setUserNameError] = useState("")


    useEffect(() => {
        if (!userName) {
            setUserNameError("")
            return
        }
        const timer = setTimeout(async () => {
            try {
                let res = await axios.get(`${serverUrl}/api/auth/check-username/${userName}`)
                setUserNameError(res.data.exists ? "Username already exists" : "")
            } catch (error) {
                console.log(error)
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [userName])

    const handleSiqnUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/siqnup`, {
                userName,email,password
            },{withCredentials:true})
            console.log(result)
            setLoading(false)
            setErr("")
        } catch (error) {
            console.log(error)
            setLoading(false)
            setErr(error?.response?.data?.message)
        }
    }

        return (
            <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
                <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
                    <div className='w-full h-[200px] bg-[#19cdff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center '>
                        <h1 className='text-gray-600 font-bold text-[30px]'>Welcome to <span className='text-white'>DM X</span></h1>
                    </div>
                    <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleSiqnUp}>
                        <input type="text" placeholder='username' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg' onChange={(e)=>setUserName(e.target.value)} value={userName} />
                        {userNameError && <p className='text-red-500 text-sm'>*{userNameError}</p>}

                        <input type="text" placeholder='email' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg' onChange={(e)=>setEmail(e.target.value)} value={email}/>

                        <div className='w-[90%] h-[50px] border-2 border-[#20c7ff] rounded-lg overflow-hidden relative'>
                            <input type={`${show ? "text" : "password"}`} placeholder='password' className='w-full h-full outline-none px-[20px] py-[10px] bg-white  shadow-gray-200 shadow-lg' onChange={(e)=>setPassword(e.target.value)} value={password} />
                            <span className='absolute top-[10px] right-[20px] text-[16px] text-[#20c7ff] cursor-pointer font-semibold' onClick={() => setShow(prev => !prev)}>{`${show ? "hidden" : "show "}`}</span>
                        </div>

                        {err && <p className='text-red-500'>*{err}</p>}

                        <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:bg-[#6cd6fa]' disabled={loading || userNameError }>{loading?"Loading...":"Siqn Up"}</button>

                        <p className='cursor-pointer' onClick={() => navigate("/siqnin")}>Already Have An Account ? <span className='text-[#20c7ff] text-[bold]'>Login</span></p>
                    </form>
                </div>
            </div>
        )
    }

    export default SiqnUp