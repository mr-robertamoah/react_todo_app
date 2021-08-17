import { useSelector } from "react-redux";
import Card from "../components/layouts/Card";
import CenterContainer from "../components/layouts/CenterContainer";
import Welcome from "../components/Welcome";

function Home() {

  let user = useSelector(state=>state.user)
  
  return (
    <CenterContainer>
      {user && <Welcome user={user}></Welcome>}
      
      <Card heading="about this app" className="mt-10">

      </Card>
      <Card heading="what is a todo" className="mt-10">

      </Card>
      <Card heading="creating a todo" className="mt-10">
        
      </Card>
    </CenterContainer>
  );
}

export default Home;
