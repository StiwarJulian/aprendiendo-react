import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';

export function App() {

  const users = [
    { userName: 'reactjs', name: 'React', isFollowing: true },
    { userName: 'midudev', name: 'Miguel Angel', isFollowing: false },
  ]

  return (
      <section className="App">
        {/* <TwitterFollowCard({ userName: 'reactjs', name: 'React', isFollowing: true })/> */}

        {
          users.map(user => {
            const { userName, name, isFollowing } = user;

            return (
               
              <TwitterFollowCard 
                key={userName}
                userName={userName} 
                initialIsFollowing={isFollowing}
              >
                {name}
              </TwitterFollowCard>
            )          
          })
        }


        {/* Llama el componente de manera manual, y pasa los props  
        <TwitterFollowCard userName="reactjs" initialIsFollowing>
          React
        </TwitterFollowCard>
        
        <TwitterFollowCard userName="midudev">
          Miguel Angel
        </TwitterFollowCard> */}
      </section>
  )
}