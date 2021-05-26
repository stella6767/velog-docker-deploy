import client from "./client";

// 로그인
export const login = ({ email }) => client.post("/auth/login", { email });

// 회원가입
export const register = ({ username, email }) =>
  client.post("/auth/join", { username, email });

// 로그인 상태 확인
export const check = () => client.get("/auth/check");

// 로그아웃
export const logout = () => client.post("/auth/logout");
