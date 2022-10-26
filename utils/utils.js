const client = require('../config/connection');

exports.internalServerError = (error) => {
  return { status: 'error', message: error };
};

exports.getDataByField = async (tableName, fieldName, id) => {
  const { rows } = await client.query(`SELECT * FROM ${tableName} WHERE ${fieldName} = '${id}'`);

  return rows;
};
