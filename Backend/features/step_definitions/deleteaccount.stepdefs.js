const request = require('supertest');
const assert = require('assert');
const { Given, When, Then, And } = require('@cucumber/cucumber');

const app = require('../../server');
const Student = require("../../Models/student");
const { connect, clearDatabase, closeDatabase } = require('../../testdb');