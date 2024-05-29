import Question from "./Question/Question";
import styles from "./Questions.module.css";

const Questions = () => {
  return (
    <div className={styles.main}>
      <h2>Ответы на вопросы</h2>
      <div className={styles.containerQuestions}>
        <Question
          question="Какие услуги предоставляет провайдер?"
          answer="Провайдер предоставляет услуги интернета, телевидения и связи."
        ></Question>
        <Question
          question="Какие услуги предоставляет провайдер?"
          answer="Провайдер предоставляет услуги интернета, телевидения и связи."
        ></Question>
        <Question
          question="Какие услуги предоставляет провайдер?"
          answer="Провайдер предоставляет услуги интернета, телевидения и связи."
        ></Question>
        <Question
          question="Какие услуги предоставляет провайдер?"
          answer="Провайдер предоставляет услуги интернета, телевидения и связи."
        ></Question>
      </div>
    </div>
  );
};

export default Questions;
