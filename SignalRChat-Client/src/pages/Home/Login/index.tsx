import { useFormik } from "formik";
import * as Yup from 'yup';
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux";
import { login } from "../../../redux/actions/user-action";
import { IoMdClose } from "react-icons/io";

interface LoginProps {
    openSignUpModal: Function;
    closeLoginModal: Function;
}

const Login: React.FC<LoginProps> = ({ closeLoginModal, openSignUpModal }) => {

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const schema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    })
    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: (values, { setSubmitting }) => {
            console.log("submit login");
            console.log('Submitting:', values);
            dispatch(login(values))
                .unwrap()
                .then((result) => {
                    console.log(result);
                    navigate('/chat')
                    closeLoginModal();
                })
                .finally(() => {
                    setSubmitting(false);
                })
        },
        validateOnBlur: false,
        validateOnChange: false
    });

    return (
        <>
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-header">
                        <p className="modal-header-title">Login</p>
                        <IoMdClose className='modal-icon' onClick={() => closeLoginModal()} />
                    </div>
                    <div className="login">
                        <form onSubmit={loginFormik.handleSubmit} className="login-form">
                            <div className="login-field">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    onChange={loginFormik.handleChange}
                                    value={loginFormik.values.email}
                                    placeholder="Email"
                                />
                                {loginFormik.errors && loginFormik.errors.email ? (
                                    <div className="login-error">{loginFormik.errors.email}</div>
                                ) : null}
                            </div>

                            <div className="login-field">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={loginFormik.handleChange}
                                    value={loginFormik.values.password}
                                    placeholder="Password"
                                />
                                {loginFormik.touched.password && loginFormik.errors.password ? (
                                    <div className="login-error">{loginFormik.errors.password}</div>
                                ) : null}
                            </div>
                            <p className="login-note">Don't have account yet?
                                <span className="link"
                                    onClick={() => openSignUpModal()}
                                >
                                    Sign up
                                </span>
                                now
                            </p>
                            <div className="login-button">
                                <button type="submit" disabled={loginFormik.isSubmitting}>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;