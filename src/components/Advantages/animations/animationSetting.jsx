import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const AnimationSetting = ({ animation }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Устанавливаем состояние, когда компонент загружен на клиенте
  }, []);

  if (!isClient) return null; // Возвращаем null до загрузки на клиенте

  return (
    <div>
      <Lottie animationData={animation} loop={true} />
    </div>
  );
};

export default AnimationSetting;
