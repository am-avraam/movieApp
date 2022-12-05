import { Component } from 'react'
import { Pagination } from 'antd'
import './Pages.css'

const Pages = ({ togglePage, currentPage, totalPages }) => {
  return (
    <Pagination
      onChange={(page) => togglePage(page)}
      current={currentPage}
      total={totalPages * 10}
      showSizeChanger={false}
      hideOnSinglePage={true}
    />
  )
}

export default Pages
