import React, { Component } from 'react'
import Axios from 'axios'
import swal from 'sweetalert'

class department extends Component {
  constructor(props) {
    super(props)
    this.state = {
      department: [],
      id_department: '',
      name: '',
      class: {},
      teacher: [],
    }
  }

  getData() {
    const dataUser = JSON.parse(localStorage.getItem('userInfo'))

    Axios.get(`/api/department/viewById/${dataUser[0]?.id_department}`)
      .then((res) => {
        if (res.status === 200) {
          const department = res.data
          this.setState({
            department: department.department,
            class: department.class?.[0],
            teacher: department.teacher,
          })
        }
      })
      .catch((error) => console.log(error))
  }

  componentDidMount() {
    this.getData()
  }

  handleInputChange = (event) => {
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
    //console.log(this.state.name);
  }

  handleInsertDepartment = (event) => {
    //event.preventDefault();

    const newDepartment = {
      //id_department: '',
      name: this.state.name,
    }
    //console.log(this.state.name);

    Axios.post('/api/department/insert', newDepartment)
      .then((res) => {
        let department = this.state.department
        department = [newDepartment, ...department]
        this.setState({ department: department })
      })
      .catch((error) => console.log(error))
  }

  getDataDepartment = (item) => {
    console.log(item)

    this.setState({
      id_department: item.id_department,
      name: item.department_name,
    })
  }

  handleEditDepartment = (event) => {
    event.preventDefault()

    Axios.post('/api/user/edit', this.state.detailEdit)
      .then((res) => {
        this.getData()
      })
      .catch((error) => console.log(error))
  }

  deleteDepartment = (item) => {
    console.log(item)
    const departmentId = { id_department: item.id_department }
    //console.log(departmentId);
    //console.log(newsId);
    Axios.post('api/department/delete', departmentId)

      .then((res) => {
        this.setState((prevState) => ({
          department: prevState.department.filter(
            (elm) => elm.id_department !== item.id_department
          ),
        }))
        swal('Yeahh! You have successfully deleted!', {
          icon: 'success',
        })
      })
      .catch((error) => console.log(error))
  }
  render() {
    return (
      <div>
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row ">
              <div className="col-lg-2">
                {/* Large Size Modal */}
                {/* <button
                  className="btn btn-light btn-block m-1"
                  data-toggle="modal"
                  data-target="#formemodal"
                >
                  Create Department
                </button> */}
                {/* Modal */}
                <div
                  className="modal fade"
                  id="formemodal"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                      <div className="card">
                        <div className="card-header text-uppercase">
                          Create Department
                        </div>

                        <div className="card-body">
                          <form onSubmit={this.handleInsertDepartment}>
                            <div className="row">
                              <div className="col-12 col-lg-12 col-xl-12">
                                <div className="form-group row">
                                  <label className="col-sm-12 col-form-label">
                                    Name of Department
                                  </label>
                                  <div className="col-sm-10">
                                    <input
                                      type="text"
                                      name="name"
                                      className="form-control"
                                      onChange={this.handleInputChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/*end row*/}
                            <button
                              type="submit"
                              className="btn btn-light px-5"
                            >
                              <i className="icon-lock" />
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Danh sách lớp học</h5>
                    <h5 className="card-title">
                      Lớp {this.state.class.department_name}
                    </h5>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Tên học sinh</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Điện thoại</th>
                            <th scope="col">Tên bố</th>
                            <th scope="col">Số điện thoại bố</th>
                            <th scope="col">Tên mẹ</th>
                            <th scope="col">Số điện thoại mẹ</th>
                            <th scope="col">Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.department.map((item, key) => (
                            <tr key={key}>
                              <th>{key + 1}</th>
                              <th>{item.name}</th>
                              <th>{item.address}</th>
                              <th>{item.phone}</th>
                              <th>{item.mother_name}</th>
                              <th>{item.mother_phone}</th>
                              <th>{item.father_name}</th>
                              <th>{item.father_phone}</th>
                              <th>
                                <button
                                  type="button"
                                  className="btn btn-light waves-effect waves-light m-1"
                                  data-toggle="modal"
                                  data-target="#formemodaledit"
                                  onClick={() =>
                                    this.setState({
                                      detailEdit: {
                                        ...item,
                                      },
                                    })
                                  }
                                >
                                  <i className="fa fa-pencil" />
                                </button>
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Modal */}
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
                          Edit Department
                        </div>

                        <div className="card-body">
                          <form>
                            <div className="row">
                              <div className="col-12 col-lg-12 col-xl-12">
                                <div className="form-group row">
                                  <label className="col-sm-12 col-form-label">
                                    Tên
                                  </label>
                                  <div className="col-sm-10">
                                    <input
                                      type="text"
                                      name="name"
                                      className="form-control"
                                      onChange={this.handleInputChange}
                                      value={this.state.detailEdit?.name}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-12 col-form-label">
                                    Địa chỉ
                                  </label>
                                  <div className="col-sm-10">
                                    <input
                                      type="text"
                                      name="address"
                                      className="form-control"
                                      onChange={this.handleInputChange}
                                      value={this.state.detailEdit?.address}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-12 col-form-label">
                                    Điện thoại
                                  </label>
                                  <div className="col-sm-10">
                                    <input
                                      type="number"
                                      name="phone"
                                      className="form-control"
                                      onChange={this.handleInputChange}
                                      value={this.state.detailEdit?.phone}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-12 col-form-label">
                                    Tên bố
                                  </label>
                                  <div className="col-sm-10">
                                    <input
                                      type="text"
                                      name="father_name"
                                      className="form-control"
                                      onChange={this.handleInputChange}
                                      value={this.state.detailEdit?.father_name}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-12 col-form-label">
                                    Số điện thoại bố
                                  </label>
                                  <div className="col-sm-10">
                                    <input
                                      type="number"
                                      name="father_phone"
                                      className="form-control"
                                      onChange={this.handleInputChange}
                                      value={
                                        this.state.detailEdit?.father_phone
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-12 col-form-label">
                                    Tên mẹ
                                  </label>
                                  <div className="col-sm-10">
                                    <input
                                      type="text"
                                      name="mother_name"
                                      className="form-control"
                                      onChange={this.handleInputChange}
                                      value={this.state.detailEdit?.mother_name}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-12 col-form-label">
                                    Số điện thoại mẹ
                                  </label>
                                  <div className="col-sm-10">
                                    <input
                                      type="number"
                                      name="mother_phone"
                                      className="form-control"
                                      onChange={this.handleInputChange}
                                      value={
                                        this.state.detailEdit?.mother_phone
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/*end row*/}
                            <button
                              type="submit"
                              className="btn btn-light px-5"
                              onClick={this.handleEditDepartment}
                              data-toggle="modal"
                              data-target="#formemodaledit"
                            >
                              <i className="icon-lock" />
                              Sửa
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Danh sách giáo viên</h5>
                    <h5 className="card-title">
                      Lớp {this.state.class.department_name}
                    </h5>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Tên giáo viên</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Điện thoại</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.teacher.map((item, key) => (
                            <tr key={key}>
                              <th>{key + 1}</th>
                              <th>{item.name}</th>
                              <th>{item.address}</th>
                              <th>{item.phone}</th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Modal */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default department
