import './scss/App.scss';
import LeftNav from "./components/LeftNav.jsx";
import RightSection from "./components/RightSection.jsx";
import TopMenu from "./components/TopMenu.jsx";
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <TopMenu/>
      <div className="Container">
        <LeftNav/>
        <RightSection/>
      </div>
    </div>
  );
}

export default App;
