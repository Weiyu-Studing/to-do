import { useState, useEffect } from 'react';

function Createnotes({ dispatch, selectedNote, setSelectedNote }) {
  const [inputText, setInputText] = useState('');

  // When a note is selected for editing, fill the input with its title
  // Monitor changes in selectedNote and synchronize externally passed note titles to the input box.
  useEffect(() => {
    if (selectedNote) {
      setInputText(selectedNote.title);
    } else {
      setInputText('');
    }
  }, [selectedNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    if (selectedNote) {
      // Update the existing note
      dispatch({
        type: 'EDIT_NOTE',
        payload: { id: selectedNote.id, title: inputText, date: new Date().toLocaleString() },
      });
      setSelectedNote(null);
    } else {
      // Add a new note to the list
      dispatch({
        type: 'ADD_NOTE',
        payload: {
          id: Date.now(),
          title: inputText,
          done: false,
          date: new Date().toLocaleString(),
        },
      });
    }

    setInputText('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Please Enter Your Note"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          maxLength={27}
        />
        <button type="submit">{selectedNote ? 'UPDATE' : 'ADD'}</button>
      </div>
    </form>
  );
}

export default Createnotes;