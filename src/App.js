import './App.css';


import Test1 from './Component/test1/test1';


function App() {
  const app_onclick = () => {
    console.log('black click')
  }
  return (    
    <div className="main">

      <div className="main-test" onClick={app_onclick}>
        <Test1>
        </Test1>
      </div>


    </div>
  );
}

export default App;
