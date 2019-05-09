import React, { Component } from 'react'

export default class FormHtmlEditor extends Component {
  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill')
    }
  }

  render() {
    const ReactQuill = this.ReactQuill
    if (typeof window !== 'undefined' && ReactQuill) {
      return (
        <ReactQuill
          onChange={this.props.onChange}
          theme="bubble"
          value={this.props.value}
        />
      )
    } else {
      return <textarea />;
    }
  }
}