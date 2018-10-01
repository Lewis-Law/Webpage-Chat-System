var assert = require('assert');
const express = require('express');
const app = express();
const helpers = require('../includes/helpers.js');

describe('Always true test', function () {
  it('should always equal true 1=1', function () {
    assert.equal(1, 1);
  });
});


//Register User
describe('Register User Function - Missing data param 1', function () {
  it('null, "a", "a", "a" - should have one error message', function () {
    assert.equal(helpers.register(null, "a", "a", "a").errors.length, 1);
  });
  it('Error Message is - Name is not defined', function () {
    assert.equal(helpers.register(null, "a", "a", "a").errors[0], 'Name is not defined');
  });
});

describe('Register User Function - Missing data param 2', function () {
  it('"a", null , "a", "a" - should have one error message', function () {
    assert.equal(helpers.register("a", null , "a", "a").errors.length, 1);
  });
  it('Error Message is - Password is not defined', function () {
    assert.equal(helpers.register("a", null, "a", "a").errors[0], 'Password is not defined');
  });
});

describe('Register User Function - Missing data param 3', function () {
  it('"a", "a", null, "a" - should have one error message', function () {
    assert.equal(helpers.register("a", "a", null, "a").errors.length, 1);
  });
  it('Error Message is - Email is not defined', function () {
    assert.equal(helpers.register("a", "a", null, "a").errors[0], 'Email is not defined');
  });
});

describe('Register User Function - Missing data param 4', function () {
  it('"a", "a", "a", null - should have one error message', function () {
    assert.equal(helpers.register("a", "a", "a", null).errors.length, 1);
  });
  it('Error Message is - Role is not defined', function () {
    assert.equal(helpers.register("a", "a", "a", null).errors[0], 'Role is not defined');
  });
});

// Delete user
describe('Delete User Function - Missing data param 1', function () {
  it('null - should have one error message', function () {
    assert.equal(helpers.delete(null).errors.length, 1);
  });
  it('Error Message is - Name is not defined', function () {
    assert.equal(helpers.delete(null).errors[0], 'Name is not defined');
  });
});

//Auth User
describe('Auth User Function - Missing data param 1', function () {
  it('null, "a" - should have one error message', function () {
    assert.equal(helpers.auth(null, "a").errors.length, 1);
  });
  it('Error Message is - Name is not defined', function () {
    assert.equal(helpers.auth(null, "a").errors[0], 'Name is not defined');
  });
});

describe('Auth User Function - Missing data param 2', function () {
  it('"a", null - should have one error message', function () {
    assert.equal(helpers.auth("a", null).errors.length, 1);
  });
  it('Error Message is - Password is not defined', function () {
    assert.equal(helpers.auth("a", null).errors[0], 'Password is not defined');
  });
});