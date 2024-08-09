import { useEffect } from "react";
import styles from "./PopUpComparison.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsOpenPopUpComparison,
  closePopUpComparison,
} from "../../redux/reducers/modalSlice";
import { CSSTransition } from "react-transition-group";

const PopUpComparison = () => {
  const isOpen = useSelector(selectIsOpenPopUpComparison);
  const dispatch = useDispatch();
  const router = useRouter();
  const { city } = router.query;

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        dispatch(closePopUpComparison());
      }, 2000);

      return () => clearTimeout(timer); // Очистка таймера при размонтировании или смене состояния
    }
  }, [isOpen, dispatch]);

  const handleClose = () => {
    dispatch(closePopUpComparison());
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive,
      }}
      unmountOnExit
    >
      <div className={styles.main}>
        <div className={styles.head}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClose}
            className={styles.closeIcon}
          >
            <path
              d="M0.549249 0.549615C0.624723 0.47395 0.714383 0.413917 0.813094 0.372957C0.911805 0.331996 1.01763 0.310913 1.1245 0.310913C1.23137 0.310913 1.33719 0.331996 1.4359 0.372957C1.53461 0.413917 1.62427 0.47395 1.69975 0.549615L5.9995 4.85099L10.2992 0.549615C10.3748 0.474072 10.4645 0.414148 10.5632 0.373265C10.6619 0.332381 10.7677 0.311338 10.8745 0.311338C10.9813 0.311338 11.0871 0.332381 11.1858 0.373265C11.2845 0.414148 11.3742 0.474072 11.4497 0.549615C11.5253 0.625158 11.5852 0.71484 11.6261 0.813542C11.667 0.912243 11.688 1.01803 11.688 1.12487C11.688 1.2317 11.667 1.33749 11.6261 1.43619C11.5852 1.53489 11.5253 1.62457 11.4497 1.70012L7.14837 5.99987L11.4497 10.2996C11.5253 10.3752 11.5852 10.4648 11.6261 10.5635C11.667 10.6622 11.688 10.768 11.688 10.8749C11.688 10.9817 11.667 11.0875 11.6261 11.1862C11.5852 11.2849 11.5253 11.3746 11.4497 11.4501C11.3742 11.5257 11.2845 11.5856 11.1858 11.6265C11.0871 11.6673 10.9813 11.6884 10.8745 11.6884C10.7677 11.6884 10.6619 11.6673 10.5632 11.6265C10.4645 11.5856 10.3748 11.5257 10.2992 11.4501L5.9995 7.14874L1.69975 11.4501C1.62421 11.5257 1.53452 11.5856 1.43582 11.6265C1.33712 11.6673 1.23133 11.6884 1.1245 11.6884C1.01767 11.6884 0.911877 11.6673 0.813176 11.6265C0.714474 11.5856 0.624792 11.5257 0.549249 11.4501C0.473706 11.3746 0.413782 11.2849 0.372898 11.1862C0.332015 11.0875 0.310972 10.9817 0.310972 10.8749C0.310972 10.768 0.332015 10.6622 0.372898 10.5635C0.413782 10.4648 0.473706 10.3752 0.549249 10.2996L4.85062 5.99987L0.549249 1.70012C0.473584 1.62464 0.413551 1.53498 0.372591 1.43627C0.33163 1.33756 0.310547 1.23174 0.310547 1.12487C0.310547 1.01799 0.33163 0.912171 0.372591 0.81346C0.413551 0.71475 0.473584 0.625089 0.549249 0.549615Z"
              fill="#828282"
            />
          </svg>
        </div>
        <div className={styles.body}>
          <p>Тариф добавлен в список сравнения</p>
          <button onClick={() => router.push(`/${city}/compare`)}>
            Перейти к сравнению
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default PopUpComparison;
