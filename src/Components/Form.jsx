import React from 'react'
import {useForm} from 'react-hook-form'
import { DevTool } from '@hookform/devtools';

const Form = () => {
    const form = useForm();
    const {register, control, handleSubmit, formState} = form;
    const onSubmit=(data)=>{
        console.log('Form submitted!', data)
    }
    const {errors} = formState;
  return (
    <>
    <form  onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form__control mb-3 flex flex-col">
            <label htmlFor="username" className='text-white font-serif font-bold text-[25px]'>Username</label>
            <input type="text" 
            name='username' 
            className='w-[350px] h-[60px] bg-gray-500 rounded-md px-5 text-white'
            id='username'
            {...register('username',
            {
                required:{
                    value: true,
                    message: "Username is required"
                }
            } )} />
            <p className='text-red-600 text-left font-medium'>{errors.username?.message}</p>
        </div>
        <div className="form__control mb-3 flex flex-col">
            <label htmlFor="email" className='text-white font-serif font-bold text-[25px]'>Email</label>
            <input 
            type="text" 
            name='email' 
            className='w-[350px] h-[60px] bg-gray-500 rounded-md px-5 text-white'
            id='Email'
            {...register('email',
            {
                pattern: {
                    value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
                    message: "Email is invalid!"
                },
                required: "Email is required!",
                validate: {
                    notAdmin:(fieldValue)=>{
                        return (
                            fieldValue !== 'admin@example.com' || 'Try a different email address'
                        );
                    },
                    notBlackListed:(fieldValue)=>{
                        return (
                            !fieldValue.endsWith('baddomain.com') || 'Email address not supported!'
                        );
                    },

                }
            })}/>
            <p className='text-red-600 text-left font-medium'>{errors.email?.message}</p>
        </div>
        <div className="form__control mb-3 flex flex-col">
            <label htmlFor="channel" className='text-white font-serif font-bold text-[25px]'>Channel</label>
            <input 
            type="text" 
            name='channel' 
            className='w-[350px] h-[60px] bg-gray-500 rounded-md px-5 text-white'
            id='channel'
            {...register('channel',
            {
                required: "Channel is required!"
            })}/>
            <p className='text-red-600 text-left font-medium'>{errors.channel?.message}</p>
        </div>
        <button className='bg-blue-500 text-white border-none outline-none rounded-md px-[20px] py-[10px]'>Submit</button>
    </form>
    <DevTool control={control}/>
    </>
  )
}

export default Form