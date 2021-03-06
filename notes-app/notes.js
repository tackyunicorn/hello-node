const chalk = require('chalk')
const fs = require('fs')

const addNote = (title, body) => {
	const notes = loadNotes()
	const duplicateNote = notes.find((note) => note.title === title)

	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body
		})
		saveNotes(notes)
		console.log(chalk.green.inverse.bold('Note "' + title + '" added!'))
	} else {
		console.log(chalk.red.inverse.bold('Note "' + title + '" taken!'))
	}
}

const removeNote = (title) => {
	const notes = loadNotes()
	const keepNotes = notes.filter((note) => note.title !== title)

	if (keepNotes.length != notes.length) {
		saveNotes(keepNotes)
		console.log(chalk.green.inverse.bold('Note "' + title + '" removed!'))
	} else {
		console.log(chalk.red.inverse.bold('Note "' + title + '" does not exist!'))
	}
}

const listNotes = () => {
	const notes = loadNotes()

	console.log(chalk.blue.inverse.bold('Your notes are: \n'))
	notes.forEach((note) => console.log(chalk.green.inverse.bold(note.title)))
}

const readNote = (title) => {
	const notes = loadNotes()
	const note = notes.find((note) => note.title === title)

	if(note) {
		console.log(chalk.green.inverse.bold(note.title))
		console.log(note.body)
	} else {
		console.log(chalk.red.inverse.bold('Note not found!'))
	}
}

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch (e) {
		return []
	}
}

module.exports = {
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
}