import NavTopComponent from "@/components/header.component";
// const categoryData = {};
// export const getStaticPaths = async ()=>{
//   const res = await fetch ("https://dummyjson.com/products/categories");
//   // const data  = await res.json();
//   const categories  = await res.json()
//   console.log("from",categories )


// const paths = categories.map((currentElement)=>{
//   return{
//       params:{
//           productCat:currentElement.toString()
//       },
      
//   }
// })
// return{
//   paths,
//   fallback:false,
// }
// }
// export const getStaticProps = async (context)=>{

//   const item = context.params.productCat;
//   const res = await fetch(`https://dummyjson.com/products/category/${item}`);

//   const data = await res.json();
  

  
//   // const oneData = data.products;
  

//   return{
//       props:{
//           data,
//       }
//   }
// }

export default function Home({data}) {
  
 
  return (

    <>
     <NavTopComponent></NavTopComponent>
      <div className="text-primary">Hello</div>
    </>
  )
}
