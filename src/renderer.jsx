import { createRoot } from 'react-dom/client';
import Random from './components/random';

const App = () => {
    return (
        <>
        <Random></Random>
        
        </>
    )
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>);