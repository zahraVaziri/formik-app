import React from 'react'

const RadioInput = ({label,name,formik,radioOption}) => {
  return (
    
      <div className='formControl'>
        {radioOption.map(item=>{
            return(
                <React.Fragment key={item.value}>
                 <input type="radio" id={item.value} name={name} value={item.value} onChange={formik.handleChange} checked={formik.values[name] === 0}/>
                <label htmlFor={item.value}>{item.label}</label>
                </React.Fragment> 
            )
        })}
        
        {
            formik.errors[name] && formik.touched[name] && <div className='error'>{formik.errors[name]}</div>
        }
    </div>
    
  )
}

export default RadioInput
