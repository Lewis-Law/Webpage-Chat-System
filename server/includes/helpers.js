module.exports = {

  // Register User
  register: function (uname, upwd, uemail, urole) {
    let err = [];
    if (uname == "" || uname == undefined || uname == null) {
      err.push('Name is not defined')
    }
    if (upwd == "" || upwd == undefined || upwd == null) {
      err.push('Password is not defined')
    }
    if (uemail == "" || uemail == undefined || uemail == null) {
      err.push('Email is not defined')
    }
    if (urole == "" || urole == undefined || urole == null) {
      err.push('Role is not defined')
    }
    return { 'errors': err };
  },

    // Delete User
  delete: function (uname) {
    let err = [];
    if (uname == "" || uname == undefined || uname == null) {
      err.push('Name is not defined')
    }
    return { 'errors': err };
  }
}
