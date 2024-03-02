import { useFormik } from "formik";
import * as Yup from "yup";
import "./Signup.scss";
import { AppDispatch } from "../../../redux";
import { useDispatch } from "react-redux";
import { signup } from "../../../redux/actions/user-action";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

interface SignUpProps {
    closeSignUpModal: Function;
}

const SignUp: React.FC<SignUpProps> = ({ closeSignUpModal }) => {
    const dispatch: AppDispatch = useDispatch();
    const signupFormik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: '',
            phonenumber: ''
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required("Firstname is required"),
            lastname: Yup.string().required("Lastname is required"),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
            phonenumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required("Phone number is required")
        }),
        onSubmit: (values, { setSubmitting }) => {
            dispatch(signup(values))
                .then((result) => {
                    console.log(result);
                    toast.success("Sign Up Successfully!")
                    closeSignUpModal();
                })
                .finally(() => setSubmitting(false));
        },
        validateOnChange: false,
        validateOnBlur: false
    })
    return (
        <>
            {/* {isLoading && <Loading />} */}
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-header">
                        <p className="modal-header-title">Sign Up</p>
                        <IoMdClose className='modal-icon' onClick={() => closeSignUpModal()} />
                    </div>
                    <div className="signup">
                        <form onSubmit={signupFormik.handleSubmit} className="signup-form">
                            <div className="signup-name">
                                <span>
                                    <label htmlFor="firstname">First Name</label>
                                    <input
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        onChange={signupFormik.handleChange}
                                        value={signupFormik.values.firstname}
                                        placeholder="FirstName"
                                    />
                                    {signupFormik.touched.firstname && signupFormik.errors.firstname ? (
                                        <div className="signup-error">{signupFormik.errors.firstname}</div>
                                    ) : null}
                                </span>
                                <span>
                                    <label htmlFor="lastname">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        onChange={signupFormik.handleChange}
                                        value={signupFormik.values.lastname}
                                        placeholder="LastName"
                                    />
                                    {signupFormik.touched.lastname && signupFormik.errors.lastname ? (
                                        <div className="signup-error">{signupFormik.errors.lastname}</div>
                                    ) : null}
                                </span>
                            </div>
                            <div className="signup-field">
                                <label htmlFor="phonenumber">Email Address</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    onChange={signupFormik.handleChange}
                                    value={signupFormik.values.email}
                                    placeholder="Email Address"
                                />
                                {signupFormik.touched.phonenumber && signupFormik.errors.email ? (
                                    <div className="signup-error">{signupFormik.errors.email}</div>
                                ) : null}
                            </div>
                            <div className="signup-field">
                                <label htmlFor="phonenumber">PhoneNumber</label>
                                <input
                                    type="text"
                                    id="phonenumber"
                                    name="phonenumber"
                                    onChange={signupFormik.handleChange}
                                    value={signupFormik.values.phonenumber}
                                    placeholder="PhoneNumber"
                                />
                                {signupFormik.touched.phonenumber && signupFormik.errors.phonenumber ? (
                                    <div className="signup-error">{signupFormik.errors.phonenumber}</div>
                                ) : null}
                            </div>
                            <div className="signup-field">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    onChange={signupFormik.handleChange}
                                    value={signupFormik.values.username}
                                    placeholder="Username"
                                />
                                {signupFormik.touched.username && signupFormik.errors.username ? (
                                    <div className="signup-error">{signupFormik.errors.username}</div>
                                ) : null}
                            </div >
                            <div className="signup-field">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={signupFormik.handleChange}
                                    value={signupFormik.values.password}
                                    placeholder="Password"
                                />
                                {signupFormik.touched.password && signupFormik.errors.password ? (
                                    <div className="signup-error">{signupFormik.errors.password}</div>
                                ) : null}
                            </div>
                            <div className="signup-button">
                                <button type="submit" disabled={signupFormik.isSubmitting}>
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;