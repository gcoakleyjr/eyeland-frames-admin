import React from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../redux/apiCalls';
import { useHistory } from 'react-router-dom'
import { loginFailure, loginStart, loginSuccess } from "../../redux/userRedux"
import { publicRequest } from '../../requestMethods';

import styled from "styled-components";

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
  const { isFetching, error } = useSelector(state => state.user)


  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(loginStart());

    try {
      const res = await publicRequest.post("/auth/login", { username, password });
      dispatch(loginSuccess(res.data));
      history.push('/', { replace: true });
    } catch (err) {
      dispatch(loginFailure());
    }
  }

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