import './app.css';
import InfiniteScroll from './components/infiniteScroll'

function App() {
  return (
    <main>
      <header className='header'>Common Solutions for React Apps</header>
      <section className='app'>
        <InfiniteScroll />
      </section>
    </main>
  );
}

export default App;
