import { Tabs } from 'antd'
import { Component } from 'react'
import './SearchTab.css'

export default class SearchTab extends Component {
  state = {
    search: true,
  }

  onChange = () => {
    // this.setState(({ search }) => {
    //   return { search: !search }
    // })
    this.props.toggleSearch()
    this.props.updateList(undefined, undefined, !this.props.searchStatus)
  }

  render() {
    return (
      <Tabs
        defaultActiveKey="1"
        onChange={this.onChange}
        items={[
          {
            label: 'Search',
            key: '1',
            // children: 'Content of Tab Pane 1',
          },
          {
            label: 'Rated',
            key: '2',
            // children: 'Content of Tab Pane 2',
          },
        ]}
      />
    )
  }
}
