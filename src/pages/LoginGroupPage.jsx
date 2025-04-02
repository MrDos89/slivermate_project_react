import { useEffect, useState, useRef } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";

const LoginGroupPage = () => {
  const API_USER_GROUP_URL = `http://54.180.127.164:18090/api/usergroup`;
  const API_USER_URL = `http://54.180.127.164:18090/api/user`;

  return (
    <div>
      <h1>Login Group Page</h1>
      <p>This is the login group page.</p>
    </div>
  );
};

export default LoginGroupPage;
