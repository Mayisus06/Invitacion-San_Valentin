import { useState } from 'react';
import Question from './components/Question';
import YesResponse from './components/YesResponse';
import './App.css';

function App() {
  const [answered, setAnswered] = useState(false);

  return (
    <div className="app">
      {!answered ? (
        <Question onYes={() => setAnswered(true)} />
      ) : (
        <YesResponse />
      )}
    </div>
  );
}

export default App;
