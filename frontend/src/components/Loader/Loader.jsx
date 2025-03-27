import { useUser } from "../../context/UserContext";

export default function Loader({small = false}) {
    const { loading } = useUser();

    if (!loading) return null; // ✅ Hide loader when `loading` is false
        return (
          <div className={`${small ? "w-5 h-5" : "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"}`}>
            <div className={`${small ? "w-5 h-5" : "w-12 h-12"} border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin`}></div>
          </div>
        );
      
}
