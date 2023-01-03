import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {WorkoutContextProvider} from './context/WorkoutContext'
import {AuthContextProvider} from './context/AuthContext'
// import {disableReactDevtools} from '@fvilers/disable-react-devtools'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContextProvider>
          <App />
      </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


