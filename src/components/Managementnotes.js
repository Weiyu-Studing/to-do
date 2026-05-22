import { GoCheckCircle, GoPencil, GoTrash } from 'react-icons/go';
import { formatDate } from './Timeformat';

function Managementnotes({ noteList, dispatch, setSelectedNote }) {
  return (
    <div className="task-list">
      {noteList.map(note => (
        <div className={`task ${note.done ? 'completed' : ''}`} key={note.id}>
          <div className={`status-bar ${note.done ? 'green' : 'blue'}`}></div>
          <div className="task-text">{note.title}</div>
          <div className="task-footer"> 
            {/* timestamp */}
            <div className="task-date">{formatDate(note.date)}</div>
            {/*Icons*/}
            <div className="task-actions">
              <GoCheckCircle title='Mark as done' onClick={() => dispatch({ type: 'TOGGLE_DONE', payload: note.id })} />
              <GoPencil title='Edit note' onClick={() => setSelectedNote(note)} />
              <GoTrash title='Delete note' onClick={() => dispatch({ type: 'REMOVE_NOTE', payload: note.id })} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Managementnotes;