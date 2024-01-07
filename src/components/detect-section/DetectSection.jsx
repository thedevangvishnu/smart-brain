const InputSection = ({ onInputChange, onButtonPress, imageUrl }) => {
  return (
    <div className="flex shadow-lg">
      <input
        className="px-4"
        type="text"
        placeholder="Enter the image URL"
        onChange={onInputChange}
      />
      <button
        className="bg-slate-900 text-white px-8 py-2 tracking-widest"
        onClick={onButtonPress}
      >
        DETECT
      </button>

      {/* image section */}
      <div className="w-96 h-auto">
        <img src={imageUrl} alt="Photo entered using the URL" />
      </div>
    </div>
  );
};

export default InputSection;
