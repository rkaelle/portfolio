import { useState } from 'react';
import styled from 'styled-components';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function Footer(){
    const [input, setInput] = useState("");

    const inputHandler = (e) => {
        setInput(e.target.value);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (input) {
            console.log(input);
            try {
                await addDoc(collection(db, "emails"), {
                    email: input,
                    time: serverTimestamp(),
                });
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    };

    return (
        <Div className="App">
            <Container>
                <Form onSubmit={submitHandler}>
                    <H2>Subscribe to Ryan's Daily News</H2>
                    <Input type="email" onChange={inputHandler} />
                    <Button type="submit">Submit</Button>
                </Form>
            </Container>
        </Div>
    );
}


const Div = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0d0d0d;
  overflow: hidden;
`;

const Container = styled.div`
  position: relative;
`;

const Form = styled.form`
  position: relative;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.1);
  min-width: 500px;
  border-radius: 5px;
  backdrop-filter: blur(10px);
  background-clip: padding-box;
  z-index: 2;
`;

const H2 = styled.h2`
  padding: 1rem;
  text-align: center;
  font-size: 2rem;
  color: white;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 10px 0 0 10px;
  border: none;
  width: 80%;
  outline: none;
  color: #cf1d22;
`;

const Button = styled.button`
  color: #fff;
  background-color: #8A2BE2;
  padding: 10px 20px;
  border: none;
  border-radius: 0 10px 10px 0;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #7a1cb8;
  }
`;

export default Footer;