import React from 'react'
import { useSelector } from 'react-redux'
import moment from "moment";
import '../scss/components/comment.scss'

function Comments() {
  const { comments } = useSelector(state => state.profileReducer);
  const { loading } = useSelector(state => state.authReducer)
  return (
    <div className='main-comment'>
      {comments.length > 0 ?
        comments.map((data) =>
          <div className='comment-smaller'>
            <div className='comment-avatar'>
              <span className='avatar-name'>
                {data.userName}
              </span>
              <span className='avatar-date'>
              {moment(data.updatedAt).format("MMM Do YY")}
              </span>
            </div>
            <div>
              <div className='comment-box'>
                {data.comment}
              </div>
            </div>
          </div>)
        : <div>No Comment</div>}
    </div>
  )
}

export default Comments