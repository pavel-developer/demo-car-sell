const axios = require('axios');
const firestoreApiUrl = process.env.FIRESTORE_API_URL;

function parseData({ fields, createTime }) {
  return Object.assign(Object.keys(fields).reduce((acc, field) => ({ ...acc, [field]: fields[field].stringValue }), {}), { createTime });
}

function queryForUpdate(fieldsToUpdate) {
  return fieldsToUpdate.reduce((acc, field) => `${acc}updateMask.fieldPaths=${field}&`, '');
}

function bodyForUpdate(data) {
  return { fields: Object.keys(data).reduce((acc, field) => ({ ...acc, [field]: { stringValue: data[field] }}),{})};
}

async function getById(collection, id) {
  const { data } = await axios.get(`${firestoreApiUrl}/${collection}/${id}`);
  return parseData(data);
}

async function updateById(collection, id, data, fieldsToUpdate) {
  const { data: updatedData } = await axios.patch(`${firestoreApiUrl}/${collection}/${id}?${queryForUpdate(fieldsToUpdate)}`, bodyForUpdate(data));
  return parseData(updatedData);
}
module.exports = {
  getById,
  updateById
}
