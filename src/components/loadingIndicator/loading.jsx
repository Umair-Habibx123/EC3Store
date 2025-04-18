import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 z-[9999]">
      <div className="text-center">
        <ClipLoader color="#36d7b7" size={60} />
        <p className="mt-4 text-gray-700 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
