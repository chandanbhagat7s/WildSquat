import { useDispatch, useSelector } from "react-redux";
import { defaulta } from "../../redux/slices/errorSlice";

export const AlertBox = () => {
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch((state) => state.error);

  setTimeout(() => {
    dispatch(defaulta({ message: "" }));
  }, [4000]);

  return (
    <>
      <div className="fixed " style={{ zIndex: 1000000 }}>
        {error.status == "" && <></>}
        {error.status == "success" && (
          <>
            <div className=" px-5 py-3 font-bold rounded-xl capitalize w-[100vw] flex justify-center bg-green-100">
              {error.message}
            </div>
          </>
        )}
        {error.status == "info" && (
          <>
            <div className=" px-5 py-5 font-bold rounded-xl capitalize w-[100vw] flex justify-center bg-blue-100">
              {error.message}
            </div>
          </>
        )}
        {error.status == "warning" && (
          <>
            <div className=" px-5 py-3 font-bold rounded-xl capitalize w-[100vw] flex justify-center bg-yellow-100">
              {error.message}
            </div>
          </>
        )}
        {error.status == "error" && (
          <>
            <div className=" px-5 py-3 font-bold rounded-xl capitalize w-[100vw] flex justify-center bg-red-100">
              {error.message}
            </div>
          </>
        )}
      </div>
    </>
  );
};
