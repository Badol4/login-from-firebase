import "./App.css";
import { getAuth } from "firebase/auth";
import app from "./firebase.init";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const HandleChangeBlur = (e) => {
    setEmail(e.target.value);
  };

  // this is register hook
  const handleChangeChake = (e) => {
    setRegister(e.target.checked);
  };

  const HandlePassBlur = (e) => {
    setPass(e.target.value);
  };
  const Submit = (e) => {
    if (register) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
    console.log("From submit", email, pass);
    e.preventDefault();
  };
  return (
    <div>
      <div className="w-50 mx-auto">
        <h1>{register ? "login" : "register"}</h1>
        <Form onSubmit={Submit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={HandleChangeBlur}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={HandlePassBlur}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handleChangeChake}
              type="checkbox"
              label="Check me out"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {register ?'login':'register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
