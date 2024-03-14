import './App.css';
import { useState,useEffect } from 'react';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = days[new Date().getDay()];

  
  const addTodo = () => {
    if (toDo.trim() !== '') {
      setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      setToDo(''); 
    }
  };

  

  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  
  const deleteToDo = (id) => {
    setToDos(toDos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const pendingTasksCount = toDos.filter(todo => !todo.status).length;
    document.title = `${pendingTasksCount} pending tasks`;
  }, );


  return (
    <div className="app">
      <div className="mainHeading">
        <h1>Daily Do</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          onKeyPress={handleKeyPress}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => (
          <div key={obj.id} className={`todo ${obj.status ? 'completed' : ''}`}>
            <div className="left">
              <input
                onChange={(e) => {
                  setToDos(
                    toDos.map((todo) =>
                      todo.id === obj.id ? { ...todo, status: e.target.checked } : todo
                    )
                  );
                }}
                value={obj.status}
                type="checkbox"
                name=""
                id=""
              />
              <p>{obj.text}</p>
            </div>
            <div className="right">
              <i onClick={() => deleteToDo(obj.id)} className="fas fa-times"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
