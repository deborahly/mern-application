import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './card.styles.css';

function BootstrapCard({ title, image, text, link }) {
  return (
    <Card className='card'>
      <Card.Img className='card__img' variant='top' src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Link to={link}>
          <Button className='card__btn' variant='primary'>Go to page</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default BootstrapCard;
