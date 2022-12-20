const FrontPage = require('../models/frontPage');

exports.getIndex = (req, res, next) => {
  const frontPagePromise =
    FrontPage
      .findOne()
      .populate('suggestedBooks')
      .populate({
        path: 'featuredAuthor',
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { path: 'books' }
      })
      .exec();

  Promise.all([frontPagePromise]).then(([frontPage]) => {
    console.log(frontPage);
    res.render('shop/shopIndex', { frontPage });
  })
}