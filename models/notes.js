module.exports = function(sequelize, DataTypes) {
  const Notes = sequelize.define("Notes", {
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 160]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });
  Notes.associate = function(models) {
    Notes.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  // Add a belongsTo association to Clients here
  // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
  return Notes;
};
