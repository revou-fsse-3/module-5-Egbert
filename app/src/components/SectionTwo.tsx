import { useState } from 'react'
import { useAppContext } from '../App'

const SectionTwo = () => {
const {setShowSection} = useAppContext()
const [errorStreetAddress, setErrorStreetAddress] = useState({
    status: false,
    message: ''
})
const [errorCity, setErrorCity] = useState({
    status: false,
    message: ''
})
const [errorState, setErrorState] = useState({
    status: false,
    message: ''
})
const [errorZipCode, setErrorZipCode] = useState({
    status: false,
    message: ''
})

const handleChangeStreetAddress = (value: string) => {
    if (!value) {
        setErrorStreetAddress({status: true, message: 'Cannot be empty'});
    } else {
    setErrorStreetAddress({ status: false, message: '' });
    }
}
const handleChangeCity = (value: string) => {
    if (!value) {
        setErrorCity({status: true, message: 'Cannot be empty'});
    } else {
    setErrorCity({ status: false, message: '' });
    }
}
const handleChangeState = (value: string) => {
    if (!value) {
        setErrorState({status: true, message: 'Cannot be empty'});
    } else {
    setErrorState({ status: false, message: '' });
    }
}
const handleChangeZipCode = (value: string) => {
    const zipCodeRegex = /^\d{5}$/;

    if (!value) {
    setErrorZipCode({ status: true, message: 'Zip Code cannot be empty' });
    } else if (!zipCodeRegex.test(value)) {
    setErrorZipCode({
        status: true,
        message: 'Invalid Zip Code format. It should be a 5-digit number.',
    });
    } else {
    setErrorZipCode({ status: false, message: '' });
    }
}

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
                <div className='w-full h-[5px] bg-white'></div>
                <div className='relative w-max'>
                    <div className='w-[30px] h-[30px] bg-white flex items-center justify-center min-w-[30px]'>3</div>
                    <p className='absolute text-center text-sm left-[50%] -translate-x-[50%] mt-2'>Account Information</p>
                </div>
            </div>
            <div className='w-[300px] h-[400px] bg-white p-5 rounded-xl flex flex-col justify-around items-center'>
                <p className='text-center'>Address Information</p>
                <input className='border border-gray-400 w-full rounded-lg px-3 py-2' type="text" placeholder='Street Address' onChange={ (e) => handleChangeStreetAddress(e.target.value)}/>
                {errorStreetAddress.status && <p className='text-red-500'>{errorStreetAddress.message}</p>}
                <input className='border border-gray-400 w-full rounded-lg px-3 py-2' type="text" placeholder='City' onChange={ (e) => handleChangeCity(e.target.value)}/>
                {errorCity.status && <p className='text-red-500'>{errorCity.message}</p>}
                <input className='border border-gray-400 w-full rounded-lg px-3 py-2' type="text" placeholder='State' onChange={ (e) => handleChangeState(e.target.value)}/>
                {errorState.status && <p className='text-red-500'>{errorState.message}</p>}
                <input className='border border-gray-400 w-full rounded-lg px-3 py-2' type="text" placeholder='Zip Code' onChange={(e) => handleChangeZipCode(e.target.value)}/>
                {errorZipCode.status && (<p className='text-red-500'>{errorZipCode.message}</p>)}
                <div className='flex items-center justify-around w-full'>
                    <button className='text-5 py-2 bg-blue-500 w-[100px] rounded-lg text-white font-bold' onClick={() => setShowSection(1)}>Previous</button>
                    <button className='text-5 py-2 bg-blue-500 w-[100px] rounded-lg text-white font-bold' onClick={() => setShowSection(3)}>Next</button>
                </div>
            </div>
        </div>
    </div>
)
}

export default SectionTwo