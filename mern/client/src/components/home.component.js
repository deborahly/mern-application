import Card from './card/card.component';

function Home() {
  return (
    <Card
      title='Agent Management'
      image={require('../images/agentCard.jpeg')}
      text='View, create and delete agents.'
      link='/agent'
    ></Card>
  );
}

export default Home;
