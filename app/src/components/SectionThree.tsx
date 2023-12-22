
import { useState } from 'react'
import { useAppContext } from '../App'

const SectionThree = () => {
const {setShowSection} = useAppContext()
const [errorUsername, setErrorUsername] = useState({
    status: false,
    message: ''
})

const [password, setPassword] = useState('');
const [valid, setValid] = useState(false);

const handleChangeUsername = (value: string) => {
    if (!value) {
        setErrorUsername({status: true, message: 'Cannot be empty'});
    } else {
    setErrorUsername({ status: false, message: '' });
    }
}

const validatePassword = (value: string) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);
    const isLengthValid = value.length >= 8;

    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLengthValid;

    setValid(isValid);
};

const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
};

return (
    <div className='w-full h-screen min-h-screen bg-gradient-to-b from-orange-300 to-violet-300 flex items-center justify-center'>
        <div className='w-[300px] flex flex-col items-center justify-center gap-12'>
            <div className='flex items-center justify-between w-full'>
                <div className='relative w-max'>
                    <div className='w-[30px] h-[30px] bg-green-500 flex items-center justify-center min-w-[30px]'>1</div>
                    <p className='absolute text-center text-sm left-[50%] -translate-x-[50%] mt-2'>Personal Information</p>
                </div>
                <div className='w-full h-[5px] bg-green-500'></div>
                <div className='relative w-max'>
                    <div className='w-[30px] h-[30px] bg-green-500 flex items-center justify-center min-w-[30px]'>2</div>
                    <p className='absolute text-center text-sm left-[50%] -translate-x-[50%] mt-2'>Address Information</p>
                </div>
                <div className='w-full h-[5px] bg-green-500'></div>
                <div className='relative w-max'>
                    <div className='w-[30px] h-[30px] bg-green-500 flex items-center justify-center min-w-[30px]'>3</div>
                    <p className='absolute text-center text-sm left-[50%] -translate-x-[50%] mt-2'>Account Information</p>
                </div>
            </div>
            <div className='w-[300px] h-[300px] bg-white p-5 rounded-xl flex flex-col justify-around items-center'>
                <p className='text-center'>Account Information</p>
                <input className='border border-gray-400 w-full rounded-lg px-3 py-2' type="text" placeholder='Username' onChange={ (e) => handleChangeUsername(e.target.value)}/>
                {errorUsername.status && <p className='text-red-500'>{errorUsername.message}</p>}
                <input className='border border-gray-400 w-full rounded-lg px-3 py-2' type="password" placeholder='Password' value={password} onChange={handlePasswordChange}/>
                {valid ? <p>Password is strong!</p> : <p className='text-red-500'>Password is not strong enough. length 8 character</p>}
                <div className='flex items-center justify-around w-full'>
                    <button className='text-5 py-2 bg-blue-500 w-[100px] rounded-lg text-white font-bold' onClick={() => setShowSection(2)}>Previous</button>
                    <button className='text-5 py-2 bg-blue-500 w-[100px] rounded-lg text-white font-bold'>Submit</button>
                </div>
            </div>
        </div>
    </div>
)
}

export default SectionThree