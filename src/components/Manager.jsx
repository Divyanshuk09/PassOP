import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState, useEffect } from 'react';

const Manager = () => {
    const ref = useRef();
    const PassRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const ShowPassword = () => {
        PassRef.current.type = "text"
        if (ref.current.src.includes("icons/eye-blind-icon.svg")) {
            PassRef.current.type = "password"
            ref.current.src = "icons/eye-icon.svg"
        }
        else {
            PassRef.current.type = "text"
            ref.current.src = "icons/eye-blind-icon.svg"
        }
    }

    const SavePassword = () => {
        if (form.site.length>3 && form.username.length>3 && form.password.length>3) {

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
            toast('Password Saved Successfully!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Password can not be saved!')
        }
    }
    const DeletePassword = (id) => {

        let c = confirm("Do you really want to delete the password?");
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id != id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)))
            toast('Password Deleted Successfully!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    const EditPassword = (id) => {

        console.log("Editing the id ", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id != id))

    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copytext = (text) => {
        toast('Copied to Clipboard!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />

            <div className="container mx-auto max-w-5xl h-[85.8vh]">
                <div className='conatiner mx-auto max-w-5xl text-center mt-2 '>
                    <div className='Logo font-bold text-xl md:text-3xl'>
                        <span className='text-green-400'>&lt;</span>
                        <span>Pass</span>
                        <span className='text-green-400'>OP</span>
                        <span className='text-black'>/</span>
                        <span className='text-green-400'>&gt;</span>
                    </div>
                    <p className='text-green-900 md:text-lg text-sm'>Your Password Manager</p>

                </div>
                <div className="text-black flex flex-col p-4 gap-4">
                    <input value={form.site} onChange={handlechange} className='rounded-full p-2 px-4 font-semibold text-base border-2 border-green-800' type="text" name="site" placeholder='Enter website URL' id="site" />
                    <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
                        <input value={form.username} onChange={handlechange} className='rounded-full px-4 py-1 md:w-2/5 w-full text-base border-2 border-green-800' type="text" name="username" placeholder='Enter username' id="username" />
                        <div className='flex justify-between md:w-2/5 w-full items-center relative '>
                            <input ref={PassRef} value={form.password} onChange={handlechange} className='rounded-full px-4 pr-10 py-1 w-full text-base border-2 border-green-800' type="password" name="password" placeholder='Enter password' id="password" />
                            <span className='absolute right-0 px-2 hover:cursor-pointer w-11' onClick={ShowPassword}>
                                <img ref={ref} src="icons\eye-icon.svg" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={SavePassword} className='flex justify-center items-center mx-auto p-2 px-4 rounded-full bg-green-500 hover:bg-green-400 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>Save</button>
                </div>
                <hr />

                <div className="passwords rounded-xl pb-8 pt-4 p-4">

                    <h1 className='Logo font-bold md:text-2xl text-md mb-4 underline'>Your Password- </h1>
                    {passwordArray.length === 0 && <div>No passwords to show..</div>}
                    {passwordArray.length != 0 && <table className="table-auto~ w-full bg-green-200 text-sm md:text-lg rounded-xl overflow-hidden">
                        <thead className='bg-green-500 w-full rounded-xl text-sm md:text-lg overflow-hidden'>
                            <tr>
                                <th>Website</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-xs md:text-lg'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='border border-white py-1 text-center'>
                                        <div className=' items-center flex gap-2 justify-center'>
                                            <a className='hover:text-blue-500 hover:underline' href={item.site} target='_blank'>{item.site}
                                            </a>
                                            <img className='copy w-6 cursor-pointer hover:bg-green-500 rounded-lg' src="\icons\icons8-copy.gif" onClick={() => { copytext(item.site) }} alt="" />
                                        </div>
                                    </td>
                                    <td className='border border-white py-1'>
                                        <div className=' items-center flex gap-2 justify-center'>
                                            <span>{item.username}</span>
                                            <img className='copy w-6 cursor-pointer hover:bg-green-500 rounded-lg' src="\icons\icons8-copy.gif" onClick={() => { copytext(item.username) }} alt="" />
                                        </div>
                                    </td>
                                    <td className='border border-white py-1'>
                                        <div className=' items-center flex gap-2 justify-center'>
                                            <span>{item.password}</span>
                                            <img className='copy w-6 cursor-pointer hover:bg-green-500 rounded-lg' src="\icons\icons8-copy.gif" onClick={() => { copytext(item.password) }} alt="" />
                                        </div>
                                    </td>
                                    <td className='border border-white py-1'>
                                        <div className=' items-center flex gap-3 justify-center'>
                                            <div className='cursor-pointer hover:bg-green-500 rounded-lg' onClick={() => { EditPassword(item.id) }} >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </div>
                                            <div className='cursor-pointer hover:bg-green-500 rounded-lg' onClick={() => { DeletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="morph"
                                                    state="morph-trash-full-to-empty"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
