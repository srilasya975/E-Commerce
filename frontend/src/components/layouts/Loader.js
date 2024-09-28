import { Fragment } from "react";
import { LineWave } from "react-loader-spinner";
const Loader = () => {
  return (
    <Fragment>
      <div className="w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <LineWave
          visible={true}
          height="100"
          width="100"
          color="#FF6201"
          ariaLabel="line-wave-loading"
          wrapperStyle={{}}
          wrapperClass=""
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      </div>
    </Fragment>
  );
};
export default Loader;
