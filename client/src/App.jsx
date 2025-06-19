import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import ViewAll from './Pages/ViewAll';
import Form from './Pages/Form';
import View from './Pages/View';

function App () {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ViewAll />} />
          <Route path="/add" element={<Form />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
