import Main from "../components/Main";
import NavBar from "../components/Navbar";
import { cinsole, getWallet } from "../utils";

function Page() {
  cinsole();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 12,
      }}
    >
      <NavBar></NavBar>
      <Main></Main>
    </div>
  );
}

export default Page;
