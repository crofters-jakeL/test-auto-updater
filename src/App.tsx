import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import logo from './logo.svg';
import './App.css';

function App() {
  const [ pingData, setPingData ] = useState('NO DATA');
  const [ appVersion, setAppVersion ] = useState('');
  const [ isUpdateAvailable, setIsUpdateAvailable ] = useState(false);
  const [ isUpdateDownloaded, setIsUpdateDownloaded ] = useState(false);

  async function sendPingData() {
    const dataBack: string = await (window as any).myCustomAPI.sendIPCPing('My Test');
    setPingData(dataBack);
  }

  async function getAppVersion() {
    const dataBack: string = await (window as any).myCustomAPI.getAppVersion();
    setAppVersion(dataBack);
  }

  async function updateApp() {
    await (window as any).myCustomAPI.updateApp();
  }

  function isElectron() {
    return (window as any).myCustomAPI !== undefined;
  }

  useEffect(() => {
    getAppVersion();
    (window as any).myCustomAPI.isUpdateAvailable(() => {
      console.log('Update Available');
      setIsUpdateAvailable(true);
    });
    (window as any).myCustomAPI.isUpdateDownloaded(() => {
      console.log('Update Downloaded');
      setIsUpdateDownloaded(true);
      setIsUpdateAvailable(false);
    });
    (window as any).myCustomAPI.logger((data: any) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isElectron() ? <div className="mt-4">
          <Button label="TEST IPC" className="p-button-info" onClick={sendPingData} />
          <div className="text-white font-semibold mt-6">
            {pingData}
          </div>
          <div>App Version: {appVersion}</div>
          <div>{isUpdateAvailable ? 'Update available and downloading...' : ''}</div>
          {isUpdateDownloaded ? <div>Update downloaded <button onClick={updateApp} style={{border: '2px solid white'}}>Install</button></div> : ''}
        </div> : null}
      </header>
    </div>
  );
}

export default App;
