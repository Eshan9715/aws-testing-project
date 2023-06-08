import React from 'react';
import { ErrorMessage, useField } from 'formik';

export const TextFields = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2 w-full">
      <label className="block mb-2 text-sm font-semibold text-black" htmlFor={field.name}>{label}</label>
      <input
        className={`block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-gray-100 border border-none rounded-md text-sm dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
        autoComplete="on"
      />
      <ErrorMessage component="div" name={field.name} className='text-[12px] text-red-600 mb-1' />
    </div>
  )
}



