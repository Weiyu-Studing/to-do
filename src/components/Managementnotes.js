function Managementnotes({ noteList, dispatch, setSelectedNote }) {
  return (
    <div className="task-list">
      {noteList.map(note => (
        <div className={`task ${note.done ? 'completed' : ''}`} key={note.id}>
          <div className={`status-bar ${note.done ? 'green' : 'blue'}`}></div>
          <div className="task-text">{note.title}</div>
        </div>
      ))}
    </div>
  );
}

export default Managementnotes;