import React, { forwardRef, useId } from 'react'

const Select = ({
    options,
    label,
    className,
    ...props
},ref) => {
    const id = useId
  return (
    <div className=' w-full'>
        {label&&(
                <label htmlFor={id} className=' inline-block mb-1 pl-1'>
                    {label}
                 </label>
        )}
        <select
        {...props}
        className={ ` px-3 py-2 rounded-lg bg-white text-black
                    outline-none focus:bg-gray-50 duration-200 border
                    botrder-gray-200 w-full ${className}`}
         id={id}
         ref={ref}
        >
            {
                options.map((option)=>(
                    <option key={option} value={option}>{option}</option>
                ))
            }

        </select>
        
    </div>
  )
}

export default forwardRef(Select)