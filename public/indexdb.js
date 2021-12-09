//REQUEST DB INSTANCE
const req = indexedDB.open("firstDatabase", 1);

req.onsuccess = event => {
    console.log(req.result);
};