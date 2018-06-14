import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../redux/actions/actions'

class DialogModal extends Component {

  state = {
    open: false,
  }

  componentDidMount () {
    const self = this
    document.getElementById('modal_btn').addEventListener('click', function () {
      self.handleOpen()
    })
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ]

    return (
      <div>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          {this.props.message}
        </Dialog>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    ...state,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

const ConfirmationModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogModal)

