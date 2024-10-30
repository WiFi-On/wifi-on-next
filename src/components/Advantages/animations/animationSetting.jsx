// Импорт компонента Lottie и JSON-файла
import Lottie from "lottie-react";

const AnimationSetting = ({ animation }) => {
  return (
    <div>
      <Lottie animationData={animation} loop={true} />
    </div>
  );
};

export default AnimationSetting;
