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
  },

  // Auth User
  auth: function (uname, upwd) {
    let err = [];
    if (uname == "" || uname == undefined || uname == null) {
      err.push('Name is not defined')
    }
    if (upwd == "" || upwd == undefined || upwd == null) {
      err.push('Password is not defined')
    }
    return { 'errors': err };
  },

  // Create Group
  createGroup: function (gname) {
    let err = [];
    if (gname == "" || gname == undefined || gname == null) {
      err.push('Group Name is not defined')
    }
    return { 'errors': err };
  },

    // Delete Group
  deleteGroup: function (gname) {
    let err = [];
    if (gname == "" || gname == undefined || gname == null) {
      err.push('Group Name is not defined')
    }
    return { 'errors': err };
  },

  // Add user to Group
  addUserToGroup: function (gname, uname) {
    let err = [];
    if (gname == "" || gname == undefined || gname == null) {
      err.push('Group Name is not defined')
    }
    if (uname == "" || uname == undefined || uname == null) {
      err.push('Username is not defined')
    }
    return { 'errors': err };
  },

    // Delete User from Group
  deleteUserFromGroup: function (gname, uname) {
    let err = [];
    if (gname == "" || gname == undefined || gname == null) {
      err.push('Group Name is not defined')
    }
    if (uname == "" || uname == undefined || uname == null) {
      err.push('Username is not defined')
    }
    return { 'errors': err };
  },

  // Create Channel
  createChannel: function (gname, cname) {
    let err = [];
    if (gname == "" || gname == undefined || gname == null) {
      err.push('Group Name is not defined')
    }
    if (cname == "" || cname == undefined || cname == null) {
      err.push('Channel Name is not defined')
    }
    return { 'errors': err };
  },

  // Delete Channel
  deleteChannel: function (gname, cname) {
    let err = [];
    if (gname == "" || gname == undefined || gname == null) {
      err.push('Group Name is not defined')
    }
    if (cname == "" || cname == undefined || cname == null) {
      err.push('Channel Name is not defined')
    }
    return { 'errors': err };
  },

  // Add user to Channel
  addUserToChannel: function (gname, cname, uname) {
    let err = [];
    if (gname == "" || gname == undefined || gname == null) {
      err.push('Group Name is not defined')
    }
    if (cname == "" || cname == undefined || cname == null) {
      err.push('Channel Name is not defined')
    }
    if (uname == "" || uname == undefined || uname == null) {
      err.push('Username is not defined')
    }
    return { 'errors': err };
  },

    // Delete user from Channel
  deleteUserFromChannel: function (gname, cname, uname) {
    let err = [];
    if (gname == "" || gname == undefined || gname == null) {
      err.push('Group Name is not defined')
    }
    if (cname == "" || cname == undefined || cname == null) {
      err.push('Channel Name is not defined')
    }
    if (uname == "" || uname == undefined || uname == null) {
      err.push('Username is not defined')
    }
    return { 'errors': err };
  }
}


