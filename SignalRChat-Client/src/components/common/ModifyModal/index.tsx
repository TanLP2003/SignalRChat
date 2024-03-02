import { IoMdClose } from 'react-icons/io';
import './ModifyModal.scss';
import * as Yup from 'yup';
import { Field, Form, Formik, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux';
import { TextField } from '@mui/material';
import { UserUpdateProps, updateUser } from '../../../redux/actions/user-action';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface ModifyModalProps {
    closeModifyModal: Function
}

const ModifyModal: React.FC<ModifyModalProps> = ({ closeModifyModal }) => {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.users.user);
    const validationSchema = Yup.object({
        firstname: Yup.string().required('Firstname is required'),
        lastname: Yup.string().required('Lastname is required'),
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phonenumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required("Phone number is required")
    })
    const initialValues = {
        firstname: user?.firstName,
        lastname: user?.lastName,
        username: user?.userName,
        email: user?.email,
        phonenumber: user?.phoneNumber
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (JSON.stringify(initialValues) === JSON.stringify(values)) {
                return;
            }
            dispatch(updateUser(values as UserUpdateProps))
                .unwrap()
                .then(() => {
                    toast.success("Success!")
                    closeModifyModal();
                })
                .catch(e => {
                    console.log(e);
                    toast.error("Update Failed!");
                });
        },
        validateOnBlur: false,
        validateOnChange: false
    });
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className='modal-header'>
                    <p className='modal-header-title'>Modify Information</p>
                    <IoMdClose className='modal-icon' onClick={() => closeModifyModal()} />
                </div>
                <div className='modify'>
                    <form className='modify-form' onSubmit={formik.handleSubmit}>
                        <div className='modify-name'>
                            <TextField
                                sx={{ width: '50%' }}
                                id='firstname'
                                name='firstname'
                                label='First Name'
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                                helperText={formik.touched.firstname && formik.errors.firstname}
                            />
                            <TextField
                                sx={{ width: '50%' }}
                                id='lastname'
                                name='lastname'
                                label='Last Name'
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                                helperText={formik.touched.lastname && formik.errors.lastname}
                            />
                        </div>
                        <TextField
                            fullWidth
                            id='username'
                            name='username'
                            label='User Name'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                        <TextField
                            fullWidth
                            id='email'
                            name='email'
                            label='Email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            id='phonenumber'
                            name='phonenumber'
                            label='Phone Number'
                            value={formik.values.phonenumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
                            helperText={formik.touched.phonenumber && formik.errors.phonenumber}
                        />
                    </form>
                </div>
                <div className='modal-btn'>
                    <div onClick={() => {
                        formik.handleSubmit();
                    }}>
                        Save
                    </div>
                    <div onClick={() => closeModifyModal()}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModifyModal;