var db = new Dexie("Todo_Database");

// DB with single table "students" with primary key "id" and
// indexes on properties "name" and "city"
db.version(1).stores({
    todo: `
        ++id,
        rname,
        dd,
        asname`,
});

function getAllRemindersFromDB() {
    if (db && db.todo) { // check if db and the students table are created
        return db.todo.toArray().then((data) => {
            return data
        })
    } else {
        return undefined
    }
}

function addReminderToDB(rname,dd,asname) {
    db.todo.put({rname,dd,asname })
        .then(() => true)
        .catch(err => {
            alert("Ouch... " + err);
        });
}

async function queryByName(name) {
    if (name === undefined) return 0
    return await db.todo
        .filter((todo) => {
            return todo.rname === name
        })
        .toArray()
}


// Ref -> https://dexie.org/docs/Tutorial/Hello-World