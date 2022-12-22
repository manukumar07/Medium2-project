import React from 'react'
import { Helmet } from 'react-helmet'
import '../../scss/components/_NotFound.scss'
function NotFound() {
  return (<>
    <Helmet>
        <title>404! Not found.</title>
    </Helmet>
    <div className='main bg-grey'>
        <div className='_notFound'>
            <h1>404</h1>
            <span>Opps! That page not found.</span>
        </div>
    </div>
  </>
  )
}

export default NotFound