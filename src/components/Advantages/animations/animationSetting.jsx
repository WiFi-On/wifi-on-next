// Импорт компонента Lottie и JSON-файла
import Lottie from "lottie-react";

const AnimationSetting = ({ animation }) => {
  return <Lottie animationData={animation} loop={true} />;
};

export default AnimationSetting;
