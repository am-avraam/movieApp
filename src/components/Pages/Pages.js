import { Component } from 'react'
import { Pagination } from 'antd'
import './Pages.css'

export default class Pages extends Component {
  // const Pages = ({ togglePage }) => {
  //   let current = this.props.current
  state = {
    current: 1,
  }

  render() {
    const { togglePage, currentPage } = this.props
    return <Pagination onChange={(page) => togglePage(page)} current={currentPage} total={50} />
  }
}
