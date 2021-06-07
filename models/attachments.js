


module.exports = (SequelizeFile) => {

    const picture = new SequelizeFile({
        attribute: 'picture',
        mimetype: /^image/,
        crop: true,
        sizes: {
          small: 64, //width 64
          big: 150, //width 150
        }
     });
  


    return picture;
  };
