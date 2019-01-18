const admin = require('firebase-admin');
const { firestoreConfig } = require('./constants');

admin.initializeApp({ credential: admin.credential.cert(firestoreConfig) });

function handler(snap) {
  const added = snap.docChanges()
    .filter(({ type }) => type === 'added')
    .map(({ doc }) => ({ id: doc.id, ...doc.data() }));
  (added.length) && this.cb(added);
}

class FirestoreHelper {
  constructor(collection, updateCb) {
    const db = admin.firestore();
    this._collection = db.collection(collection);
    this.cb = () => this.cb = updateCb;
    this._collection.onSnapshot(handler.bind(this));
  }

  async getById(id) {
    const document = await this._collection.doc(id).get();
    return this.formatDocument(document);
  }

  async updateById(id, data) {
    await this._collection.doc(id).update(data);
    const document = await this._collection.doc(id).get();
    return this.formatDocument(document);
  }

  formatDocument(document) {
    const data = document.data();
    return !data ? null : { 
      ...data,
      createTime: document.createTime.toDate()
    };
  }
}

module.exports = FirestoreHelper;
