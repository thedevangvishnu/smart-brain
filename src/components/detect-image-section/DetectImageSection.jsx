const DetectImageSection = ({ imageUrl, faceBox }) => {
  const { topRow, leftCol, bottomRow, rightCol } = faceBox;
  return (
    <div className="max-w-lg h-80 relative">
      <img
        id="input-image"
        src={imageUrl}
        alt="Input entered using URL"
        className="w-full h-full"
      />
      <div
        className={`absolute flex flex-wrap justify-center cursor-pointer  border-4 border-solid border-green-400 shadow-inner`}
        style={{
          top: topRow,
          right: rightCol,
          bottom: bottomRow,
          left: leftCol,
        }}
      ></div>
    </div>
  );
};

export default DetectImageSection;
