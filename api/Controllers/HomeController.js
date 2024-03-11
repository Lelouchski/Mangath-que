module.exports = {
  get: async (req, res) => {
    // res.render('HomePage', {layout: 'admin'}) pour enlever le footer en admin
    res.render('HomePage')
  },
}