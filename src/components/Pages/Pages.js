import { Component } from 'react'
import { Pagination } from 'antd'
import './Pages.css'

export default class Pages extends Component {
  state = {
    current: 1,
  }

  render() {
    const { togglePage, currentPage, totalPages } = this.props
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
}
