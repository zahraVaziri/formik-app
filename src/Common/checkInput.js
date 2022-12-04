import React from 'react'

const CheckInput = ({name,formik,checkOption}) => {
  return (
    
      <div className='formControl'>
        {checkOption.map(item=>{
            return(
              <React.Fragment key={item.value}>
                <input type="checkbox" id={item.value} name={name} value={item.value} onChange={formik.handleChange} checked={formik.values[name].includes(item.value)}/>
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

export default CheckInput
