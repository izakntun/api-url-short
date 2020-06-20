'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShortUrl = sequelize.define('ShortUrl', {
    original: DataTypes.TEXT,
    short: DataTypes.STRING
  }, {});
  ShortUrl.associate = function(models) {
    // associations can be defined here
  };
  return ShortUrl;
};