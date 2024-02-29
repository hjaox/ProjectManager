import { useNavigate } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react';

export default function App() {
    const navigation = useNavigate();

    useEffect(() => {
        navigation("/Homepage");
    }, []);

    return <></>
}