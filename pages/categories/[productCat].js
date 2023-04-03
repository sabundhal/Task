import Card from 'react-bootstrap/Card';
import { Row, Col,Button ,Container} from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import HeaderComponent from '@/components/header.component';
export const getStaticPaths = async ()=>{
    const res = await fetch ("https://dummyjson.com/products/categories");
    // const data  = await res.json();
    const data = await res.json()
    
  
  
  const paths = data.map((currentElement)=>{
    return{
        params:{
            productCat:currentElement.toString()
        },
    }
  })
  return{
    paths,
    fallback:false,
  }
}
export const getStaticProps = async (context)=>{
  
    const item = context.params.productCat;
     console.log(item)

    const res = await fetch(`https://dummyjson.com/products/category/${item}`);

    const data = await res.json();
    
    // const oneData = data.products;
    

    return{
        props:{
            data,
        }
    }
}


const productCat = ({data})=>{
    // console.log("datas", data)
   let newData = data.products;
   const router = useRouter()
   
   let clickHandler= ()=>{
    router.push("/login")
  }
   
    return(
        <>
        <HeaderComponent></HeaderComponent>
        <Container >
            <Row>
        {
            newData.map((items,i)=>{
                
                return(
                    
                    <Col key ={i}>
                    
                    <Card  className="border border-dark" style={{ width: '18rem' , margin: '0.5rem' } } >
                    {items.images.slice(0, 1).map((img,i) => (
                      <Image  key = {i} src={img} width={260} height={250} alt='imagesforProducts'/>
                    ))}
                    <Card.Body>
                      <Row>
                        <Col>
                          <Link  href={`/product/${items.id}`}>{items.title}</Link>
                        </Col>
                        <Col>
                          <Card.Text >{'Rs. ' + items.price}</Card.Text>
                        </Col>
                        <Card.Text style={{color:"red"}}>{"Discount "+ items.discountPercentage+ " %"}</Card.Text>
                      </Row>
                      <Card.Text
                        style={{
                          maxWidth: '280px',
                          maxHeight: '50px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        
                      >
                        {items.description}
                      </Card.Text>
                      <Button  variant="primary" onClick={clickHandler}>Buy Now</Button>
                    </Card.Body>
                  </Card>
                  </Col>
                  
                )
            })
        }
        </Row>
        </Container>
        </>
    )
}
export default productCat;