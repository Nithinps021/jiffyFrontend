import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Appbar from './components/AppBar'
import Upload from './components/UploadComp'


axios.defaults.baseURL='https://jiffymodel.herokuapp.com'

function App() {
  return (
    <div className="App">
      <Appbar/>
      <Upload/>
    </div>
  );
}

export default App;
