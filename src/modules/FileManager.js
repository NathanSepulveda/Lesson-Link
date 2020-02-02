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


    getAll() {
        return fetch(`${Settings.remoteURL}/studentMaterials.json`).then(e => e.json().then(fileObj => {
            return objectToArray(fileObj)
        }))
    },
    getOneFile(id) {
        return fetch(`${Settings.remoteURL}/studentMaterials/${id}.json`).then(e => e.json())
    },

    addFile(obj) {
        return fetch(`${Settings.remoteURL}/studentMaterials.json`, {
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

    }


}
