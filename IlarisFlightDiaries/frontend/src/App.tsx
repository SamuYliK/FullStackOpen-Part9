import { useState, useEffect } from 'react';
import { Entry, NewEntry } from './types';
import { getAllEntries, addNewDiary } from './services/diaryService';
import EntryForm from './components/EntryForm';
import Notification from './components/Notification';

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [notification, setNotification] = useState('');
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data);
    });
  }, []);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addEntry = async (entryObject: NewEntry) => {
    await addNewDiary({ ...entryObject })
      .then(data => {
        if (typeof data !== 'object'){
          if (typeof data === 'string'){
            setNotification(data);
            setTimeout(() => setNotification(''), 5000);
          } else{
            setNotification('Unknown error.');
            setTimeout(() => setNotification(''), 5000);
          }
        } else {
          if ('date' in data && 'visibility' in data && 'weather' in data && 'comment' in data && 'id' in data){
            setEntries(entries.concat(data));
          } else {
            setNotification('Unknown error.');
            setTimeout(() => setNotification(''), 5000);
          }
        }
      });
  };

  return (
    <>
      <h2>Add new entry</h2>
      <Notification message={notification}/>
      <EntryForm createEntry={addEntry} />
      <h2>Diary entries</h2>
      <div>
        {entries.map(e => 
          <p key={e.id}>
            <b>{e.date}</b>
            <br></br>
            Visibility: {e.visibility}
            <br></br>
            Weather: {e.weather}
            <br></br>
            {visible ? `Comment: ${e.comment}` : null}         
          </p>
        )}
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>
          show comments
        </button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>
          hide comments
        </button>
      </div>
    </>
  );
};

export default App;
