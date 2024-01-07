import { Component } from "react";
import Navigation from "./components/navigation/Navigation";
import HeroSection from "./components/hero-section/HeroSection";
import DetectSection from "./components/detect-section/DetectSection";

// setup clarifai and return request options using it
const returnRequestUsingClarafai = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = "0b67fd927a9441bea48d88e5560ec538";
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "dv080499";
  const APP_ID = "smart-brain";

  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonPress = (event) => {
    this.setState({ imageUrl: this.state.input });

    fetch(
      "https://api.clarifai.com/v2/models/" + "face - detection" + "/outputs",
      returnRequestUsingClarafai
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div className="w-full h-screen bg-slate-200">
        <Navigation />
        <div className="flex flex-col items-center gap-10">
          <HeroSection />
          <DetectSection
            onInputChange={this.onInputChange}
            onButtonPress={this.onButtonPress}
            imageUrl={this.state.imageUrl}
          />
        </div>
      </div>
    );
  }
}

export default App;
