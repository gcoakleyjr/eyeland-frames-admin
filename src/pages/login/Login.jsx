import React from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../redux/apiCalls';
import { useHistory } from 'react-router-dom'
import styled from "styled-components";
import { useEffect } from 'react';

const Wrapper = styled.div`
display: flex;
align-items: center;
height: 100vh;
flex-direction: column;
justify-content: center
`
const Input = styled.input`
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 200px;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 10px 0;
  &:disabled {
    color: green;
    cursor: not-allowed
  }
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  let history = useHistory();

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const { isFetching, error, loggedIn } = useSelector(state => state.user)


  const handleLogin = async (e) => {
    e.preventDefault()

    login(dispatch, { username, password })

  }

  useEffect(() => {
    if (loggedIn) {
      history.push('/', { replace: true });
    }
  }, [loggedIn, history])

  return (
    <Wrapper>
      <Input type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)} />
      <Input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin} disabled={isFetching} >Login</Button>
      {error && <Error>Something went wrong...</Error>}
    </Wrapper>
  )
}

export default Login