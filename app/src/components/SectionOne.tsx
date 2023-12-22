import { useAppContext } from '../App'
import { useState } from 'react'

const SectionOne = () => {
const {setShowSection} = useAppContext()
const [errorFullName, setErrorFullName] = useState({
    status: false,
    message: ''
})
const [email, setEmail] = useState('')
const [error, setError] = useState({
    status: false,
    message: ''
})
const [dob, setDOB] = useState('')
const [errorDOB, setErrorDOB] = useState({
    status: false,
    message: ''
})

const handleChangeFullName = (value: string) => {
    if (!value) {
        setErrorFullName({status: true, message: 'Cannot be empty'});
    } else {
    setErrorFullName({ status: false, message: '' });
    }
}

let isValidEmail = (email: string) => {
    return /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm.test(email);

}
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
    setError({ status: true, message: 'Email cannot be empty' });
    } else if (!isValidEmail(e.target.value)) {
    setError({ status: true, message: 'Valid email required' });
    } else {
    setError({ status: false, message: '' });
    }

    setEmail(e.target.value);
}

const handleChangeDOB = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const dateDOB = /^\d{4}-\d{2}-\d{2}$/;

    if (!value) {
    setErrorDOB({ status: true, message: 'Date of Birth cannot be empty' });
    } else if (!dateDOB.test(value)) {
    setErrorDOB({ status: true, message: 'Invalid Date of Birth format (YYYY-MM-DD)' });
    } else {
    setErrorDOB({ status: false, message: '' });
    }

    setDOB(value);
};

return (
    <div className='w-full h-screen min-h-screen bg-gradient-to-b from-orange-300 to-violet-300 flex items-center justify-center'>
        <div className='w-[300px] flex flex-col items-center justify-center gap-12'>
            <div className='flex items-center justify-between w-full'>
                <div className='relative w-max'>
                    <div className='w-[30px] h-[30px] bg-green-500 flex items-center justify-center min-w-[30px]'>1</div>
                    <p className='absolute text-center text-sm left-[50%] -translate-x-[50%] mt-2'>Personal Information</p>
                </div>
                <div className='w-full h-[5px] bg-white'></div>
                <div className='relative w-max'>
                    <div className='w-[30px] h-[30px] bg-white flex items-center justify-center min-w-[30px]'>2</div>
                    <p className='absolute text-center text-sm left-[50%] -translate-x-[50%] mt-2'>Address Information</p>
                </div>
                <div className='w-full h-[5px] bg-white'></div>
                <div className='relative w-max'>
                    <div className='w-[30px] h-[30px] bg-white flex items-center justify-center min-w-[30px]'>3</div>
                    <p className='absolute text-center text-sm left-[50%] -translate-x-[50%] mt-2'>Account Information</p>
                </div>
            </div>
            <div className='w-[300px] h-[300px] bg-white p-5 rounded-xl flex flex-col justify-around items-center'>
                <p className='text-center'>Personal Information</p>
                <input className='border border-gray-400 w-full rounded-lg px-3 py-2' type="text" placeholder='Full Name' onChange={ (e) => handleChangeFullName(e.target.value)}/>
                {errorFullName.status && <p className='text-red-500'>{errorFullName.message}</p>}
                <input className='border border-gray-400 w-full rounded-lg px-3 py-2' type="text" placeholder='Email Address' value={email} onChange={handleChange}/>
                {error.status && <p className='text-red-500'>{error.message}</p>}
                <input className='border border-gray-400 w-full rounded-lg px-3 py-2' type="text" placeholder='Date of Birth' onChange={handleChangeDOB}/>
                {errorDOB.status && <p className='text-red-500'>{errorDOB.message}</p>}
                <button className='text-5 py-2 bg-blue-500 w-[100px] rounded-lg text-white font-bold' onClick={() => setShowSection(2)}>Next</button>
            </div>
        </div>
    </div>
)
}

export default SectionOne