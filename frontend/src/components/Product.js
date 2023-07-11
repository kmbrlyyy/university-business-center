import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Product(props) {
  const { product } = props;
  return (
    <Card className="product-card">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.image} />
      </Link>
      <Card.Body>
        <Link className="product-card-title" to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>P{product.price}</Card.Text>
        <Button variant="none">Add to cart</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
