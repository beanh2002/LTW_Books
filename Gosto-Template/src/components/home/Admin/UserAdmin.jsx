import React from "react";
import "./useradmin.css";

const UserAdmin = ({ info }) => {
  return (
    <>
      {/* <HeaderAdmin /> */}
      <div className="container">
        <div className="row">
          <h1>List User</h1>
        </div>
        <table className="table__user">
          <thead className="table__user-head">
            <tr>
              <th>Id</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody classNameName="table__user-body">
            {info.map((info) => (
              <tr key={info.id}>
                <td>{info.id}</td>
                <td>{info.username}</td>
                <td>{info.email}</td>
                <td>
                  <a className="btn-update">
                    <i class="far fa-edit"></i>
                  </a>
                  <a className="btn-delete">
                    <i class="fas fa-trash"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserAdmin;
