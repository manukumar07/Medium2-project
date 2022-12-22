import React, { useEffect } from 'react'
import '../scss/components/_home.scss'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import fetchAllPost from '../store/asyncMethods/fetchAllPosts.js'
import Pagination from './Pagination.js';
import moment from "moment";
import toast, { Toaster } from "react-hot-toast"
import Loading from './Loading.js';
import { htmlToText } from 'html-to-text';
import { Link } from 'react-router-dom';


function Home() {
  let { page } = useParams();
  const dispatch = useDispatch();
  if (page === undefined) {
    page = 1;
  }
  const { posts, count, perPage } = useSelector(state => state.fetchReducer)
  const { loading } = useSelector(state => state.authReducer)

  useEffect(() => {
    dispatch(fetchAllPost(page))
  }, [page])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home..</title>
      </Helmet>
      <div className='home-container'>
        <div className={loading ? "hidden" : "home-smaller"}>
          {loading ? <Loading /> : posts.length > 0 ?
            posts.map((content) =>
              <div className='home-items' key={content._id}>
                <div className='home-left'>
                  <div className='avatar'>
                    <span className='avatar-left'>
                      {content.userName[0]}
                    </span>
                    <div className='avatar-right'>
                      <span>{content.userName}</span>
                      <span>{moment(content.updatedAt).format("MMM Do YY")}</span>
                    </div>
                  </div>
                  <div className='content-title'>
                    <Link to={'/details/' + content._id}>
                      {content.title}
                    </Link>
                  </div>
                  <div className='content-body'>
                    {htmlToText(content.body).slice(0, 200) + '....'}
                  </div>
                </div>
                <div className='home-right'>
                  <img className='home-right-image' src={'/images/' + content.image}></img>
                </div>
              </div>)
            : <div >""</div>}
          {loading ? "" : <Pagination path="home" page={page} count={count} perPage={perPage} />}
        </div>
      </div>
    </>
  )
}

export default Home