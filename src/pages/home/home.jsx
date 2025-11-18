import TopBar from "../../components/top_bar/top_bar";
import TagSelector from "../../components/tag_selector/tag_selector";
import "./home.scss";

function Home() {
  return (
    <main className="home">
      <TopBar />
      <TagSelector />
      <h1>Welcome to the Pet App Home Page</h1>
      <p>Find your perfect pet companion here!</p>
    </main>
  );
}

export default Home;
