import React, { useEffect } from 'react'
import { Helmet } from "react-helmet";
import "../scss/components/_dashboard.scss"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from "react-hot-toast"
import fetchPosts from '../store/asyncMethods/fetchPosts';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import Loading from './Loading.js';
import Sidebar from './Sidebar';
import Pagination from "./Pagination.js"
import { BsImage } from 'react-icons/bs'
import axios from 'axios'
import moment from "moment";


function Dashboard() {
    const {token} = useSelector(state => state.authReducer)
    const dispatch = useDispatch();
    const { redirect, message } = useSelector(state => state.PostReducer);
    const { user, loading } = useSelector(state => state.authReducer);
    const { posts, count, perPage } = useSelector(state => state.fetchReducer);
    const { updateMsg } = useSelector(state => state.updateReducer)
    let { page } = useParams();
    if (page === undefined)
        page = 1;
    const _id = user._id;


    useEffect(() => {
        if (redirect)
            dispatch({ type: "REDIRECT_FALSE" })
        if (message.length !== 0) {
            toast.success(message)
            dispatch({ type: "REMOVE_MESSAGE" });
        }
        if (updateMsg.length !== 0) {
            toast.success(updateMsg)
            dispatch({ type: "RESET_UPDATE_MSG" })
        }
        dispatch(fetchPosts(_id, page))
    }, [message, redirect, page])

    const delePost = async (id) => {
        const confirm = window.confirm("Are you really want to delete Post..")
        if (confirm) {
            dispatch({ type: "SET_LOADER" })
            const config =
            {
                headers: {
                    Authorizaton: 'Bearer ' + token
                }
            }
            try {
                const response = await axios.get('http://localhost:5000/delete/' + id, config)
                dispatch({ type: "CLOSE_LOADER" })
                dispatch(fetchPosts(_id, page))
                dispatch({type:"SET_MESSAGE",payload:response.data.msg});
                // dispatch({ type: "SET_POSTS", payload: { data, count, perPage } })
            } catch (error) {
                dispatch({ type: "CLOSE_LOADER" })
            }
        }
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard</title>
            </Helmet>
            <div className='dash-container bg-grey'>
                <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
                <div className='dash-left'>
                    {loading ? '' : <Sidebar />}
                </div>
                <div className='dash-right'>
                    <div className='grid-container'>
                        {loading ? <Loading /> : posts.length > 0 ?
                            posts.map((content) =>
                                <div className='grid-items' key={content._id} >
                                    <div className='div-first'>
                                    <Link to={'/details/'+content._id}>
                                    {content.title}
                                    </Link>
                                    <span>Published: {moment(content.updatedAt).fromNow()}</span>
                                    </div>
                                    <div>
                                        <Link className='link' to={'/updateImage/' + content._id}><BsImage /></Link>
                                        <Link to={'/update/' + content._id}><AiOutlineEdit className='link' /></Link>
                                        <Link ><AiFillDelete onClick={()=>delePost(content._id)} className='link' /></Link>
                                    </div>
                                </div>)
                            : <div className='grid-items' >No Post.</div>
                        }
                    </div>
                    <Pagination path="dashborad" page={page} count={count} perPage={perPage} />
                </div>
            </div>

        </>
    )
}

export default Dashboard