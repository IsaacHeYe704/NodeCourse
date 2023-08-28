const fs=require('fs')
const chalk = require('chalk')

const listNotes = () => 
{
    const notes = loadNotes();
    console.log(chalk.bgBlue('Your notes: '));
    notes.forEach(({title},index) => {
        console.log(chalk.cyan(`${index+1}) title`));
    });
}
const addNote = (title, body) => {
    console.log(body);
    const notes = loadNotes();
    const duplicateNote  = notes.find((note) => note.title === title)

    if(duplicateNote){  
        console.log(chalk.red.inverse('Note title taken!'));
        return 
    }
    notes.push({title,body})
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));

}
const readNote = (title)=>{
    const notes = loadNotes();
    const foundNote = notes.find((note)=> note.title === title)
    if(foundNote){
        console.log(chalk.blue(foundNote.title + ":"));
        console.log(foundNote.body);
        return
    }
    console.log(chalk.red.inverse("Note not found"));
}
const removeNote = (title) => {
    console.log(chalk.blue.inverse(`Removing note '${title}'...`));
    let notes = loadNotes();
    let remainingNote = notes.filter((note) => note.title !== title)
    if(notes.length === remainingNote.length){
        console.log(chalk.red.inverse(`No note found with title '${title}'`));
        return
    }
    saveNotes(remainingNote);
    console.log(chalk.white.bgGreen(`Note removed`));

}


const saveNotes = (notes) => {
    fs.writeFileSync('notes.json',JSON.stringify(notes));
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return []
    }
}

module.exports = {addNote,removeNote, listNotes,readNote};