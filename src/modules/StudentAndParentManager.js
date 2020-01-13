import Settings from "./Settings"


export default {
    getAllStudents() {
        return fetch(`${Settings.remoteURL}/users/?userTypeId=2&_expand=length&_expand=instrument&_expand=location&_expand=length&_expand=lessonDay`).then(e => e.json())
    },
    getStudent(id) {
        return fetch(`${Settings.remoteURL}/users/${id}/?userTypeId=2&_expand=length&_expand=instrument&_expand=location&_expand=length&_expand=lessonDay`).then(e => e.json())
    },
    getUser(id) {
        return fetch(`${Settings.remoteURL}/users/${id}/?_expand=length&_expand=instrument&_expand=location&_expand=length&_expand=lessonDay`).then(e => e.json())
    },
    getAllParents() {
        return fetch(`${Settings.remoteURL}/users/?userTypeId=3`).then(e => e.json())
    },
    getOneParent(id) {
        return fetch(`${Settings.remoteURL}/users/${id}`).then(e => e.json())
    },
    getTeacher(id) {
        return fetch(`${Settings.remoteURL}/users/${id}`).then(e => e.json())
    },
    getLessons() {
        return fetch(`${Settings.remoteURL}/lessons?_order=desc`).then(e => e.json())
    },
    getLessonsOfStudent(stId) {
        return fetch(`${Settings.remoteURL}/lessons?studentId=${stId}&_order=desc`).then(e => e.json())
    },
    getPayments() {
        return fetch(`${Settings.remoteURL}/payments?_expand=paymentMethod`).then(e => e.json())
    },
    getMiles() {
        return fetch(`${Settings.remoteURL}/milage`).then(e => e.json())
    },
    getPaymentsOfStudent(usId) {
        return fetch(`${Settings.remoteURL}/payments?userId=${usId}&_expand=paymentMethod`).then(e => e.json())
    },
    getOnePayment(id) {
        return fetch(`${Settings.remoteURL}/payments/${id}`).then(e => e.json())
    },
    
    getInstruments() {
        return fetch(`${Settings.remoteURL}/instruments`).then(e => e.json())
    },
    getLocations() {
        return fetch(`${Settings.remoteURL}/locations`).then(e => e.json())
    },
    getLengths() {
        return fetch(`${Settings.remoteURL}/lengths`).then(e => e.json())
    },
    getPaymentMethods() {
        return fetch(`${Settings.remoteURL}/paymentMethods`).then(e => e.json())
    },
    getLessonDays() {
        return fetch(`${Settings.remoteURL}/lessonDays`).then(e => e.json())
    },
    delete(id, collection) {
        return fetch(`${Settings.remoteURL}/${collection}/${id}`, {
            method: "DELETE"
        })
    },
    deleteNote(id) {
        return fetch(`${Settings.remoteURL}/lessons/${id}`, {
            method: "DELETE"
        })
    },
    getAll() {
        return fetch(`${Settings.remoteURL}/users`).then(e => e.json())
    },
    addUser(obj) {
        return fetch(`${Settings.remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json())
    },
    addNote(obj) {
        return fetch(`${Settings.remoteURL}/lessons`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json())
    },
    addPayment(obj) {
        console.log(obj)
        return fetch(`${Settings.remoteURL}/payments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json())
    },
    addMiles(obj) {
        console.log(obj)
        return fetch(`${Settings.remoteURL}/milage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json())
    },
    editUser(obj) {
        return fetch(`${Settings.remoteURL}/users/${obj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json());

    },
    editPayment(obj) {
        return fetch(`${Settings.remoteURL}/payments/${obj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json());

    },
    editLesson(obj) {
        return fetch(`${Settings.remoteURL}/lessons/${obj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json());

    },

    searchUsername(username) {
        return fetch(`${Settings.remoteURL}/users?username=${username}`).then(e =>
            e.json()
        )
    }
}
