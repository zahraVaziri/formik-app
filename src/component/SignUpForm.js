import axios from 'axios';
import {useFormik} from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import CheckInput from '../Common/checkInput';
import Input from '../Common/Input';
import RadioInput from '../Common/RadioInput';
import SelectComponent from '../Common/SelectComponent';
const SignUpForm = () => {
    const [formValue,setFormValue] =useState(null)
    const radioOption=[
        {label:'male',value:'0'},
        {label:'female',value:'1'}
    ]
    const checkOption=[
        {label:'React js',value:'React js'},
        {label:'Vue js',value:'Vue js'}
    ]
    const selectOption=[
        {label:'select value',value:''},
        {label:'iran',value:'IR'},
        {label:'germany',value:'GER'},
        {label:'USA',value:'US'}
    ]
    //1.
    const initialValues={
        name: '',
        email:'',
        phoneNumber:'',
        passwordConfirm:'',
        password:'',
        gender:'',
        nationality:'',
        check:[],
        terms:false
    }
     
     //2.   
    const onSubmit = (values)=>{
        axios.post('http://localhost:3002/users',values).then(res => console.log(res.data)).catch(err =>console.log(err))
    }

    //3.
    const validationSchema =yup.object({
        name: yup.string().required('name is required').min(6,'name is length invalid'),
        email: yup.string().email('invalid is email').required('email is required'),
        phoneNumber:yup.string().required('password is required')
        .matches(/^[0-9]{11}$/,'invalid phone number').nullable(),
        password: yup.string().required('password is required').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
        passwordConfirm: yup.string().required('password is required').oneOf([yup.ref("password"), null], "Passwords must match"),
        gender:yup.string().required('gender is required'),
        nationality:yup.string().required('nationality is required'),
        check:yup.array().min('1').required('check is required'),
        terms:yup.boolean()
    .oneOf([true], 'Must Accept Terms and Conditions'),
    })
    // const validate = (values)=>{
    //     let error={}
    //     if(!values.name){
    //         error.name= 'Name is Requerde'
    //     }
    //     if(!values.email){
    //         error.email= 'Email is Requerde'
    //     }
    //     if(!values.password){
    //         error.password= 'Password is Requerde'
    //     }
    //     return error
    // }
  
    const formik = useFormik({
        initialValues: formValue || initialValues,
        onSubmit,
        validationSchema,
        validateOnMount:true,
        enableReinitialize: true
    })
    useEffect(()=>{
        axios.get('http://localhost:3002/users/1').then(res => setFormValue(res.data)).catch(err =>console.log(err))
    },[])
  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            <Input formik={formik} label={'Name'} name={'name'} />
            <Input formik={formik} label={'email'} name={'email'} />
            <Input formik={formik} label={'phone Number'} name={'phoneNumber'} />
            <Input formik={formik} label={'password'} name={'password'} type={'password'} />
            <Input formik={formik} label={'passwordConfirm'} name={'passwordConfirm'} type={'password'} />
            {/* <div className='formControl'>
                <label>email</label>
                <input type={'email'} {...formik.getFieldProps('email')} name='email'  />
                {
                    formik.errors.email && formik.touched.email && <div className='error'>{formik.errors.email}</div>
                }
            </div>
            <div className='formControl'>
                <label>phone Number</label>
                <input type={'text'} {...formik.getFieldProps('phoneNumber')} name='phoneNumber'  />
                {
                    formik.errors.phoneNumber && formik.touched.phoneNumber && <div className='error'>{formik.errors.phoneNumber}</div>
                }
            </div>
            <div className='formControl'>
                <label>password</label>
                <input type={'password'} {...formik.getFieldProps('password')} name='password'  />
                {
                    formik.errors.password && formik.touched.password && <div className='error'>{formik.errors.password}</div>
                }
            </div>
            <div className='formControl'>
                <label>password Confirm</label>
                <input type={'password'} {...formik.getFieldProps('passwordConfirm')} name='passwordConfirm'  />
                {
                    formik.errors.passwordConfirm && formik.touched.passwordConfirm && <div className='error'>{formik.errors.passwordConfirm}</div>
                }
            </div> */}
            <RadioInput formik={formik} name={'gender'} radioOption={radioOption}/>
            {/* <div>
                <input type="radio" id="0" name="gender" value="0" onChange={formik.handleChange} checked={formik.values.gender === 0}/>
                <label htmlFor="0">Male</label>
                <input type="radio" id="1" name="gender" value="1" onChange={formik.handleChange} checked={formik.values.gender === 1}/>
                <label htmlFor="1">Fmale</label>
                {
                    formik.errors.gender && formik.touched.gender && <div className='error'>{formik.errors.gender}</div>
                }
            </div> */}
            <SelectComponent selectOption={selectOption} name={'nationality'} formik={formik} />
            <CheckInput checkOption={checkOption} name={'check'} formik={formik} />
            <div className='formControl'>
                <input type="checkbox" id='terms' name={"terms"} value={true} onChange={formik.handleChange} checked={formik.values.terms}/>
                <label htmlFor={"terms"}>terms and contitions</label>
        
        {
          formik.errors.terms && formik.touched.terms && <div className='error'>{formik.errors.terms}</div>
        }
    </div>
            <button type='submit' disabled={!formik.isValid}>submit</button>
      </form>
      
    </div>
  )
}

export default SignUpForm
