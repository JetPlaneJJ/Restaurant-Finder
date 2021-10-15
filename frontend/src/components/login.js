import { useState } from "react";

// The Login page where users can enter in a username to log in with
function Login(props) {
  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = evt => {
    // handles name and id input
    const { name, value } = evt.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user)
    props.history.push('/') // redirect to homepage
  }

  return (
    <div className='submit-form'>
      This is Login section.
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            id="name"
            name="name"
            type={"text"}
            required
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
