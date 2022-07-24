import {useFormik} from 'formik'

const SignUpForm = () => {
    // const [userData,setUserData]=useState({
    //     name: '',
    //     email:'',
    //     password:''
    // })
    // const changeHandler=(e) =>{
    //     setUserData({...userData,[e.target.name]: e.target.value})
    // }
    const formik = useFormik({
        initialValues:{
            name: '',
            email:'',
            password:''
        }
    })
    const submitHandler = (e)=>{
        e.preventDefault()
    }
  return (
    <div>
        <form onSubmit={submitHandler}>
            <div className='formControl'>
                <label>name</label>
                <input type={'text'} onChange={formik.handleChange} name='name' value={formik.values.name} />
            </div>
            <div className='formControl'>
                <label>email</label>
                <input type={'email'} onChange={formik.handleChange} name='email' value={formik.values.email} />
            </div>
            <div className='formControl'>
                <label>password</label>
                <input type={'password'} onChange={formik.handleChange} name='password' value={formik.values.password} />
            </div>
            <button>submit</button>
      </form>
      
    </div>
  )
}

export default SignUpForm
