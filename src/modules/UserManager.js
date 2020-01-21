import Settings from "./Settings"

export default {
  get(id) {
    return fetch(`${Settings.remoteURL}/users/${id}.json`).then(e => e.json())
  },
  delete(id) {
    return fetch(`${Settings.remoteURL}/users/${id}.json`, {
      method: "DELETE"
    }).then(e => e.json())
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
  searchUP(username, password) {
    return fetch(
      `${Settings.remoteURL}/users.json`
    ).then(e => e.json().then(users => users.find(u => u.name === username)))
  },
  searchUsername(username) {
    return fetch(`${Settings.remoteURL}/users.json`).then(e =>
      e.json().then(users => users.filter(u => u.name === username))
    )
  }
}
