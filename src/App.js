import { useReducer, useEffect, useState } from 'react';
import Createnotes from './components/Createnotes';
import Managementnotes from './components/Managementnotes';

// Load saved notes from localStorage
const savedNotes = JSON.parse(localStorage.getItem('noteItems'));

// Reducer handles all changes to the note list
function noteReducer(state, action) {
  switch (action.type) {
    case 'ADD_NOTE':
      return [...state, action.payload];
    case 'REMOVE_NOTE':
      return state.filter(note => note.id !== action.payload);
    case 'TOGGLE_DONE':
      return state.map(note =>
        note.id === action.payload ? { ...note, done: !note.done } : note
      );
    case 'EDIT_NOTE':
      return state.map(note =>
        note.id === action.payload.id ? { ...note, title: action.payload.title, date: action.payload.date } : note
      );
    default:
      return state;
  }
}

function App() {
  const [noteList, dispatch] = useReducer(noteReducer, savedNotes);
  const [selectedNote, setSelectedNote] = useState(null); // note currently being edited

  // Save to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem('noteItems', JSON.stringify(noteList));
  }, [noteList]);

  return (
    <div className="container centered">
      <h1 className="title">My to-do Notes</h1>
      <Createnotes dispatch={dispatch} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
      <Managementnotes noteList={noteList} dispatch={dispatch} setSelectedNote={setSelectedNote} />
    </div>
  );
}

export default App;