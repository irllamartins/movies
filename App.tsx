import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes';

export default function App() {
  return (
    <>
        <Routes />
        <StatusBar
          style="auto"
          translucent
          backgroundColor='#242a32' />
    </>
  )
}
