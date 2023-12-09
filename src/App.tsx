import {FC, useState} from 'react'
import axios from 'axios'


interface Users {
  name: {
    first: string;
    last: string;
  };
  login: {
    uuid: string;
  };
  email: string;
}

const App:FC = () => {
  const [users , setUsers] = useState<Users[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = async()=>{
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        'https://randomuser.me/api/?results=10'
      );
      console.log(data);
      setUsers(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div>
      {isLoading && <p className='loading'>Loading...</p>}
      <div className='btn-container'>
      <button onClick={handleClick} className={isLoading ? 'hide-btn' : 'btn'}>{isLoading ? '' : 'Display random users'}</button>
      </div>
    <ul>
      {users.map(({ login, name, email }) => {
        return (
          <li key={login.uuid}>
            <div>
              Name: {name.first} {name.last}
            </div>
            <div>Email: {email}</div>
            <hr />
          </li>
        );
      })}
    </ul>
    
    </div>
  )
}

export default App