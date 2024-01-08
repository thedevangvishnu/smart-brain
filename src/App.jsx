import { Component } from "react";
import Navigation from "./components/navigation/Navigation";
import HeroSection from "./components/hero-section/HeroSection";
import InputSection from "./components/input-section/InputSection";
import DetectImageSection from "./components/detect-image-section/DetectImageSection";

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
    };
  }

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

  render() {
    return (
      <div className="w-full h-screen bg-slate-200">
        <Navigation />
        <div className="flex flex-col items-center gap-10">
          <HeroSection />
          <InputSection
            onInputChange={this.onInputChange}
            onButtonPress={this.onButtonPress}
          />
          <DetectImageSection
            faceBox={this.state.box}
            imageUrl={this.state.imageUrl}
          />
        </div>
      </div>
    );
  }
}

export default App;
