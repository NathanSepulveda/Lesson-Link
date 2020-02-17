import Settings from "./Settings"

function objectToArray(obj) {

    let arr = []
    let keys = Object.keys(obj)

    keys.forEach(key => {
        obj[key].id = key
        arr.push(obj[key])

    })
    return arr
}

export default {
    getAllStudents() {
        return fetch(`${Settings.remoteURL}/users.json`).then(e => e.json().then(studentObject => {
            
                let studentsArr = []
                let keys = Object.keys(studentObject)

                keys.forEach(key => {
                    studentObject[key].id = key
                    studentsArr.push(studentObject[key])

                })

                return studentsArr
                
        })
        .then(users => users.filter(u => u.userTypeId == 2)))
    },
    getStudent(ID) {
        return fetch(`${Settings.remoteURL}/users/${ID}.json`).then(e => e.json().then(stud => {
            // let studentsArr = []
            // let keys = Object.keys(stud)
            // console.log(stud)
            // keys.forEach(key => {
            //     stud[key].id = key
            //     studentsArr.push(stud[key])

            // })
            // console.log(studentsArr)
            // stud[ID].id = ID
            return stud
            
        }))
    },
    getUnexpandedStudent(id) {
        return fetch(`${Settings.remoteURL}/users/${id}.json`).then(e => e.json())
    },
    getAllParents() {
        return fetch(`${Settings.remoteURL}/users.json`).then(e => e.json().then(parentObject => {
            
                let parentsArr = []
                let keys = Object.keys(parentObject)

                keys.forEach(key => {
                    parentObject[key].id = key
                    parentsArr.push(parentObject[key])

                })

                return parentsArr
                
        })
        .then(users => users.filter(u => u.userTypeId == 3)))
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
        return fetch(`${Settings.remoteURL}/lessons.json`).then(e => e.json().then(lessonObj => {
            return objectToArray(lessonObj)
        })
        
        .then(lessons => lessons.filter(ls => ls.studentId == stId)))
    },
    getPayments() {
        return fetch(`${Settings.remoteURL}/payments.json`).then(e => e.json().then(paymentObject => {
            return objectToArray(paymentObject)
        }))
    },
    getMiles() {
        return fetch(`${Settings.remoteURL}/milage.json`).then(e => e.json().then(mileageObj => {
            return objectToArray(mileageObj)
        }))
    },
    getPaymentsOfStudent(usId) {
        return fetch(`${Settings.remoteURL}/payments.json`).then(e => e.json().then(payments => 
            {
                let paymentsArr = []
                let keys = Object.keys(payments)

                keys.forEach(key => {
                    payments[key].id = key
                    paymentsArr.push(payments[key])

                })

                let filteredPayments = paymentsArr.filter(payment => payment.userId == usId)

                return filteredPayments
                }
                
                
                )
            
            )
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
