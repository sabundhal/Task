import HeaderComponent from "@/components/header.component"
import Image from "next/image";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Link from "next/link";
import { useState,useEffect } from "react";
import { postRequest } from "./Services/axios.services";
import { useRouter } from "next/router";
import { setCookie } from 'cookies-next';

const login =()=>{
    const [showPassword, setShowPassword] = useState(false);
    const [data,setData] = useState({
        username:" ",
        password:" "
    })
    const router = useRouter();
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleChange =(e)=>{
        let {name,value}=e.target;
        setData({
            ...data,
            [name]:value
        })
    }
                            
    const handleSubmit = async  (e)=>{
        e.preventDefault();
        try{
            let response = await postRequest('https://dummyjson.com/auth/login',data);
            console.log(response)

            if(response && response.token){
                setCookie("token",response.token);
                setCookie("email",response.email);
                setCookie("user",response.firstName + " "+response.lastName)

                router.push("/user")
            }

        }catch(err){

        }
    }
    return(
        <>
        <HeaderComponent></HeaderComponent>
        <Container fluid className=" justify-content-center mt-5">
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <Image alt="IMAGE" src="/login.jpg" width="700" height="700"></Image>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form 
                            className="p-5 mt-5  border border-light p-4 rounded shadow"
                            style={{ width: "500px" }}
                            onSubmit={handleSubmit}
                            >
                            
                            <h4 className="text-center">Login Form</h4>
                            <hr></hr>
                            <Form.Group className="mb-3" controlId="First-name">
                                <Form.Label>username</Form.Label>
                                <Form.Control
                                    className="border border-dark"
                                    name="username"
                                    placeholder="Enter your username"
                                    type="text"
                                    onChange = {handleChange}
                                    
                                />
                            </Form.Group>




                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className="border border-dark"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    onChange = {handleChange}

                                />
                                
                                    

                                        <Form.Text onClick={toggleShowPassword}>

                                            {showPassword ? "Hide" : "Show"} password
                                        </Form.Text>
                                    
                                
                            </Form.Group>
                            

                            <Button variant="primary" type="submit" size="lg"   >
                                Login
                            </Button>


                        </Form>
                    </Col>


                </Row>
            </Container>
        </>
    )
}
export default login