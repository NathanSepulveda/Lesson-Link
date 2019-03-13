import Settings from "./Settings"


export default {
    getAllStudents() {
        return fetch(`${Settings.remoteURL}/users/?userTypeId=2&_expand=length&_expand=instrument&_expand=location&_expand=length&_expand=lessonDay`).then(e => e.json())
    },
    getStudent(id) {
        return fetch(`${Settings.remoteURL}/users/${id}/?userTypeId=2&_expand=length&_expand=instrument&_expand=location&_expand=length&_expand=lessonDay`).then(e => e.json())
    },
    getAllParents() {
        return fetch(`${Settings.remoteURL}/users/?userTypeId=3`).then(e => e.json())
    },
    getTeacher(id) {
        return fetch(`${Settings.remoteURL}/users/${id}`).then(e => e.json())
    },
    getLessons() {
        return fetch(`${Settings.remoteURL}/lessons`).then(e => e.json())
    },
    getLessonsOfStudent(stId) {
        return fetch(`${Settings.remoteURL}/lessons?studentId=${stId}`).then(e => e.json())
    },
    getPayments() {
        return fetch(`${Settings.remoteURL}/payments`).then(e => e.json())
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
    delete(id) {
        return fetch(`${Settings.remoteURL}/users/${id}`, {
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
    editUser(obj) {
        return fetch(`${Settings.remoteURL}/users/${obj.id}`, {
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
