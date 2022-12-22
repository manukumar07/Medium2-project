import React, { useEffect } from 'react'
import '../scss/components/_updateImage.scss'
import { Helmet } from 'react-helmet'
import { useState } from 'react';
import updateImage from '../store/asyncMethods/updateImage';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from 'react-router-dom';


function UpdateImage() {
    const [state, setState] = useState({
        image: "",
        imageName: ""
    });
    const navigate = useNavigate();
    const {message ,redirect} = useSelector(state => state.PostReducer);
    const {imageErrors} = useSelector(state => state.updateReducer);
    const { loading } = useSelector(state => state.authReducer);
    const { id } = useParams();

    const dispatch = useDispatch();
    const [image, setImage] = useState({ imagePreview: "" })
    const handlefile = (e) => {
        if (e.target.files.length !== 0) {
            setState({ ...state, image: e.target.files[0], imageName: e.target.files[0].name })
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage({ ...image, imagePreview: reader.result })
        }

        reader.readAsDataURL(e.target.files[0])
    }

    const SubmitForm = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('image', state.image)
        dispatch(updateImage(formData))
    }
    useEffect((()=>
    {
        if(imageErrors.length > 0)
        {
            imageErrors.map((err)=>toast.error(err.error))
            dispatch({type:"RESET_IMAGE_ERRORS"})
        }
    }),
    [imageErrors])

    useEffect(()=>{
        if(redirect)
        {
            navigate("/dashboard/1");
        }
    },[redirect])
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Update Image....</title>
            </Helmet>
            <div className='image_main '>
                <div className='image_form image_left'>
                    <h3>Update Image</h3>
                    <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />

                    <form >
                        <div className='image_inputs'>
                            <label htmlFor="post_pic" className='label bg-grey'>{state.imageName ? state.imageName : "Choose Image.."}</label>
                            <input className="hide" type="file" id='post_pic' onChange={handlefile}></input>
                            <input type="submit" onClick={SubmitForm} value={loading ? "..." : "Update Image..."} className='submit'></input>
                        </div>
                    </form>

                </div>

                <div className='image_right'>
                    <div className='imagepreview'>
                        {image.imagePreview && <img name="image" src={image.imagePreview} alt="Image"></img>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateImage




