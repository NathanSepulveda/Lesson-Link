import Settings from "./Settings"


export default {


    getAll() {
        return fetch(`${Settings.remoteURL}/studentMaterials`).then(e => e.json())
    },
    getOneFile(id) {
        return fetch(`${Settings.remoteURL}/studentMaterials/${id}`).then(e => e.json())
    },

    addFile(obj) {
        return fetch(`${Settings.remoteURL}/studentMaterials`, {
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

    }


}