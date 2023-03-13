import Card from './card/card.component';

function Home() {
  return (
    <Card
      title='Agent Section'
      image={require('../images/agentCard.jpeg')}
      text='Visit the Agent Section to manage, create and delete agents.'
      link='/agent'
    ></Card>
  );
}

export default Home;
