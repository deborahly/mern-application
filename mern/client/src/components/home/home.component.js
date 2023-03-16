import Card from '../card/card.component';
import './home.styles.css';

function Home() {
  return (
    <div className='row home__row'>
      <Card
        className='col'
        title='Agent Management'
        image={require('../../images/agentCard.jpeg')}
        text='View, create and delete agents.'
        link='/agent'
      ></Card>
      <Card
        className='col'
        title='Transactions'
        image={require('../../images/transactions.jpg')}
        text='View and process transactions.'
        link='/transaction'
      ></Card>
    </div>
  );
}

export default Home;
