import React, { Component } from 'react'
import Axios from 'axios'
import swal from 'sweetalert'
import moment from 'moment'
import Select from 'react-select'

class resign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resign: [],
      title: '',
      content: '',
      date: '',
      status: '',
      news: [],
      resignById: [],
      id_resign1: '',
      detail: '',
    }
  }
  componentDidMount() {
    this.getDataResign()
    this.getUser()
  }
  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  handleInputChangeEdit = (event) => {
    const target = event.target
    const value = target.value

    const name = target.name

    const old = this.state.detailEdit || {}
    this.setState({
      detailEdit: {
        ...old,
        [name]: value,
      },
    })
  }
  getUser = () => {
    Axios.get('/api/account/views')
      .then((res) => {
        if (res.status === 200) {
          const news = res.data
          this.setState({ news: news.news })
        }
      })
      .catch((error) => console.log(error))
  }
  //For Employee
  getDataResign = () => {
    Axios.get('/api/resign/views')
      .then((res) => {
        if (res.status === 200) {
          const resign = res.data
          this.setState({
            resign: resign.resign,
          })
        }
      })
      .catch((error) => console.log(error))
  }

  //For Admin
  getDataResignById = (item) => {
    Axios.get(`/api/resign/viewsById/${item}`)
      .then((res) => {
        if (res.status === 200) {
          const resignById = res.data
          this.setState({
            resignById: resignById.resignById,
          })
        }
      })
      .catch((error) => console.log(error))
  }
  handleInsertResign = (event) => {
    event.preventDefault()
    var dataUser = JSON.parse(localStorage.getItem('userInfo'))
    const newResign = {
      title: this.state.detailEdit.title,
      content: this.state.detailEdit.content,
      date: this.state.detailEdit.date,
    }

    Axios.post(`/api/resign/edit/${this.state.detailEdit.id_resign}`, newResign)
      .then((res) => {
        this.getDataResign()
      })
      .catch((error) => console.log(error))
  }

  handleEditResign = (event) => {
    event.preventDefault()
    var dataUser = JSON.parse(localStorage.getItem('userInfo'))
    const newResign = {
      //id_department: '',
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      status: '0',
    }

    Axios.post(`/api/resign/insert/${dataUser[0].id}`, newResign)
      .then((res) => {
        this.getDataResign()
      })
      .catch((error) => console.log(error))
  }

  handleEditrResign = (item) => {
    this.setState({
      id_resign1: item,
    })
    const newEditrResign = {
      id_resign: item,
      status: 1,
    }

    Axios.post('/api/resign/edit', newEditrResign)
      .then((res) => {
        let key = this.state.id_resign1
        this.setState((prevState) => ({
          resignById: prevState.resignById.map((elm) =>
            elm.id_resign === key
              ? {
                  ...elm,
                  status: 1,
                }
              : elm
          ),
          resign: prevState.resign.map((elm) =>
            elm.id_resign === key
              ? {
                  ...elm,
                  status: 1,
                }
              : elm
          ),
        }))
      })
      .catch((error) => console.log(error))
  }

  remove = (id) => {
    Axios.delete(`/api/resign/${id.id_resign}`)
      .then((res) => {
        this.getDataResign()
      })
      .catch((error) => console.log(error))
  }

  render() {
    var dataUser = JSON.parse(localStorage.getItem('userInfo'))

    return (
      <div>
        <div className="content-wrapper">
          <div className="container-fluid">
            {dataUser[0].role == 1 && (
              <div className="row">
                <div className="col-lg-8">
                  <div className="card">
                    <div className="card-body">
                      <form id="personal-info" noValidate="novalidate">
                        <h4 className="form-header">
                          {' '}
                          <i className="fa fa-file-text-o" />
                          Tin tức
                        </h4>
                        <div className="form-group row">
                          <label
                            htmlFor="input-5"
                            className="col-sm-2 col-form-label"
                          >
                            Tiêu đề
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              id="input-5"
                              name="title"
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            htmlFor="input-9"
                            className="col-sm-2 col-form-label"
                          >
                            Nội dung
                          </label>
                          <div className="col-sm-10">
                            <textarea
                              className="form-control"
                              rows={4}
                              id="input-9"
                              name="content"
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-2 col-form-label">
                            Ngày tháng{' '}
                          </label>
                          <div class="col-sm-10">
                            <input
                              type="date"
                              class="form-control"
                              name="date"
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="form-footer">
                          <button
                            type="submit"
                            className="btn btn-success"
                            onClick={this.handleEditResign}
                          >
                            <i className="fa fa-check-square-o" /> SEND
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* <div className="col-lg-4">
                                <div id="accordion3">
                                    <div className="card mb-2">
                                        <div className="card-header bg-success">
                                            <button className="btn btn-link text-white shadow-none collapsed" data-toggle="collapse" data-target="#collapse-7" aria-expanded="false" aria-controls="collapse-7">
                                                FAQ #1
                                            </button>
                                        </div>
                                        <div id="collapse-7" className="collapse" data-parent="#accordion3" style={{}}>
                                            <div className="card-body">
                                                If you take a break greater than or equal to 5 days. You will be deducted 15% of your salary
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-2">
                                        <div className="card-header bg-warning">
                                            <button className="btn btn-link text-white shadow-none collapsed" data-toggle="collapse" data-target="#collapse-8" aria-expanded="false" aria-controls="collapse-8">
                                                FAQ #2
                                            </button>
                                        </div>
                                        <div id="collapse-8" className="collapse" data-parent="#accordion3">
                                            <div className="card-body">
                                                If your stay is greater than or equal to 10 days. 50% of your salary will be deducted
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header bg-info">
                                            <button className="btn btn-link text-white shadow-none collapsed" data-toggle="collapse" data-target="#collapse-9" aria-expanded="false" aria-controls="collapse-9">
                                                FAQ #3
                                            </button>
                                        </div>
                                        <div id="collapse-9" className="collapse" data-parent="#accordion3">
                                            <div className="card-body">
                                                If your vacation is greater than or equal to 15 days. 80% of your salary will be deducted
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
              </div>
            )}
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Danh sách tin tức</h5>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">No.</th>
                            {/* <th scope="col">Name</th> */}
                            <th scope="col">Tiêu đề</th>
                            <th scope="col">Nội dung</th>
                            <th scope="col">Ngày tháng</th>
                            {/* <th scope="col">Status</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.resign.map((item, key) => (
                            <tr key={item.id_resign}>
                              <th>{key + 1}</th>
                              {/* <th>{item.id_account}</th> */}
                              <th>{item.title}</th>
                              <th style={{ maxWidth: '200px' }}>
                                <div
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  {item.content}
                                </div>
                              </th>
                              <th>{moment(item.date).format('DD/MM/YYYY')}</th>
                              {/* <th>{item.status}</th> */}
                              <th>
                                <button
                                  type="button"
                                  className="btn btn-light waves-effect waves-light m-1"
                                  data-toggle="modal"
                                  data-target="#formemodaledit"
                                  onClick={() =>
                                    this.setState({ detail: item })
                                  }
                                >
                                  <i className="fa fa-eye" />
                                </button>
                                {dataUser[0].role == 1 && (
                                  <button
                                    type="button"
                                    className="btn btn-light waves-effect waves-light m-1"
                                    data-toggle="modal"
                                    data-target="#formemodaledit2"
                                    onClick={() =>
                                      this.setState({
                                        detailEdit: {
                                          ...item,
                                          date: moment(item.date).format(
                                            'YYYY-MM-DD'
                                          ),
                                        },
                                      })
                                    }
                                  >
                                    <i className="fa fa-pencil" />
                                  </button>
                                )}
                                {dataUser[0].role == 1 && (
                                  <button
                                    type="button"
                                    className="btn btn-light waves-effect waves-light m-1"
                                    onClick={() => this.remove(item)}
                                  >
                                    <i className="fa fa-trash" />
                                  </button>
                                )}
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="formemodaledit"
              style={{ display: 'none' }}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                  <div className="card">
                    <div className="card-header text-uppercase">
                      Chi tiết tin tức
                    </div>
                    <div className="card-body">
                      <div>Tiêu đề: {this.state.detail.title}</div>
                      <div>Nội dung: {this.state.detail.content}</div>
                      <div>
                        Ngày tháng:{' '}
                        {moment(this.state.detail.date).format('DD/MM/YYYY')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="formemodaledit2"
              style={{ display: 'none' }}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content p-4">
                  <form id="personal-info" noValidate="novalidate">
                    <h4 className="form-header">
                      {' '}
                      <i className="fa fa-file-text-o" />
                      Tin tức
                    </h4>
                    <div className="form-group row">
                      <label
                        htmlFor="input-5"
                        className="col-sm-2 col-form-label"
                      >
                        Tiêu đề
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="input-5"
                          value={this.state.detailEdit?.title}
                          name="title"
                          onChange={this.handleInputChangeEdit}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="input-9"
                        className="col-sm-2 col-form-label"
                      >
                        Nội dung
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control"
                          rows={4}
                          id="input-9"
                          name="content"
                          value={this.state.detailEdit?.content}
                          onChange={this.handleInputChangeEdit}
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Ngày tháng </label>
                      <div class="col-sm-10">
                        <input
                          type="date"
                          class="form-control"
                          name="date"
                          onChange={this.handleInputChangeEdit}
                          value={this.state.detailEdit?.date}
                        />
                      </div>
                    </div>
                    <div className="form-footer">
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={this.handleInsertResign}
                        data-toggle="modal"
                        data-target="#formemodaledit2"
                      >
                        <i className="fa fa-check-square-o" /> SEND
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default resign
