import { useContext, useState } from "react";
import { Form, Input, ErrorMsg, SubmitBtn } from "./style";
import { login } from "../../WebAPI";
import { FaArrowRight } from "react-icons/fa";
import { Message } from "../../contexts";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { errorMsg, setErrorMsg, tokenCheck } = useContext(Message);
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    login(username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMsg(data.message);
      }
      tokenCheck(data);
    });
  };
  return (
    <Form onSubmit={handleLoginSubmit}>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="帳號名稱"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="密碼"
      />
      <ErrorMsg>{errorMsg}</ErrorMsg>
      <SubmitBtn>
        登入
        <FaArrowRight />
      </SubmitBtn>
    </Form>
  );
}
