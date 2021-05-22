import React, { memo } from "react";
import { styled } from "styled-components";

const StyledRegisterDiv = styled.div`
  padding: 20rem;
`;

const register = memo(() => {
  return (
    <StyledRegisterDiv>
      <form>
        <label for="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          id="email"
          required
        />

        <label for="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          required
        />
      </form>
    </StyledRegisterDiv>
  );
});

export default register;
