import Axios from 'axios'
import React, { useEffect, useState } from 'react'

const Account = () => {
  const [state, setState] = useState({})

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    setState((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdate = () => {
    const dataUser = JSON.parse(localStorage.getItem('userInfo'))
    Axios.post(`/api/user/edit`, {
      ...state,
      id_account: dataUser?.[0].id,
    }).then(() => {
      const dataUser = JSON.parse(localStorage.getItem('userInfo'))

      Axios.get(`/api/account/getById/${dataUser?.[0].id}`).then((res) => {
        setState(res.data?.[0])
      })
    })
  }

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem('userInfo'))

    Axios.get(`/api/account/getById/${dataUser?.[0].id}`).then((res) => {
      setState(res.data?.[0])
    })
  }, [])

  return (
    <div>
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <form id="personal-info" noValidate="novalidate">
                    <h4 className="form-header">
                      <i className="fa fa-file-text-o" />
                      Tài khoản
                    </h4>
                    <div className="form-group row">
                      <label
                        htmlFor="input-5"
                        className="col-sm-2 col-form-label"
                      >
                        Tên
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="input-5"
                          name="name"
                          onChange={handleInputChange}
                          value={state.name}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="input-9"
                        className="col-sm-2 col-form-label"
                      >
                        Số điện thoại
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          id="input-9"
                          name="phone"
                          onChange={handleInputChange}
                          value={state.phone}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="input-9"
                        className="col-sm-2 col-form-label"
                      >
                        Địa chỉ
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          id="input-9"
                          name="address"
                          onChange={handleInputChange}
                          value={state.address}
                        />
                      </div>
                    </div>

                    <div className="form-footer">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleUpdate}
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
    </div>
  )
}

export default Account
