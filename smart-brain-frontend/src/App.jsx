import { Component } from "react";
import Navigation from "./components/navigation/Navigation";
import HeroSection from "./components/hero-section/HeroSection";
import InputSection from "./components/input-section/InputSection";
import DetectImageSection from "./components/detect-image-section/DetectImageSection";
import SignIn from "./components/sign-in/SignIn";
import Register from "./components/register/Register";

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
      box: {},
      route: "signIn",
      signedIn: false,
      user: {
        id: "",
        username: "",
        email: "",
        password: "",
        enteries: 0,
        joined: "",
      },
    };
  }

  loadUser = (userData) => {
    const { id, username, email, password, enteries, joined } = userData;
    this.setState({
      user: {
        id: id,
        username: username,
        email: email,
        password: password,
        enteries: enteries,
        joined: joined,
      },
    });
  };

  calculateFaceBox = (result) => {
    const image = document.getElementById("input-image");
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);

    let faceBox = {};

    const regions = result.outputs[0].data.regions;
    regions.forEach((region) => {
      // Accessing and rounding the bounding box values
      const boundingBox = region.region_info.bounding_box;
      const topRow = boundingBox.top_row;
      const leftCol = boundingBox.left_col;
      const bottomRow = boundingBox.bottom_row;
      const rightCol = boundingBox.right_col;

      faceBox.leftCol = leftCol * imageWidth;
      faceBox.topRow = topRow * imageHeight;
      faceBox.rightCol = imageWidth - rightCol * imageWidth;
      faceBox.bottomRow = imageHeight - bottomRow * imageHeight;
    });
    return faceBox;
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonPress = (event) => {
    this.setState({ imageUrl: this.state.input });

    fetch(
      "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
      returnRequestUsingClarafai(this.state.input)
    )
      .then((response) => response.json())
      .then((result) => this.displayFaceBox(this.calculateFaceBox(result)))
      .catch((error) => console.log("error", error));
  };

  onSignIn = (route) => {
    this.setState({ route: route, signedIn: true });
  };

  onSignOut = (route) => {
    this.setState({ route: route, signedIn: false });
  };

  onRegister = (route) => {
    this.setState({ route: route, signedIn: true });
  };

  render() {
    return (
      <div className="w-full h-screen bg-slate-200">
        <Navigation signedIn={this.state.signedIn} onSignOut={this.onSignOut} />
        <div className="flex flex-col items-center gap-10">
          <HeroSection />
          {this.state.route === "home" ? (
            <div className="flex flex-col gap-4 items-center relative">
              <InputSection
                onInputChange={this.onInputChange}
                onButtonPress={this.onButtonPress}
              />
              <DetectImageSection
                faceBox={this.state.box}
                imageUrl={this.state.imageUrl}
              />
            </div>
          ) : this.state.route === "signIn" ? (
            <SignIn onSignIn={this.onSignIn} />
          ) : (
            <Register loadUser={this.loadUser} onRegister={this.onRegister} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
