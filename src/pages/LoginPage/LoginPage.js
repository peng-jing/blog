import React, { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext, Message } from "../../contexts";
import Login from "./Login";
import Register from "./Register";
import { Root, FormTags, Tag } from "./style";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function LoginPage() {
  let query = useQuery();
  const [errorMsg, setErrorMsg] = useState();
  const history = useHistory();
  const { setUser } = useContext(AuthContext);
  
  const tokenCheck = (data) => {
    setAuthToken(data.token);
    getMe().then((response) => {
      if (response.ok !== 1) {
        setAuthToken(null);
        return setErrorMsg(response.toString());
      }
      setUser(response.data);
      history.push("/");
    });
  };

  return (
    <Message.Provider value={{ errorMsg, setErrorMsg, tokenCheck }}>
      <Root>
        <FormTags>
          <Tag to="?name=register" $on={query.get("name") === "register"}>
            註冊
          </Tag>
          <Tag to="/login" $on={!query.get("name")}>
            登入
          </Tag>
        </FormTags>
        <Child name={query.get("name")} />
      </Root>
    </Message.Provider>
  );
}

function Child({ name }) {
  return <div>{name ? <Register /> : <Login />}</div>;
}
