import React, { Component } from 'react'
import './FormInput.css'
import { Input } from 'antd'
import { debounce } from 'lodash'

export default class FormInput extends Component {
  state = {
    inputValue: '',
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.toSearch(this.state.inputValue)
  }

  onInputChange = (e) => {
    this.props.togglePage()
    // слушает введенный инпут, вносит в state компонента
    let inputValue = e.target.value
    this.setState({
      inputValue: inputValue,
    })

    this.debouncedSearch(inputValue)
  }

  debouncedSearch = debounce(async (value) => {
    this.props.toSearch(value)
  }, 3000)

  render() {
    return (
      <Input
        placeholder="Type to search..."
        onPressEnter={this.onSubmit}
        value={this.state.inputValue}
        onChange={this.onInputChange}
        allowClear={true}
        size={'small'}
      />
    )
  }
}
