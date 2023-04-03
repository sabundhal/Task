import Link from "next/link";
import { useRouter } from "next/router";
import {Navbar,Nav, Container, } from "react-bootstrap";
import { deleteCookie, getCookie } from 'cookies-next';
// import { useRouter } from "next/router";
const HeaderComponent =()=>{
    let user = getCookie('user');
    let router = useRouter();
    const logout = (e)=>{
        e.preventDefault();
        deleteCookie("user");
        deleteCookie("token");
        deleteCookie("userName");
        
        router.push("/login")
      }
 
    return(
        <Navbar bg="dark" variant ="dark">
            <Container>
                <Navbar.Brand href="/">Hello</Navbar.Brand>
                <Nav className="me-auto">
                <Link className="nav-link" href="/" >Home</Link>
                <Link className="nav-link" href="/product">Products</Link>
                {
                    user ? <> </>: <>
                    <Link className="nav-link" href="/login" >Login</Link>
                    <Link className="nav-link" href="/categories"  >categories</Link>
                    
                    </>
                }
               
                
                </Nav>
                { user ? <Nav>
                     <h4 className="text-white" >{user}</h4>
            <Link className="nav-link" href= "/" onClick ={logout}>Logout</Link>
             </Nav>:<></>
      }
                
                
            </Container>

        </Navbar>
    )
}

export default HeaderComponent