const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("compra", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: true,
      primaryKey: true,
    },
  });
};
