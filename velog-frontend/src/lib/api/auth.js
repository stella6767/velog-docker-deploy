import client from "./client";

// 로그인
export const login = ({ username, password }) =>
  client.post("/auth/login", { username, password });

// 회원가입
export const join = (data) => ( 
  
  client.post("/auth/join", JSON.stringify(data)));


// 로그아웃
export const logout = () => client.post("/auth/logout");
