import { c as createRoot, j as jsxRuntimeExports, r as reactExports } from "./client-BA9BB2XV.js";
import { H as Header } from "./Header-DZfQpLhD.js";
function RegisterForm() {
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [apiState, setApiState] = reactExports.useState({ loading: false, error: false, success: false, errorMessage: "" });
  const handleRegister = async (e) => {
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
      const response = await fetch("http://localhost:8080/api/register", requestOptions);
      const result = await response.json();
      console.log(response);
      console.log(result);
      if (response.ok) {
        setApiState({ loading: false, error: false, success: true, errorMessage: "" });
        window.location.href = "/";
        console.log("Success");
      } else {
        setApiState({ loading: false, error: true, success: false, errorMessage: result.message || "Registration failed, please try again." });
      }
    } catch (error) {
      setApiState({ loading: false, error: true, success: false, errorMessage: "An unexpected error occurred. Please try again later." });
      console.log(error);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-screen bg-orange-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleRegister,
      className: "bg-white p-8 rounded-lg shadow-lg",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "username", className: "block text-sm font-bold text-gray-700", children: "Username" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              id: "username",
              value: username,
              onChange: (e) => setUsername(e.target.value),
              placeholder: "Username",
              className: "w-full mt-1 p-2 border rounded-md",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", className: "block text-sm font-bold text-gray-700", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "password",
              id: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: "Password",
              className: "w-full mt-1 p-2 border rounded-md",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105",
            children: "Register"
          }
        ),
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
  ) });
}
function RegisterPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterForm, {})
  ] });
}
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterPage, {}) })
);
