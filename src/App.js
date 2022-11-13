
import Demo from './pages/formedit'
import './App.less';
import 'antd/dist/antd.min.css';
import { Provider } from 'mobx-react'
import stores from './store';

function App() {
  return (
    <Provider {...stores}>
      <Demo />
    </Provider>
  );
}

export default App;
