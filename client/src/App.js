import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState({});

  useEffect(() => {
    fetch("http://localhost:5127/api/Assignment")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
  }, []);

  return (
    <div>
      {users.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.taskName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
