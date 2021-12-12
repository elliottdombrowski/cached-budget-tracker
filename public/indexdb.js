//REQUEST DB INSTANCE
let db;
let budget_db_version;

const req = indexedDB.open('BudgetTrackerDB', budget_db_version || 1);

req.onupgradeneeded = function (e) {
    console.log('indexedDB upgraded needed');

    const { oldVersion } = e;
    const newVersion = e.newVersion ||db.version;

    console.log(`IndexedDB upgraded from ${oldVersion} to ${newVersion}`)
    db = e.target.result;

    if(db.objectStoreNames.length === 0) {
        db.createObjectStore('BudgetTrackerStore', {
            autoIncrement: true
        })
    }
};

req.onerror = function (e) {
    console.log(`${e.target.errorCode}`);
};

const checkDatabase = () => {
    let transaction = db.transaction([
        'BudgetTrackerStore'
    ],
    'readwrite'
    );

    const store = transaction.objectStore('BudgetTrackerStore');
    const getAll = store.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept:
                    'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            }).then((response) => response.json()).then((res) => {
                if(res.length !== 0) {
                    transaction = db.transaction([
                        'BudgetTrackerStore'
                    ],
                    'readwrite'
                    );
                    const currentStore = transaction.objectStore('BudgetTrackerStore');
                    currentStore.clear();
                }
            });
        }
    };
};


req.onsuccess = function (e) {
    db = e.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
};

const saveRecord = (record) => {
    const transaction = db.transaction([
        'BudgetTrackerStore'
    ],
    'readwrite'
    );

    const store = transaction.objectStore('BudgetTrackerStore');
    store.add(record);
};

window.addEventListener('online', checkDatabase);