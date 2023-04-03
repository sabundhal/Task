import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col, Container } from 'react-bootstrap';
import Image from 'next/image';
import axios from 'axios';
import HeaderComponent from '@/components/header.component';
import Link from 'next/link';
import { useRouter } from 'next/router'

export const getStaticProps = async () => {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  const newData = data.products;
  return {
    props: {
      newData,
    },
  };
};

const Product = ({ newData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const router = useRouter()
  let clickHandler= ()=>{
    router.push("/login")
  }

  // Logic for displaying current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = newData.slice(indexOfFirstProduct, indexOfLastProduct);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(newData.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
    <HeaderComponent ></HeaderComponent>
    <Container >
        
      <Row>
        {currentProducts.map((resData) => (
          <Col key={resData.id}>
            <Card style={{ width: '18rem' }} className="box">
              {resData.images.slice(0, 1).map((img,i) => (
                <Image key={i} src={img} width={280} height={250} alt='ImageforProducts'/>
              ))}
              <Card.Body>
                <Row>
                  <Col>
                    <Link href={`/product/${resData.id}`}>{resData.title}</Link>
                  </Col>
                  <Col>
                    <Card.Text>{'Rs. ' + resData.price}</Card.Text>
                  </Col>
                  <Card.Text style={{color:"red"}}>{"Discount "+ resData.discountPercentage+ " %"}</Card.Text>
                </Row>
                <Card.Text
                  style={{
                    maxWidth: '280px',
                    maxHeight: '50px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {resData.description}
                </Card.Text>
                <Button variant="primary" onClick={clickHandler}>Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                  <a
                    href="#"
                    onClick={() => setCurrentPage(number)}
                    className={`page-link ${currentPage === number ? 'active' : ''}`}
                  >
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Product;
