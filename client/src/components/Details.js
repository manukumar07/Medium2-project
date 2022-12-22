import React, { useEffect, useState } from 'react'
import '../scss/components/_home.scss'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from "moment";
import Loading from './Loading.js';
import { htmlToText } from 'html-to-text';
import fetchdetails from "../store/asyncMethods/details.js"
import '../scss/components/_details.scss'
import postComment from '../store/asyncMethods/postComments';
import Comments from './Comments.js';

function Details() {
  let { id } = useParams();
  const [comment,setComment] = useState("")
  const dispatch = useDispatch();
  const { loading ,user} = useSelector(state => state.authReducer)
  const {details} = useSelector(state => state.updateReducer)

  const submitComment = (e) =>
  {
    e.preventDefault();
    dispatch(postComment({postId:details._id,comment,userName:user.name}))
    dispatch(fetchdetails(id));
  }

  useEffect(() => {
    dispatch(fetchdetails(id));
  }, [id])


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{details.title}</title>
      </Helmet>
      <div className='home-container bg-light'>
        <div className='home-smaller'>
          {loading ? <Loading /> : 
              <div className='home-items border-none'>
                <div className='home-left'>
                  <div className='avatar'>
                    <div className='avatar-right'>
                      <span>{details.userName}</span>
                      <span>{moment(details.updatedAt).format("MMM Do YY")}</span>
                    </div>
                  </div>
                  <div className='content-title'>
                      {details.title}
                  </div>
                  <div className='content-desc'>
                    {details.description}
                  </div>
                  <div className='content-body'>
                    {htmlToText(details.body)}
                  </div>
                </div>
                <div className='home-right'>
                  <img className='home-right-image' src={'/images/' + details.image}></img>
                </div>
              </div>}
              { loading ? "" : user ? <div className='detail-form'>
                <form>
                    <input type='text' className='detail-inp ' onChange={(e)=>setComment(e.target.value)} value={comment} placeholder='Enter Comment.'></input>
                    <input type='submit' onClick={submitComment} value="Submit" className='submit-detail'></input>
                </form>
                <Comments/>
                </div>: "" }
        </div>
      </div>
    </>
  )
}

export default Details