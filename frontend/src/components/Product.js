import { Card } from "react-bootstrap";
import {Link} from 'react-router-dom'
import Rating from "./Rating";
const Product=(props)=>{
    return(
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${props.product._id}`}>
                <Card.Img src={props.product.image}/>       
            </Link>
            <Card.Body>
                <Link to={`/product/${props.product._id}`}>
                    <Card.Title as="div">
                        <strong>
                            {props.product.name}
                        </strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={props.product.rating} text={`${props.product.numReviews}reviews`} color='#f8e825'></Rating>
                    </div>
                </Card.Text>
                <Card.Text>
                    <h3>{`$${props.product.price}`}</h3>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product;