import TopBar from "../../components/top_bar/top_bar";
import "./home.scss";

function Home() {
  return (
    <main className="home">
      <TopBar />
      <h1>Welcome to the Pet App Home Page</h1>
      <p>Find your perfect pet companion here!</p>
    </main>
  );
}

export default Home;
