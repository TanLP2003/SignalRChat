import { useFormik } from 'formik';
import * as Yup from 'yup';
import './ChangePasswordModal.scss';
import { IoMdClose } from 'react-icons/io';
import { TextField } from '@mui/material';
import { AppDispatch } from '../../../redux';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../../redux/actions/user-action';
import { toast } from 'react-toastify';

interface ChangePasswordModalProps {
    closeChangePasswordModal: Function
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ closeChangePasswordModal }) => {
    const dispatch: AppDispatch = useDispatch();
    const initialValues = {
        email: '',
        currentPassword: '',
        newPassword: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        currentPassword: Yup.string().min(5).required('Current Password is required'),
        newPassword: Yup.string().min(5).required('New Password is required')
    })
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(changePassword(values))
                .unwrap()
                .then(() => {
                    toast.success("Change Password Successfully!")
                    closeChangePasswordModal();
                })
                .catch(() => toast.error("Change Password Failed!"))
        },
        validateOnBlur: false,
        validateOnChange: false
    })
    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <div className='modal-header'>
                    <p className='modal-header-title'>Change Password</p>
                    <IoMdClose className='modal-icon' onClick={() => closeChangePasswordModal()} />
                </div>
                <div className='change-password'>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id='email'
                            name='email'
                            label='Email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={formik.errors && Boolean(formik.errors.email)}
                            helperText={formik.errors && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            id='currentPassword'
                            name='currentPassword'
                            label='Current Password'
                            type='password'
                            value={formik.values.currentPassword}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={formik.errors && Boolean(formik.errors.currentPassword)}
                            helperText={formik.errors && formik.errors.currentPassword}
                        />
                        <TextField
                            fullWidth
                            id='newPassword'
                            name='newPassword'
                            label='New Password'
                            type='password'
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={formik.errors && Boolean(formik.errors.newPassword)}
                            helperText={formik.errors && formik.errors.newPassword}
                        />
                    </form>
                </div>
                <div className='modal-btn'>
                    <div onClick={() => {
                        formik.handleSubmit();
                    }}>
                        Save
                    </div>
                    <div onClick={() => closeChangePasswordModal()}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordModal;