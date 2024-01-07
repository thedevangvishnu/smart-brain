const DetectImageSection = ({ imageUrl }) => {
  return (
    <div className="max-w-lg h-80">
      <img
        id="input-image"
        src={imageUrl}
        alt="Photo entered using the URL"
        className="w-full h-full"
      />
    </div>
  );
};

export default DetectImageSection;
