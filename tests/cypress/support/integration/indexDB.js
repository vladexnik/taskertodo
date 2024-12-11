export const clearIndexedDB = () => {
  cy.window().then((win) => {
    if (win.indexedDB) {
      return win.indexedDB.databases().then((databases) => {
        databases.forEach((db) => {
          win.indexedDB.deleteDatabase(db.name)
        })
      })
    }
  })
}
