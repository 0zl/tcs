'use strict'

const { EventEmitter } = require('events')

module.exports = class TemporaryConvoStorage extends EventEmitter {
    constructor() {
        super()

        this.STORAGE = new Array()
        this.INIT = {
            Q: [], A: []
        }
    }

    set(Identifier, Question) {
        this.STORAGE[Identifier] = this.INIT

        for (let q of Question)
            this.STORAGE[Identifier].Q.push(q)

        this.emit('set', { id: Identifier, st: this.STORAGE[Identifier] })
    }

    // Check if the all question is answered.
    // Need manual check if the returned value is NULL or Boolean.
    check(Identifier) {
        if ( !this.STORAGE[Identifier] ) return null

        if ( this.STORAGE[Identifier].Q.length >= this.STORAGE[Identifier].A.length )
            return true
        
        return false
    }

    get(Identifier) {
        if ( !this.STORAGE[Identifier] ) return null

        return this.STORAGE[Identifier]
    }

    add(Identifier, Answer) {
        if ( typeof Answer == 'undefined' )
            Answer = null

        this.STORAGE[Identifier].A.push(Answer)
        this.emit('add', { id: Identifier, st: this.STORAGE[Identifier] })
    }

    rem(Identifier) {
        this.STORAGE[Identifier].A.pop()
        this.emit('rem', { id: Identifier, st: this.STORAGE[Identifier] })
    }

    clr(Identifier) {
        delete this.STORAGE[Identifier]
        this.emit('clr', { id: Identifier, st: this.STORAGE[Identifier] })
    }
}