const path = require('path');
const bodyParser = require('body-parser');
const {
  breadFetch,
  cheeseFetch,
  topsFetch,
  getUnique,
  clickedBooks
} = require('../helpers/helper')


exports.index = async (req, res) => {
  res.render('index');
}

exports.about = (req, res) => {
  res.render('about');
}

exports.handleRequest = async (req, res) => {
  res.render('detail');

}
exports.notFound = (req, res) => {
  res.render('notFound');
}
