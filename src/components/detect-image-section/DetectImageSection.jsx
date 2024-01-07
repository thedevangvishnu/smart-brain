const DetectImageSection = ({ imageUrl }) => {
  return (
    <div className="max-w-lg h-80">
      <img
        src={imageUrl}
        alt="Photo entered using the URL"
        className="w-full h-full"
      />
    </div>
  );
};

export default DetectImageSection;
