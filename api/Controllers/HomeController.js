const Manga = require('../Models/MangaModel')
const Kind = require('../Models/KindModel')
 
 module.exports = {
  get: async (req, res) => {
    // res.render('HomePage', {layout: 'admin'}) pour enlever le footer en admin
    res.render('HomePage')
  },

}