import React from 'react'
import { ErrorMessage, useField } from 'formik'

const LCLSelects = ({label,options, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <div className='my-0'>
      <label className='block mb-2 text-sm text-black font-semibold' htmlFor={field.name}>{label}</label>
      <select className={`block w-full px-5 py-3 text-gray-700 placeholder-gray-100 bg-gray-100 border border-none rounded-md text-sm
       dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40
        ${meta.touched && meta.error && 'is-invalid'}`}
       {...field} {...props}
        autoComplete="off"
        >
        {options.map(option => {
          return (
            <option key={option.name} value={option.code} className="text-black">
              {option.value} 
            </option>
          )
        })}
      </select>
      <ErrorMessage component="div" name={field.name} className='text-[13px] text-red-600 mb-1' />
    </div>
  )
}

export default LCLSelects