const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // or configure storage

app.post('/listings', upload.single('listing[image]'), async (req, res) => {
  const { listing } = req.body;
  listing.image = req.file.path; // store path or upload to cloud
  await Listing.create(listing);
  res.redirect('/listings');
});
