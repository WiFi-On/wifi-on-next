// Импорт компонента Lottie и JSON-файла
import Lottie from "lottie-react";
import header from "./header.json";

const LottieAnimation = () => {
  return (
    <div>
      <Lottie animationData={header} loop={true} />
    </div>
  );
};

export default LottieAnimation;
