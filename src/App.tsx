import React, { useState } from 'react';
import { Button } from 'primereact/button';
import logo from './logo.svg';
import './App.css';

function App() {
  const [ pingData, setPingData ] = useState('NO DATA');

  async function sendPingData() {
    const dataBack: string = await (window as any).myCustomAPI.sendIPCPing('My Test');
    setPingData(dataBack);
  }

  function isElectron() {
    return (window as any).myCustomAPI !== undefined;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isElectron() ? <div className="mt-4">
          <Button label="TEST IPC" className="p-button-info" onClick={sendPingData} />
          <div className="text-white font-semibold mt-6">
            {pingData}
          </div>
        </div> : null}
      </header>
    </div>
  );
}

export default App;
