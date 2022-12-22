import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import "../scss/components/_create.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import createAction from "../store/asyncMethods/PostMethods.js"
import toast, { Toaster } from "react-hot-toast"
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Loading from './Loading.js';

function Create(props) {

    const [state, setState] = useState("");
    const [value, setValue] = useState('');
    const [inputValue, setinputValue] = useState({ title: "", description: "", image: {} })
    const [slug, setSlug] = useState("");
    const [slugButton, setButton] = useState(false);
    const [imagePreview, setimagepreview] = useState("");
    const { createError, redirect } = useSelector(state => state.PostReducer);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.authReducer);
    const { _id, name } = user;
    const handlefile = (e) => {
        if (e.target.files.length !== 0) {
            setState(e.target.files[0].name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setimagepreview(reader.result);
            }

            reader.readAsDataURL(e.target.files[0]);
            setinputValue({ ...inputValue, image: e.target.files[0] })
        }
    }

    const handleInput = (e) => {

        setinputValue({ ...inputValue, title: e.target.value });
        let slugs = e.target.value.trim().split(" ").join("-");
        setSlug(slugs);
    }

    const handleSlug = (e) => {
        setSlug(e.target.value);
        setButton(true);
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        setSlug(slug.trim().split(" ").join("-"));
    }

    const handleDesc = (e) => {
        setinputValue({ ...inputValue, [e.target.name]: e.target.value })
    }

    useEffect(()=>
    { 
        if(redirect)
        navigate("/dashboard/1");
    },[redirect])

    useEffect(() => {
        createError.map((error) => toast.error(error.msg));

    }, [createError])

    const handleformSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("title", inputValue.title);
        formdata.append("body", value);
        formdata.append("description", inputValue.description);
        formdata.append("slug", slug);
        formdata.append("_id", _id);
        formdata.append("name", name);
        formdata.append("image", inputValue.image);
        dispatch(createAction(formdata));
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Create Post....</title>
            </Helmet>
            { loading ? <Loading/> :
            <div className='create_main bg-grey'>
                <div className='main_left'>
                    <div className='create_form'>
                        <h3>Create a new post</h3>
                        <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
                        <form onSubmit={handleformSubmit}>
                            <div className='input_title'>
                                <label htmlFor="post_title" >Post Title</label>
                                <input className="bg-grey" onChange={handleInput} value={inputValue.title} type="text" id='post_title' placeholder="Post Title..."></input>
                            </div>
                            <div className='input_file'>
                                <label htmlFor="post_pic">{state ? state : "Choose Image.."}</label>
                                <input className="bg-grey" type="file" id='post_pic' onChange={handlefile}></input>
                            </div>
                            <label htmlFor="post_body">Post Body</label>
                            <ReactQuill theme="snow" value={value} onChange={setValue} id="post_body" />
                            <div className='desc'>
                                <label htmlFor="description">Meta Description</label>
                                <textarea name="description" cols='30' rows="10" id="description" className='bg-grey' maxLength="150" placeholder='Meta Description...' onChange={handleDesc}>
                                </textarea>
                                <p>{inputValue.description ? inputValue.description.length : 0} <span>MAX:150</span></p>
                            </div>

                        </form>

                    </div>
                </div>
                <div className='main_right'>
                    <div className='create_slug'>
                        <form>
                            <div className='post_url'>
                                <label htmlFor="slug">Post URL</label>
                                <input id="slug" type="test" value={slug} placeholder="Post URL" className='bg-grey' onChange={handleSlug} ></input>
                            </div>
                            {slugButton ? <div className='slug_button'>
                                <button onClick={handleSumbit}>Update Slug</button>
                            </div> : ""}
                        </form>
                        <div className='imagepreview'>
                            {imagePreview && <img name="image" src={imagePreview} alt="Image"></img>}
                        </div>
                        <input type="submit" onClick={handleformSubmit} value={loading ? "..." : "Create Post..."} className='input_file'></input>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default Create