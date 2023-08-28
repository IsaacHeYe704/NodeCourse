const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')

const notes = require('./notes')
//customize yargs version
yargs.version('1.1.0')
//create add command
yargs.command({
    command: 'add',
    describe: 'Adds a new note',
    builder:{
        "title":{
            describe:"Note title",
            demandOption:true,
            type:'string'
        },
        "body":{
            describe:"Note body",
            demandOption:true,
            type:'string'
        },
    },
    handler({title,body}){notes.addNote(title, body)}
})
yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder:{
        "title":{
            describe:"Note title",
            demandOption:true,
            type:'string'
        }
    },
    handler({title}){notes.removeNote(title)}
})
yargs.command({
    command: 'list',
    describe: 'Lists all the notes',
    handler: notes.listNotes
})
yargs.command({
    command: 'read',
    describe: 'Displays a note',
    builder:{
        "title":{
            describe:"Note title",
            demandOption:true,
            type:'string'
        }
    },
    handler({title}) {
        notes.readNote(title)
    }
})

yargs.parse()