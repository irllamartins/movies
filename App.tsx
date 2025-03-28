import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes';
import { MovieProvider } from './src/context/MoviesContext';

export default function App() {
  return (
      <MovieProvider>
        <Routes />
        <StatusBar
          style="auto"
          translucent
          backgroundColor='#242a32' />
      </MovieProvider>
  )
}
