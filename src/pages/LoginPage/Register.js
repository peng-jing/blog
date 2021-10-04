import { useState, useContext } from "react";
import { Form, Input, ErrorMsg, SubmitBtn } from "./style";
import { register } from "../../WebAPI";
import { FaArrowRight } from "react-icons/fa";
import { Message } from "../../contexts";
export default function Register() {
  const { errorMsg, setErrorMsg, tokenCheck } = useContext(Message);
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    register(nickname, username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMsg(data.message);
      }
      tokenCheck(data);
    });
  };

  return (
    <Form onSubmit={handleRegisterSubmit}>
      <Input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="暱稱"
      />
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
        註冊
        <FaArrowRight />
      </SubmitBtn>
    </Form>
  );
}
