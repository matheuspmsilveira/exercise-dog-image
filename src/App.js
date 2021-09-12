import './App.css';
import React from 'react';

// USANDO CLASSE

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
    this.fetchDog = this.fetchDog.bind(this);
  }

  componentDidMount() {
    this.fetchDog();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.data.message.includes('terrier')) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    const { data } = this.state;
    localStorage.setItem('dogURL', data.message);
    const dogBreed = data.message.split('/')[4];
    alert(dogBreed);
  }

  fetchDog() {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then((result) => this.setState({ data: result }));
  }

  render() {
    const { data } = this.state;
    if (data === '') return 'loading...';
    return (
      <div>
        <p>Doguinhos</p>
        <button type="button" onClick={ this.fetchDog }>Novo doguinho!</button>
        <div>
          <img src={ data.message } alt="Random dog" />
        </div>
      </div>
    );
  }
}

// USANDO HOOKS

// function App() {
//   const [data, setData] = useState('');

//   function fetchDog() {
//     fetch('https://dog.ceo/api/breeds/image/random')
//       .then((res) => res.json())
//       .then((result) => (
//         result.message.includes('terrier')
//           ? setData((prevData) => prevData)
//           : setData(result)
//       ));
//   }

//   useEffect(() => {
//     fetchDog();
//   }, []);

//   useEffect(() => {
//     if (!data) return;
//     localStorage.setItem('dogURL', data.message);
//     const dogBreed = data.message;
//     alert(dogBreed);
//   });

//   return (
//     <div>
//       {data === '' ? (
//         <div>
//           <p>loading...</p>
//           <button type="button" onClick={ fetchDog }>
//             Novo doguinho!
//           </button>
//         </div>
//       ) : (
//         <div>
//           <p>Doguinhos</p>
//           <button type="button" onClick={ fetchDog }>
//             Novo doguinho!
//           </button>
//           <div>
//             <img src={ data.message } alt="Random dog" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

export default App;
