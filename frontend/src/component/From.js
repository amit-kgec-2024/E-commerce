import Input from "../component/Input";
import Button from "../component/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

const From = ({ setIsLogin }) => {
  const [signinPage, isSigninPage] = useState(true);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [dataRegister, setDataRegister] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

//   const handelSubmit = async (e) => {
//     e.preventDefault(e);
//     const res = await fetch(
//       `https://e-commerce-nu-seven.vercel.app/api/${
//         isSigninPage ? "login" : "register"
//       }`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...data }),
//       }
//     );

//     if (res.status === 200) {
//       if (signinPage) {
//         const { token, user } = await res.json();
//         console.log(token, user, "response");
//         localStorage.setItem("user:token", token);
//         localStorage.setItem("user:details", JSON.stringify(user));
//         setMessage("Login successful!");
//         setShowMessage(true);
//         setIsSuccess(true);
//         setTimeout(() => {
//           setShowMessage(false);
//         }, 1000);
//       } else {
//         setMessage("Registration successful!");
//         setShowMessage(true);
//         setIsSuccess(true);
//         setTimeout(() => {
//           setShowMessage(false);
//         }, 3000);
//       }
//     } else {
//       setMessage("Registration failed. Please try again.");
//       setShowMessage(true);
//       // Hide...
//       setTimeout(() => {
//         setShowMessage(false);
//       }, 3000);
//     }
//   };
const handelLogin = async (e) => {
  e.preventDefault(e);
  const res = await fetch(
    `https://e-commerce-nu-seven.vercel.app/api/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...dataLogin }),
    }
  );

  if (res.status === 200) {
      const { token, user } = await res.json();
      console.log(token, user, "response");
      localStorage.setItem("user:token", token);
      localStorage.setItem("user:details", JSON.stringify(user));
      setMessage("Login successful!");
      setShowMessage(true);
      setIsSuccess(true);
      setTimeout(() => {
        setShowMessage(false);
        setIsLogin(false);
        window.location.reload();
      }, 1000);
  } else {
    setMessage("Registration failed. Please try again.");
    setShowMessage(true);
    // Hide...
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  }
};

const handelRegister = async (e) => {
  e.preventDefault(e);
  const res = await fetch(
    `https://e-commerce-nu-seven.vercel.app/api/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...dataRegister }),
    }
  );

  if (res.status === 200){
      setMessage("Registration successful!");
      setShowMessage(true);
      setIsSuccess(true);
      setTimeout(() => {
          setShowMessage(false);
          setIsLogin(false);
      }, 3000);
  } else {
    setMessage("Registration failed. Please try again.");
    setShowMessage(true);
    // Hide...
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  }
};
  return (
    <div
      className="flex h-screen absolute top-0 right-0 w-full flex-col justify-center items-center bg-opacity-85 z-50 bg-black"
      style={{ backgroundImage: `url(signinup.svg)` }}
    >
      {showMessage && (
        <div
          className="absolute right-0 bottom-0 m-12 px-5 py-1 bg-white"
          style={{ color: isSuccess ? "green" : "red" }}
        >
          {message}
        </div>
      )}
      <Link
        to="/management/section"
        className="text-blue-300 absolute top-0 right-0 m-10 shadow p-3 font-bold"
      >
        Management Section
      </Link>
      <div className="border rounded p-4 flex flex-col items-center bg-white shadow-2xl">
        {signinPage ? (
          <div className="">
            <h1 className="text-3xl font-bold uppercase mb-4">welcome Back</h1>
            <h2 className="text-md font-extralight uppercase mb-8">
              ples login to continue
            </h2>
            <form
              className="flex flex-col items-center"
              onSubmit={(e) => handelLogin(e)}
            >
              <Input
                type="email"
                label="Email"
                placeholder="email.."
                value={dataLogin.email}
                onChange={(e) => setDataLogin({ ...dataLogin, email: e.target.value })}
              />
              <Input
                type="password"
                label="Password"
                placeholder="password.."
                value={dataLogin.password}
                onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })}
              />
              <Button type="submit" label="Sign" />
            </form>
            <div className="text-sm font-semibold mt-2">
              Didnot have an account?{" "}
              <button
                className="underline text-blue-500"
                onClick={() => isSigninPage(false)}
              >
                sign up
              </button>
            </div>
          </div>
        ) : (
          <div className="">
            <h1 className="text-3xl font-bold uppercase mb-4 text-center">welcome</h1>
            <h2 className="text-md font-extralight uppercase mb-8 text-center">
              ples register to continue
            </h2>
            <form
              className="flex flex-col items-center"
              onSubmit={(e) => handelRegister(e)}
            >
              <div className="flex flex-row gap-3">
                <Input
                  type="text"
                  label="First Name"
                  placeholder="firstname.."
                  value={dataRegister.firstname}
                  onChange={(e) =>
                    setDataRegister({ ...dataRegister, firstname: e.target.value })
                  }
                />
                <Input
                  type="text"
                  label="Last Name"
                  placeholder="lastname.."
                  value={dataRegister.lastname}
                  onChange={(e) =>
                    setDataRegister({ ...dataRegister, lastname: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-row gap-3">
                <Input
                  type="email"
                  label="Email"
                  placeholder="email.."
                  value={dataRegister.email}
                  onChange={(e) => setDataRegister({ ...dataRegister, email: e.target.value })}
                />
                <Input
                  type="password"
                  label="Password"
                  placeholder="password.."
                  value={dataRegister.password}
                  onChange={(e) =>
                    setDataRegister({ ...dataRegister, password: e.target.value })
                  }
                />
              </div>
              <Button
                type="submit"
                label="Sign in"
              />
            </form>
            <div className="text-sm font-semibold mt-2 text-end">
              Alredy have an account?{" "}
              <button
                className="underline text-blue-500"
                onClick={() => isSigninPage(true)}
              >
                sign in
              </button>
            </div>
          </div>
        )}
        <div className="w-full text-end mt-2 text-sm font-semibold text-blue-500">
          <button onClick={() => setIsLogin(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default From;