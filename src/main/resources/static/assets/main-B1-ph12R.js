import { j as jsxRuntimeExports, r as reactExports, c as createRoot } from "./client-BA9BB2XV.js";
import { H as Header } from "./Header-DZfQpLhD.js";
function Image() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://dummyimage.com/200x200/ddd/000", alt: "Placeholder Image", className: "h-64 w-64 rounded-lg object-cover" }) }) });
}
function LoginForm() {
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [apiState, setApiState] = reactExports.useState({ loading: false, error: false, success: false, errorMessage: "" });
  const handleLogin = async (e) => {
    e.preventDefault();
    setApiState({ loading: true, error: false, success: false, errorMessage: "" });
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    };
    try {
      const response = await fetch("http://localhost:8080/api/login", requestOptions);
      const result = await response.json();
      console.log(response);
      console.log(result);
      if (response.ok) {
        setApiState({ loading: false, error: false, success: true, errorMessage: "" });
        window.location.href = "/post";
        console.log("Success");
      } else {
        setApiState({ loading: false, error: true, success: false, errorMessage: result.message || "Login failed, please try again." });
      }
    } catch (error) {
      setApiState({ loading: false, error: true, success: false, errorMessage: "An unexpected error occurred. Please try again later." });
      console.log(error);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md p-8 text-center mx-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-4 text-left text-4xl font-bold text-orange-500", children: "Jodel Doppelgänger - Bei uns ist Deine Anonymität gewährt" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleLogin,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                id: "username",
                value: username,
                onChange: (e) => setUsername(e.target.value),
                placeholder: "Username",
                required: true,
                className: "w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "password",
                id: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "Password",
                required: true,
                className: "w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full rounded-full bg-orange-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:border-orange-500 hover:bg-white hover:text-orange-500 transform hover:bg-white hover:text-orange-500 hover:border-2 hover:border-orange-500 hover:scale-105", children: "Login" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            apiState.loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." }),
            apiState.error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative", role: "alert", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-bold", children: "Error!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block sm:inline", children: apiState.errorMessage })
            ] }),
            apiState.success && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Success!" })
          ] })
        ]
      }
    )
  ] }) });
}
function LoginPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row items-center justify-center max-w-7xl w-full p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoginForm, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Image, {})
    ] }) })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPage, {});
}
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
