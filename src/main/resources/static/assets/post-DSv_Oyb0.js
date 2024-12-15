import { R as React, r as reactExports, j as jsxRuntimeExports, c as createRoot } from "./client-BA9BB2XV.js";
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = React.createContext && /* @__PURE__ */ React.createContext(DefaultContext);
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /* @__PURE__ */ React.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return (props) => /* @__PURE__ */ React.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = (conf) => {
    var {
      attr,
      size,
      title
    } = props, svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /* @__PURE__ */ React.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /* @__PURE__ */ React.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? /* @__PURE__ */ React.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
function BiCommentDetail(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M7 7h10v2H7zm0 4h7v2H7z" }, "child": [] }, { "tag": "path", "attr": { "d": "M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z" }, "child": [] }] })(props);
}
function RiArrowDropDownLine(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "currentColor" }, "child": [{ "tag": "path", "attr": { "d": "M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z" }, "child": [] }] })(props);
}
const useFetchPosts = () => {
  const [posts, setPosts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
  const fetchPosts = async (activityFilterType, datetimeFilterType, latitude, longitude) => {
    setLoading(true);
    setError(false);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ coordinates: { longitude, latitude }, activityFilterType, datetimeFilterType })
    };
    try {
      const response = await fetch("http://localhost:8080/post/api/get_nearby_posts", requestOptions);
      const data = await response.json();
      setPosts(data.posts);
    } catch (error2) {
      setError(true);
      console.log(error2);
    } finally {
      setLoading(false);
    }
  };
  return { posts, loading, error, fetchPosts };
};
const useFetchComments = (post_id) => {
  const [comments, setComments] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
  const fetchComments = async () => {
    setLoading(true);
    setError(false);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ postId: post_id })
    };
    try {
      const response = await fetch("http://localhost:8080/comment/api/get_comments", requestOptions);
      const data = await response.json();
      setComments(data.comments);
    } catch (error2) {
      setError(true);
      console.log(error2);
    } finally {
      setLoading(false);
    }
  };
  return { comments, loading, error, setComments, fetchComments };
};
var EntityType = /* @__PURE__ */ ((EntityType2) => {
  EntityType2[EntityType2["POST"] = 0] = "POST";
  EntityType2[EntityType2["COMMENT"] = 1] = "COMMENT";
  return EntityType2;
})(EntityType || {});
var VoteType = /* @__PURE__ */ ((VoteType2) => {
  VoteType2["LIKE"] = "LIKE";
  VoteType2["DISLIKE"] = "DISLIKE";
  VoteType2["NO_VOTE"] = "NO_VOTE";
  return VoteType2;
})(VoteType || {});
var ActivityFilterType = /* @__PURE__ */ ((ActivityFilterType2) => {
  ActivityFilterType2["NEWEST"] = "NEWEST";
  ActivityFilterType2["MOST_COMMENTED"] = "MOST_COMMENTED";
  ActivityFilterType2["LOUDEST"] = "LOUDEST";
  return ActivityFilterType2;
})(ActivityFilterType || {});
var DatetimeFilterType = /* @__PURE__ */ ((DatetimeFilterType2) => {
  DatetimeFilterType2["NOW"] = "NOW";
  DatetimeFilterType2["TODAY"] = "TODAY";
  DatetimeFilterType2["WEEK"] = "WEEK";
  return DatetimeFilterType2;
})(DatetimeFilterType || {});
var distModules = {};
Object.defineProperty(distModules, "__esModule", { value: true });
var useGeolocated_1 = distModules.useGeolocated = useGeolocated;
const react_1 = reactExports;
function useGeolocated(config = {}) {
  const { positionOptions = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  }, isOptimisticGeolocationEnabled = true, userDecisionTimeout = void 0, suppressLocationOnMount = false, watchPosition = false, geolocationProvider = typeof navigator !== "undefined" ? navigator.geolocation : void 0, watchLocationPermissionChange = false, onError, onSuccess } = config;
  const userDecisionTimeoutId = (0, react_1.useRef)(0);
  const isCurrentlyMounted = (0, react_1.useRef)(true);
  const watchId = (0, react_1.useRef)(0);
  const [isGeolocationEnabled, setIsGeolocationEnabled] = (0, react_1.useState)(isOptimisticGeolocationEnabled);
  const [coords, setCoords] = (0, react_1.useState)();
  const [timestamp, setTimestamp] = (0, react_1.useState)();
  const [positionError, setPositionError] = (0, react_1.useState)();
  const [permissionState, setPermissionState] = (0, react_1.useState)();
  const cancelUserDecisionTimeout = (0, react_1.useCallback)(() => {
    if (userDecisionTimeoutId.current) {
      window.clearTimeout(userDecisionTimeoutId.current);
    }
  }, []);
  const handlePositionError = (0, react_1.useCallback)((error) => {
    cancelUserDecisionTimeout();
    if (isCurrentlyMounted.current) {
      setCoords(() => void 0);
      setIsGeolocationEnabled(false);
      setPositionError(error);
    }
    onError === null || onError === void 0 ? void 0 : onError(error);
  }, [onError, cancelUserDecisionTimeout]);
  const handlePositionSuccess = (0, react_1.useCallback)((position) => {
    cancelUserDecisionTimeout();
    if (isCurrentlyMounted.current) {
      setCoords(position.coords);
      setTimestamp(position.timestamp);
      setIsGeolocationEnabled(true);
      setPositionError(() => void 0);
    }
    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(position);
  }, [onSuccess, cancelUserDecisionTimeout]);
  const getPosition = (0, react_1.useCallback)(() => {
    if (!geolocationProvider || !geolocationProvider.getCurrentPosition || !geolocationProvider.watchPosition) {
      throw new Error("The provided geolocation provider is invalid");
    }
    if (userDecisionTimeout) {
      userDecisionTimeoutId.current = window.setTimeout(() => {
        handlePositionError();
      }, userDecisionTimeout);
    }
    if (watchPosition) {
      watchId.current = geolocationProvider.watchPosition(handlePositionSuccess, handlePositionError, positionOptions);
    } else {
      geolocationProvider.getCurrentPosition(handlePositionSuccess, handlePositionError, positionOptions);
    }
  }, [
    geolocationProvider,
    watchPosition,
    userDecisionTimeout,
    handlePositionError,
    handlePositionSuccess,
    positionOptions
  ]);
  (0, react_1.useEffect)(() => {
    let permission;
    if (watchLocationPermissionChange && geolocationProvider && "permissions" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        permission = result;
        permission.onchange = () => {
          setPermissionState(permission.state);
        };
      }).catch((e) => {
        console.error("Error updating the permissions", e);
      });
    }
    return () => {
      if (permission) {
        permission.onchange = null;
      }
    };
  }, []);
  (0, react_1.useEffect)(() => {
    if (!suppressLocationOnMount) {
      getPosition();
    }
    return () => {
      cancelUserDecisionTimeout();
      if (watchPosition && watchId.current) {
        geolocationProvider === null || geolocationProvider === void 0 ? void 0 : geolocationProvider.clearWatch(watchId.current);
      }
    };
  }, [permissionState]);
  return {
    getPosition,
    coords,
    timestamp,
    isGeolocationEnabled,
    isGeolocationAvailable: Boolean(geolocationProvider),
    positionError
  };
}
const defaultCoords = { latitude: 40.7128, longitude: -74.006 };
const GeolocationContext = reactExports.createContext({
  coords: defaultCoords,
  isGeolocationAvailable: false,
  isGeolocationEnabled: false,
  city: "Milchstraße"
});
const useGeolocationContext = () => {
  const context = reactExports.useContext(GeolocationContext);
  if (!context) {
    throw new Error("useGeolocationContext must be used within a GeolocationProvider");
  }
  return context;
};
const reverseGeocode = async (latitude, longitude) => {
  const API_KEY = "45a2ccb5b62a48a6acb86b1f5dd8f3e0";
  try {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${API_KEY}`);
    const data = await response.json();
    return data.results[0].components.town;
  } catch (error) {
    console.log("Could not reverse geocode coordinates: " + error);
  }
  return "Milchstraße";
};
const GeolocationProvider = ({ children }) => {
  const [city, setCity] = reactExports.useState("Milchstraße");
  const previousCoords = reactExports.useRef({
    latitude: void 0,
    longitude: void 0
  });
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated_1({
    positionOptions: {
      enableHighAccuracy: false,
      maximumAge: 9e5,
      // milliseconds: Will request new position every 15 minutes
      timeout: 3e4
      // milliseconds: Will wait for maximum of 30 seconds when requesting position
    },
    userDecisionTimeout: 6e4,
    // user has one minute to accept or deny gps request
    watchPosition: false
  });
  reactExports.useEffect(() => {
    if (coords && previousCoords.current.latitude !== coords.latitude && previousCoords.current.longitude !== coords.longitude) {
      const fetchCity = async () => {
        const city2 = await reverseGeocode(coords.latitude, coords.longitude);
        setCity(city2);
      };
      fetchCity();
    }
    previousCoords.current.latitude = coords == null ? void 0 : coords.latitude;
    previousCoords.current.longitude = coords == null ? void 0 : coords.longitude;
  }, [coords]);
  const finalCoords = coords ? coords : defaultCoords;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GeolocationContext.Provider,
    {
      value: { coords: finalCoords, isGeolocationAvailable, isGeolocationEnabled, city },
      children
    }
  );
};
function CreatePostButton() {
  const [isCreatingNewPost, setIsCreatingNewPost] = reactExports.useState(false);
  const [newPostContent, setNewPostContent] = reactExports.useState("");
  const { coords } = useGeolocated_1();
  const handleCreateNewPost = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: newPostContent, longitude: coords == null ? void 0 : coords.longitude, latitude: coords == null ? void 0 : coords.latitude })
    };
    try {
      const response = await fetch("http://localhost:8080/post/api/create_post", requestOptions);
      const result = await response.json();
      console.log(response);
      console.log(result);
      if (response.ok) {
        setIsCreatingNewPost(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: isCreatingNewPost ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-70 z-40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky-center rounded-lg bg-white p-4 shadow-lg max-w-lg mx-auto z-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: newPostContent,
          onChange: (e) => {
            setNewPostContent(e.target.value);
            console.log(newPostContent);
          },
          className: "mt-4 w-full rounded-md bg-gray-100 p-2 outline-none focus:ring-2 focus:ring-blue-300",
          placeholder: "What's on your mind?",
          rows: 4
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: (e) => handleCreateNewPost(e),
          className: "mt-4 w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700",
          children: "Post"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setNewPostContent(""),
          className: "mt-2 w-full rounded-full bg-gray-200 px-4 py-2 font-bold text-gray-700 hover:bg-gray-300",
          children: "Clear"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setIsCreatingNewPost(false),
          className: "mt-2 w-full rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700",
          children: "Exit"
        }
      )
    ] })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick: () => setIsCreatingNewPost(true),
      className: "sticky-bottom bg-orange-500 hover:bg-orange-700 border-black text-white border-2 font-bold py-3 px-6 rounded-full mb-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-plus" }),
        " Create new post"
      ]
    }
  ) }) });
}
function Like({ voteCount, id, entityType, initialVoteStatus }) {
  const [voteStatus, setVoteStatus] = reactExports.useState(initialVoteStatus);
  const [votes, setVotes] = reactExports.useState(voteCount);
  const handleSetVote = async (voteType) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, voteType, entityType })
    };
    try {
      const response = await fetch("http://localhost:8080/vote/api/vote", requestOptions);
      console.log(response);
      if (response.ok) {
        console.log("Success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLike = () => {
    if (voteStatus === VoteType.NO_VOTE) {
      setVotes(votes + 1);
      setVoteStatus(VoteType.LIKE);
    } else if (voteStatus === VoteType.LIKE) {
      setVotes(votes - 1);
      setVoteStatus(VoteType.NO_VOTE);
    } else {
      setVotes(votes + 2);
      setVoteStatus(VoteType.LIKE);
    }
    handleSetVote(true);
  };
  const handleDislike = () => {
    if (voteStatus === VoteType.NO_VOTE) {
      setVotes(votes - 1);
      setVoteStatus(VoteType.DISLIKE);
    } else if (voteStatus === VoteType.LIKE) {
      setVotes(votes - 2);
      setVoteStatus(VoteType.DISLIKE);
    } else {
      setVotes(votes + 1);
      setVoteStatus(VoteType.NO_VOTE);
    }
    handleSetVote(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleLike,
        className: voteStatus === VoteType.LIKE ? "vote-button-liked" : "vote-button-like",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            className: "w-8 h-8",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": voteStatus === VoteType.LIKE ? "3" : "2",
                d: "M5 15l7-7 7 7"
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: votes }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleDislike,
        className: voteStatus === VoteType.DISLIKE ? "vote-button-disliked" : "vote-button-dislike",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            className: "w-8 h-8",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": voteStatus === VoteType.DISLIKE ? "3" : "2",
                d: "M19 9l-7 7-7-7"
              }
            )
          }
        )
      }
    )
  ] }) });
}
function Comment({ comment }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start space-x-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500", children: comment.created }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 mt-1", children: comment.content }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Like, { voteCount: comment.voteCount, id: comment.id, entityType: EntityType.COMMENT, initialVoteStatus: comment.voteStatus })
  ] }) }) });
}
function CommentSection({ postId }) {
  const [newCommentContent, setNewCommentContent] = reactExports.useState("");
  const { comments, loading, error, fetchComments } = useFetchComments(postId);
  reactExports.useEffect(() => {
    fetchComments();
  }, []);
  const handleCreateNewComment = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ postId, content: newCommentContent })
    };
    try {
      const response = await fetch("http://localhost:8080/comment/api/create_comment", requestOptions);
      console.log(response);
      if (response.ok) {
        setNewCommentContent("");
        fetchComments();
        console.log("Success");
      }
    } catch (error2) {
      console.log(error2);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-300 p-6 rounded-lg shadow-md mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Comments" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "comments-wrapper", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Couldn't fetch comments..." }),
      comments && comments.length > 0 ? comments.map((comment) => /* @__PURE__ */ jsxRuntimeExports.jsx(Comment, { comment }, comment.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Really empty inside here...🥱" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: newCommentContent,
          onChange: (e) => setNewCommentContent(e.target.value),
          className: "w-full p-4 border rounded-md text-sm text-gray-700",
          placeholder: "Write your comment...",
          rows: 3
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: (e) => handleCreateNewComment(e),
          className: "mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600",
          children: "Post Comment"
        }
      )
    ] })
  ] }) });
}
function Post({ post, color }) {
  const [isCommentSectionOpened, setCommentSectionOpened] = reactExports.useState(false);
  const MAX_CHARACTERS = 150;
  const truncatedContent = post.content.length > MAX_CHARACTERS ? post.content.substring(0, MAX_CHARACTERS) + "..." : post.content;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "post", style: { background: color }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700", children: truncatedContent }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-sm text-gray-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: post.created }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setCommentSectionOpened(!isCommentSectionOpened),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(BiCommentDetail, { className: "BiCommentDetailStyle" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            " ",
            post.commentCount,
            " "
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Like, { voteCount: post.voteCount, id: post.id, entityType: EntityType.POST, initialVoteStatus: post.voteStatus })
      ] })
    ] }),
    isCommentSectionOpened && /* @__PURE__ */ jsxRuntimeExports.jsx(CommentSection, { postId: post.id })
  ] });
}
function PostsTable({ posts }) {
  const backgroundColors = [
    "rgb(253 164 175)",
    // Rot
    "rgb(252 211 77)",
    // Orange
    "rgb(253 224 71)",
    // Gelb
    "rgb(52 211 153)",
    // Grün
    "rgb(134 239 172)",
    // Helles Grün
    "rgb(147 197 253)",
    // Blau (hell)
    "rgb(165 180 252)",
    // Blau (kräftig)
    "rgb(216 180 254)",
    // Indigo
    "rgb(190 242 100)",
    // Violett
    "rgb(253 186 116)"
    // Pink
  ];
  const getBackgroundColor = (currentIndex) => backgroundColors[currentIndex % backgroundColors.length];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "posts-wrapper", children: posts.map((post, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Post, { post, color: getBackgroundColor(index) }, post.id)) }) });
}
function FilterButtons({ fetchPosts }) {
  const [activityFilterIndex, setactivityFilterIndex] = reactExports.useState(ActivityFilterType.NEWEST);
  const [datetimeFilterIndex, setDatetimeFilterIndex] = reactExports.useState(DatetimeFilterType.TODAY);
  const { coords, city } = useGeolocationContext();
  reactExports.useEffect(() => {
    fetchPosts(activityFilterIndex, datetimeFilterIndex, coords == null ? void 0 : coords.latitude, coords == null ? void 0 : coords.longitude);
  }, [activityFilterIndex, datetimeFilterIndex]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header_", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "city-name flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "80%", marginRight: "6px" }, children: "📍" }),
      city,
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        RiArrowDropDownLine,
        {
          style: { fontSize: "50px", paddingTop: "10px" }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content-sorting-control", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setactivityFilterIndex(ActivityFilterType.NEWEST),
          className: `${activityFilterIndex === ActivityFilterType.NEWEST ? "content-sorting-control-button-left-clicked" : "content-sorting-control-button-left"}`,
          children: "⏱️ Newest"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setactivityFilterIndex(ActivityFilterType.MOST_COMMENTED),
          className: `${activityFilterIndex === ActivityFilterType.MOST_COMMENTED ? "content-sorting-control-button-mid-clicked" : "content-sorting-control-button-mid"}`,
          children: "🍿 Most commented"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setactivityFilterIndex(ActivityFilterType.LOUDEST),
          className: `${activityFilterIndex === ActivityFilterType.LOUDEST ? "content-sorting-control-button-right-clicked" : "content-sorting-control-button-right"}`,
          children: "🔥 Loudest"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "time-period-selector", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "time-period-selector-button-holder", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setDatetimeFilterIndex(DatetimeFilterType.NOW),
          className: `${datetimeFilterIndex === DatetimeFilterType.NOW ? "time-period-selector-button-clicked" : "time-period-selector-button"}`,
          children: "Now"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setDatetimeFilterIndex(DatetimeFilterType.TODAY),
          className: `${datetimeFilterIndex === DatetimeFilterType.TODAY ? "time-period-selector-button-clicked" : "time-period-selector-button"}`,
          children: "Today"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setDatetimeFilterIndex(DatetimeFilterType.WEEK),
          className: `${datetimeFilterIndex === DatetimeFilterType.WEEK ? "time-period-selector-button-clicked" : "time-period-selector-button"}`,
          children: "Week"
        }
      )
    ] }) })
  ] }) });
}
function FilterablePostsTable() {
  const { posts, fetchPosts } = useFetchPosts();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GeolocationProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "body_", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FilterButtons, { fetchPosts }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PostsTable, { posts }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CreatePostButton, {})
  ] }) });
}
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterablePostsTable, {}) })
);
