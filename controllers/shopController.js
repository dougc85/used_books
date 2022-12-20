const FrontPage = require('../models/frontPage');

exports.getIndex = (req, res, next) => {
  const frontPagePromise = FrontPage.findOne().populate('featuredAuthor').populate('suggestedBooks').exec();

  Promise.all([frontPagePromise]).then(([frontPage]) => {
    console.log(frontPage);
    res.render('shop/shopIndex', { frontPage });
  })
}