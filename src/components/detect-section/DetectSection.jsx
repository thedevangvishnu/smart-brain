const DetectSection = () => {
  return (
    <div className="flex shadow-lg">
      <input className="px-4" type="text" placeholder="Enter the image URL" />
      <button className="bg-slate-900 text-white px-8 py-2 tracking-widest">
        DETECT
      </button>
    </div>
  );
};

export default DetectSection;
