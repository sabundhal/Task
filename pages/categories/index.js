import HeaderComponent from "@/components/header.component";
import Link from "next/link";
import { Container } from "react-bootstrap";


export const getStaticProps = async () => {
    const res = await fetch('https://dummyjson.com/products/categories');
    const data = await res.json();
   
    return {
      props: {
        data,
      },
    };
  };
const categories =({data})=>{
    return(
       
        <>
        
      
        <HeaderComponent></HeaderComponent>
        <Container style={{ backgroundColor: 'white'} }>
        {
        data.map((item)=>{
            return(
               <li key = {item.id} className="border border-dark m-3 mx-3 p-3  text-center"><Link className="text-center  mt-5 custom-sacramento-font" style={{ fontSize: '18px', fontWeight: 'bold', color: 'blue' }} href={`/categories/${item}`}>{item}</Link></li>
            )
        })
       }
       </Container>

        </>
    )

}
export default categories