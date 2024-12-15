import {StrictMode, useEffect, useState} from "react";
import {BiCommentDetail} from "react-icons/bi";
import {RiArrowDropDownLine} from "react-icons/ri";
import {createRoot} from "react-dom/client";
import "../App.css";
// import jsonData from "../data/posts.json";
import useFetchPosts from "../hooks/useFetchPosts.tsx";
import {IPost} from "../interfaces/IPost.ts";
import useFetchComments from "../hooks/useFetchComments.tsx";
import {IComment} from "../interfaces/IComment.ts";
import {EntityType} from "../enum/EntityType.ts";
import {VoteType} from "../enum/VoteType.ts";
import {ActivityFilterType} from "../enum/ActivityFilterType.ts";
import {DatetimeFilterType} from "../enum/DatetimeFilterType.ts";
import {GeolocationProvider, useGeolocationContext} from "../context/GeolocationContext.tsx";
import {useGeolocated} from "react-geolocated";


function CreatePostButton() {
  const[isCreatingNewPost, setIsCreatingNewPost] = useState(false);
  const[newPostContent, setNewPostContent] = useState('');
  const {coords} = useGeolocated();

  const handleCreateNewPost = async (e: React.FormEvent) =>{
    e.preventDefault();


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: newPostContent, longitude: coords?.longitude, latitude: coords?.latitude })
    };

    try{
      const response = await fetch("http://localhost:8080/post/api/create_post", requestOptions);
      const result = await response.json();

      console.log(response);
      console.log(result);

      if(response.ok){
        setIsCreatingNewPost(false);
      }

    }catch(error){
      console.log(error);
    }
  }


  return (
    <>
    {isCreatingNewPost ? (
         <div>
         <div className="fixed inset-0 bg-gray-500 bg-opacity-70 z-40"></div>
         <div className="sticky-center rounded-lg bg-white p-4 shadow-lg max-w-lg mx-auto z-50">
           <textarea
           value={newPostContent}
            onChange={(e) => {
              setNewPostContent(e.target.value);
              console.log(newPostContent);
            }}
             className="mt-4 w-full rounded-md bg-gray-100 p-2 outline-none focus:ring-2 focus:ring-blue-300"
             placeholder="What's on your mind?"
             rows={4}
           ></textarea>
           <button
           onClick={(e) => handleCreateNewPost(e)}
            className="mt-4 w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
             Post
           </button>
           <button
          onClick={() => setNewPostContent("")}
           className="mt-2 w-full rounded-full bg-gray-200 px-4 py-2 font-bold text-gray-700 hover:bg-gray-300">
             Clear
           </button>
           <button
           onClick={() => setIsCreatingNewPost(false)} 
           className="mt-2 w-full rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
             Exit
           </button>
         </div>
       </div>
    ):(
      <div>
      <button 
      onClick={() => setIsCreatingNewPost(true)}
      className="sticky-bottom bg-orange-500 hover:bg-orange-700 border-black text-white border-2 font-bold py-3 px-6 rounded-full mb-5">
        <i className="fas fa-plus"></i> Create new post
      </button>
      </div>
    )}
    </>
  );
}

function Like({ voteCount, id, entityType, initialVoteStatus }: { voteCount: number, id: number, entityType: EntityType, initialVoteStatus: VoteType}) {
  const [voteStatus, setVoteStatus] = useState(initialVoteStatus);
  const [votes, setVotes] = useState(voteCount);

  const handleSetVote = async (voteType: boolean) =>{

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id, voteType: voteType, entityType: entityType })
    };

    try{
      const response = await fetch("http://localhost:8080/vote/api/vote", requestOptions);
      console.log(response);

      if(response.ok){
        console.log("Success");
      }

    }catch(error){
      console.log(error);
    }
  }

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

  return (
    <>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleLike}
          className={
            voteStatus === VoteType.LIKE ? "vote-button-liked" : "vote-button-like"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={voteStatus === VoteType.LIKE ? "3" : "2"}
              d="M5 15l7-7 7 7"
            ></path>
          </svg>
        </button>
        <span>{votes}</span>
        <button
          onClick={handleDislike}
          className={
            voteStatus === VoteType.DISLIKE
              ? "vote-button-disliked"
              : "vote-button-dislike"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={voteStatus === VoteType.DISLIKE ? "3" : "2"}
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
}


function Comment({comment}: { comment: IComment}) {
  return (
      <>
        {/* Individual Comment */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">{comment.created}</span>
            </div>
            <p className="text-gray-700 mt-1">{comment.content}</p>

          <Like voteCount={comment.voteCount} id={comment.id} entityType={EntityType.COMMENT} initialVoteStatus={comment.voteStatus}/>
        </div>
      </div>
    </>
  );
}


function CommentSection({postId}: {postId: number}) {
  const [newCommentContent, setNewCommentContent] = useState('');
  const {comments, loading, error, fetchComments} = useFetchComments(postId);

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCreateNewComment = async (e: React.FormEvent) =>{
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'
      },
      body: JSON.stringify({ postId: postId, content: newCommentContent })
    };

    try{
      const response = await fetch("http://localhost:8080/comment/api/create_comment", requestOptions);
      console.log(response);

      if(response.ok){
        setNewCommentContent("");
        fetchComments();
        console.log("Success");
      }

    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      {/* Comments Section */}
      <div className="bg-slate-300 p-6 rounded-lg shadow-md mb-6">
        <p className="text-xl font-semibold text-gray-800 mb-4">Comments</p>

        {/* Comments */}
        <div className="comments-wrapper">

          {loading && <div>Loading...</div>}
          {error && <div>Couldn't fetch comments...</div>}

          {comments && comments.length > 0 ? (
              comments.map((comment: IComment) => (
                  <Comment key={comment.id} comment={comment}/>
              ))
          ) : (
              <p>Really empty inside here...🥱</p>
          )}
        </div>

        {/* Comments END */}

        {/* Add new Comment Start */}
        <div className="mt-6">
          <textarea
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              className="w-full p-4 border rounded-md text-sm text-gray-700"
              placeholder="Write your comment..."
              rows={3}
          ></textarea>
          <button
              onClick={(e) => handleCreateNewComment(e)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Post Comment
          </button>
        </div>
        {/* Add new Comment END */}

      </div>
    </>
  );
}

function Post({post, color}: { post: IPost; color: string }) {
  const [isCommentSectionOpened, setCommentSectionOpened] = useState(false);

  const MAX_CHARACTERS = 150;

  const truncatedContent = post.content.length > MAX_CHARACTERS
      ? post.content.substring(0, MAX_CHARACTERS) + "..."
      : post.content;

  return (
    <>
      {/* POST 1 */}
      <div className="post" style={{ background: color }}>
        <p className="text-gray-700">{truncatedContent}</p>
        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
          <span>{post.created}</span>

          <div className={"flex items-center space-x-2"}>
            <button
              onClick={() => setCommentSectionOpened(!isCommentSectionOpened)}
            >
              <BiCommentDetail className="BiCommentDetailStyle"/>
            </button>
            <span> {post.commentCount} </span>
          </div>

          <Like voteCount={post.voteCount} id={post.id} entityType={EntityType.POST} initialVoteStatus={post.voteStatus}/>
        </div>
      </div>
      {/* POST 1 END */}
      {isCommentSectionOpened && <CommentSection postId={post.id}/>}
    </>
  );
}

function PostsTable({ posts }: { posts: IPost[] }) {
  const backgroundColors = [
    "rgb(253 164 175)", // Rot
    "rgb(252 211 77)", // Orange
    "rgb(253 224 71)", // Gelb
    "rgb(52 211 153)", // Grün
    "rgb(134 239 172)", // Helles Grün
    "rgb(147 197 253)", // Blau (hell)
    "rgb(165 180 252)", // Blau (kräftig)
    "rgb(216 180 254)", // Indigo
    "rgb(190 242 100)", // Violett
    "rgb(253 186 116)", // Pink
  ];

  const getBackgroundColor = (currentIndex: number) =>
    backgroundColors[currentIndex % backgroundColors.length];

  return (
    <>
      {/* POSTS */}
      <div className="posts-wrapper">
        {posts.map((post, index) => (
          <Post key={post.id} post={post} color={getBackgroundColor(index)} />
        ))}
      </div>
    </>
  );
}

function FilterButtons({ fetchPosts }: { fetchPosts: (activityFilterIndex: ActivityFilterType, datetimeFilterIndex: DatetimeFilterType, latitude: number | undefined, longitude: number | undefined) => void }) {
  const [activityFilterIndex, setactivityFilterIndex] = useState(ActivityFilterType.NEWEST);
  const [datetimeFilterIndex, setDatetimeFilterIndex] = useState(DatetimeFilterType.TODAY);
  const { coords, city } = useGeolocationContext();


  useEffect(() => {
    fetchPosts(activityFilterIndex, datetimeFilterIndex, coords?.latitude, coords?.longitude);

  }, [activityFilterIndex, datetimeFilterIndex]);

  return (
    <>
      {/* Header */}
      <div className="header_">
        {/* City Name */}

        <h1 className="city-name flex items-center">
          <span style={{ fontSize: "80%", marginRight: "6px" }}>📍</span>
          {city}
          <button>
            <RiArrowDropDownLine
              style={{ fontSize: "50px", paddingTop: "10px" }}
            />
          </button>
        </h1>

        {/* Newest - Most commented - Loudest */}
        <div className="content-sorting-control">
          <button
            onClick={() => setactivityFilterIndex(ActivityFilterType.NEWEST)}
            className={`${
              activityFilterIndex === ActivityFilterType.NEWEST
                ? "content-sorting-control-button-left-clicked"
                : "content-sorting-control-button-left"
            }`}
          >
            ⏱️ Newest
          </button>
          <button
            onClick={() => setactivityFilterIndex(ActivityFilterType.MOST_COMMENTED)}
            className={`${
              activityFilterIndex === ActivityFilterType.MOST_COMMENTED
                ? "content-sorting-control-button-mid-clicked"
                : "content-sorting-control-button-mid"
            }`}
          >
            🍿 Most commented
          </button>
          <button
            onClick={() => setactivityFilterIndex(ActivityFilterType.LOUDEST)}
            className={`${
              activityFilterIndex === ActivityFilterType.LOUDEST
                ? "content-sorting-control-button-right-clicked"
                : "content-sorting-control-button-right"
            }`}
          >
            🔥 Loudest
          </button>
        </div>

        {/* Jetzt - Heute - Woche */}
        <div className="time-period-selector">
          <div className="time-period-selector-button-holder">
            <button
                onClick={() => setDatetimeFilterIndex(DatetimeFilterType.NOW)}
                className={`${datetimeFilterIndex === DatetimeFilterType.NOW ? "time-period-selector-button-clicked" : "time-period-selector-button"
                }`}
            >Now</button>

            <button
                onClick={() => setDatetimeFilterIndex(DatetimeFilterType.TODAY)}
                className={`${datetimeFilterIndex === DatetimeFilterType.TODAY ? "time-period-selector-button-clicked" : "time-period-selector-button"}`}
            >Today</button>

            <button
                onClick={() => setDatetimeFilterIndex(DatetimeFilterType.WEEK)}
                className={`${datetimeFilterIndex === DatetimeFilterType.WEEK ? "time-period-selector-button-clicked" : "time-period-selector-button"}`}
            >Week</button>
          </div>
        </div>
      </div>
      {/* Header END */}
    </>
  );
}

function FilterablePostsTable() {
  const { posts, fetchPosts } = useFetchPosts();

  return (
      <GeolocationProvider>
        <div className="body_">
          <FilterButtons fetchPosts={fetchPosts} />
          <PostsTable posts={posts} />
          <CreatePostButton></CreatePostButton>
        </div>
      </GeolocationProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilterablePostsTable/>
  </StrictMode>
);
