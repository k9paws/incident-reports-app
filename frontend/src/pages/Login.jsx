import { useState } from 'react'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'


function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const dispatch = useDispatch()

    const {client, isLoading, isSuccess, message} = useSelector(state => state.auth)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        // Construct Client
        const clientData = {
            email,
            password
        }

        dispatch(login(clientData))
    }

    return (

        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please log in to create an incident report</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>

                    <div className="form-group">
                        <input 
                        type="email" 
                        className="form-control" 
                        id='email' name="email" 
                        value={email} 
                        onChange={onChange} 
                        placeholder="Enter your email address" 
                        required />
                    </div>
                    <div className="form-group">
                        <input 
                        type="password" 
                        className="form-control" 
                        id='password' 
                        name="password" 
                        value={password} 
                        onChange={onChange} 
                        placeholder="Enter a password" 
                        required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>

                </form>
            </section>
        </>
    )
}

export default Login