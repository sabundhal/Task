
import React, { useState } from "react";
import FsLightbox from "fslightbox-react";
import Card from 'react-bootstrap/Card';
import Image from "next/image";
export const getStaticPaths = async ()=>{
    const res = await fetch ("https://dummyjson.com/products");
    const data  = await res.json();

  const newData = data.products;
  
  const paths = newData.map((currentElement)=>{
    return{
        params:{
            pageno:currentElement.id.toString()
        },
    }
  })
  return{
    paths,
    fallback:false,
  }
}

export const getStaticProps = async (context)=>{
    const id = context.params.pageno;
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();
    
    // const oneData = data.products;
    console.log(data)

    return{
        props:{
            data,
        }
    }
}
const pageno = ({data})=>{
  let images = data.images;
  const [toggler, setToggler] = useState(false);
    
    return(
        <> 
        <Card>
        <Card.Img variant="top" src={images[0]} style={{width:"300", height:"400px"}} />
        <Card.Body>
          <h1>
           {data.title}
          </h1>
          <Card.Text>
           {data.description}
          </Card.Text>
          <Card.Text>
           {"rs. "+data.price}
          </Card.Text>
        </Card.Body>
      </Card>
      
        <button className="btn btn-primary" onClick={() => setToggler(!toggler)}>
				See Images
			</button>
			<FsLightbox
				toggler={toggler}
				sources={[
					images[0],
					images[1],
					images[2],
          images[3],
          images[4]
				]}
			/>
           
        </>

    )
}
export default pageno