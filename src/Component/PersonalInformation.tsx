import { Field, ErrorMessage } from 'formik';

const PersonalInformation = () => (
<>
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
        <div className="mb-4">
            <Field type="text" id="fullName" name="fullName" placeholder="Fullname" className="mt-1 p-2 w-full border rounded-md" />
            <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="mb-4">
            <Field type="text" id="email" name="email" placeholder="Email" className="mt-1 p-2 w-full border rounded-md" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="mb-4">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-600">
                Date of Birth
            </label>
            <Field type="date" id="dob" name="dob" className="mt-1 p-2 w-full border rounded-md" />
            <ErrorMessage name="dob" component="div" className="text-red-500 text-sm mt-1" />
        </div>
    </div>
</div>
</>
);

export default PersonalInformation;