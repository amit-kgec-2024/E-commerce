import Input from '../../component/Input'
import Button from '../../component/Button'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const From = ({isSigninPage = true}) => {
    const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate()
    const username = {
    firstname: "",
    lastname: ""
    };
    const [data, setData] = useState({
        ...(!isSigninPage && {username}),
        email: '',
        password: ''
    })

    const handelSubmit = async (e)=> {
        e.preventDefault(e)
        const res = await fetch(`https://e-commerce-nu-seven.vercel.app/api/${isSigninPage ? 'login' : 'register'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...data}),
        })

        if (res.status === 200) {
            if (isSigninPage) {
                const { token, user } = await res.json();
                console.log(token, user, 'response');
                localStorage.setItem('user:token', token);
                localStorage.setItem('user:details', JSON.stringify(user));
                setMessage("Login successful!");
                setShowMessage(true);
                setIsSuccess(true);
                setTimeout(() => {
                    setShowMessage(false);
                    navigate('/');
                }, 1000);
            } else {
                setMessage("Registration successful!");
                setShowMessage(true);
                setIsSuccess(true);
                setTimeout(() => {
                    setShowMessage(false);
                    navigate('/account/signin');
                }, 3000);
            }
        } else {
            setMessage("Registration failed. Please try again.");
            setShowMessage(true);
            // Hide...
            setTimeout(() => {
              setShowMessage(false);
            }, 3000);
        }
    }

    
  return (
    <div className="flex h-screen flex-col justify-center items-center bg-gray-100" style={{backgroundImage: `url(signinup.svg)`}}>
        {showMessage && (
        <div
          className="absolute right-0 bottom-0 m-12 px-5 py-1 bg-white"
          style={{ color: isSuccess ? "green" : "red" }}
        >
          {message}
        </div>
      )}
        <Link to="/management/section" className='text-blue-300 absolute top-0 right-0 m-10 shadow p-3 font-bold'>Management Section</Link>
        <div className="border rounded shadow p-4 flex flex-col items-center">
            <h1 className='text-3xl font-bold uppercase mb-4'>welcome {isSigninPage && 'Back'}</h1>
            <h2 className='text-md font-extralight uppercase mb-8'>ples {isSigninPage ? 'login' : 'register'} to continue</h2>
            <form className="flex flex-col items-center" onSubmit={(e)=> handelSubmit(e)}>
                {!isSigninPage && <Input type='text' label='First Name' placeholder='firstname..' value={data.firstname} onChange={(e)=> setData({...data, firstname: e.target.value})}/>}
                {!isSigninPage && <Input type='text' label='Last Name' placeholder='lastname..' value={data.lastname} onChange={(e)=> setData({...data, lastname: e.target.value})}/>}
                <Input type='email' label='Email' placeholder='email..' value={data.email} onChange={(e)=> setData({...data, email: e.target.value})}/>
                <Input type='password' label='Password' placeholder='password..' value={data.password} onChange={(e)=> setData({...data, password: e.target.value})}/>
                <Button type='submit' label={isSigninPage ? 'Sign in':'Sign up'}/>
            </form>
            <div className="text-sm font-semibold mt-2">{isSigninPage ? 'Didnot have an account?' : 'Alredy have an account?'}  <span className='underline text-blue-400 cursor-pointer' onClick={()=> navigate(`${isSigninPage ? '/account/signup': '/account/signin'}`)}>{isSigninPage? 'sign up' : 'sign in'}</span></div>
        </div>
    </div>
  )
}

export default From
