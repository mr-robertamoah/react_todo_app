class Storage {
    type = window.localStorage

    constructor(type = null) {
        if (! type) {
            return
        }

        if (type in window) {
            this.type = window[type]
        }
    }

    setItem({item, value, stringify = false}) {
        if (stringify) {
            value = JSON.stringify(value)
        }

        this.type.setItem(item, value)
    }

    getItem({item, parse = false}) {

        let value = this.type.getItem(item)

        if (parse) {
            value = JSON.parse(value)
        }

        return value
    }

    removeItem({item}) {

        this.type.removeItem(item)
    }

    clear() {
        this.type.clear()
    }
}

export default new Storage()