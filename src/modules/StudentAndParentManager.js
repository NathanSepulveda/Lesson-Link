import Settings from "./Settings"


export default {
    getAllStudents() {
        return fetch(`${Settings.remoteURL}/users.json`).then(e => e.json()
        .then(users => users.filter(u => u.userTypeId == 2)))
    },
    getStudent(id) {
        return fetch(`${Settings.remoteURL}/users/${id}.json`).then(e => e.json())
    },
    getUnexpandedStudent(id) {
        return fetch(`${Settings.remoteURL}/users/${id}.json`).then(e => e.json())
    },
    getAllParents() {
        return fetch(`${Settings.remoteURL}/users.json`).then(user => user).then(u => u.json().then(parents => parents.filter(p => p.userTypeId === 3)))
    },
    getOneParent(id) {
        return fetch(`${Settings.remoteURL}/users/${id}.json`).then(e => e.json())
    },
    getTeacher(id) {
        return fetch(`${Settings.remoteURL}/users/${id}.json`).then(e => e.json())
    },
    getLessons() {
        return fetch(`${Settings.remoteURL}/lessons.json`).then(e => e.json())
    },
    getLessonsOfStudent(stId) {
        return fetch(`${Settings.remoteURL}/lessons.json`).then(e => e.json().then(lessons => lessons.filter(ls => ls.studentId == stId)))
    },
    getPayments() {
        return fetch(`${Settings.remoteURL}/payments.json`).then(e => e.json())
    },
    getMiles() {
        return fetch(`${Settings.remoteURL}/milage.json`).then(e => e.json())
    },
    getPaymentsOfStudent(usId) {
        return fetch(`${Settings.remoteURL}/payments.json`).then(e => e.json().then(payments => payments.filter(ps => ps.userId == usId)))
    },
    getOnePayment(id) {
        return fetch(`${Settings.remoteURL}/payments/${id}.json`).then(e => e.json())
    },
    delete(id, collection) {
        return fetch(`${Settings.remoteURL}/${collection}/${id}.json`, {
            method: "DELETE"
        })
    },
    deleteNote(id) {
        return fetch(`${Settings.remoteURL}/lessons/${id}.json`, {
            method: "DELETE"
        })
    },
    getAll() {
        return fetch(`${Settings.remoteURL}/users.json`).then(e => e.json())
    },
    addUser(obj) {
        return fetch(`${Settings.remoteURL}/users.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json())
    },
    addNote(obj) {
        return fetch(`${Settings.remoteURL}/lessons.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json())
    },
    addPayment(obj) {
        console.log(obj)
        return fetch(`${Settings.remoteURL}/payments.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json())
    },
    addMiles(obj) {
        console.log(obj)
        return fetch(`${Settings.remoteURL}/milage.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json())
    },
    editUser(obj) {
        return fetch(`${Settings.remoteURL}/users/${obj.id}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json());

    },
    editPayment(obj) {
        return fetch(`${Settings.remoteURL}/payments/${obj.id}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json());

    },
    editLesson(obj) {
        return fetch(`${Settings.remoteURL}/lessons/${obj.id}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json());

    },

    searchUsername(username) {
        return fetch(`${Settings.remoteURL}/users?username=${username}.json`).then(e =>
            e.json()
        )
    }
}
