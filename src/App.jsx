
import Header from "./components/Header";
import PostList from "./components/PostList";
import PostDetails from "./components/PostDetails";
import useLocalStorage from "./hooks/useLocalStorage";
import useWindowWidth from "./hooks/useWindowWidth";
import "./App.css";

function App() {
  const [selectedPostId, setSelectedPostId] = useLocalStorage(
    "lastSelectedPostId",
    null
  );

  const width = useWindowWidth();

  return (
    <div className="app">
      <Header />

      <main
        className={`main-container ${
          width < 600 ? "single-column" : "two-columns"
        }`}
      >
        <PostList
          onSelectPost={setSelectedPostId}
          selectedPostId={selectedPostId}
        />

        <PostDetails postId={selectedPostId} />
      </main>
    </div>
  );
}

export default App;
