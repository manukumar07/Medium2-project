import React from 'react'
import { Link } from 'react-router-dom';
import '../scss/components/_pagination.scss'
import { useSelector } from 'react-redux';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";


function Pagination({ path ,page, count, perPage }) {
    const store = [];
    const { loading } = useSelector(state => state.authReducer)
    let totalPages = Math.ceil(count / perPage);
    let startLoop = page;
    let diff = totalPages - page;
    if (diff <= 4) {
      startLoop = totalPages - 4;
    }
    let endLoop = startLoop + 4;
    if (startLoop <= 0)
      startLoop = 1;

    const leftSide = () => {
      if (1 < page)
        return (<li><Link to={"/" + path +"/" + (parseInt(page) - 1)}><AiOutlineArrowLeft /></Link></li>)
    }
    const links = () => {
      for (let i = startLoop; i <= endLoop; i++) {
        store.push(<li className={page === i ? "active" : ''}><Link to={'/' + path + '/' + i}>{i}</Link></li>)
      }
      return store;
    }
    const rightSide = () => {
      if (page < totalPages)
        return (<li><Link to={"/" + path + "/" + (parseInt(page) + 1)}><AiOutlineArrowRight /></Link></li>)
    }


    return (
      (totalPages && !loading && count>4)
        ? <div className='pagination'>{leftSide()}{links()}{rightSide()}</div> : ""
    )
  }

export default Pagination