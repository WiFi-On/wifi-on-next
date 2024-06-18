import styles from "./Policy.module.css";

const Policy = () => {
  return (
    <div className={styles.main}>
      <h1>Политика конфиденциальности</h1>
      <h2>1. Общие положения</h2>
      <p>
        1.1. Настоящая Политика конфиденциальности (далее - Политика) определяет
        порядок обработки и защиты персональных данных пользователей сайта
        on-wifi.ru (далее - Сайт).
      </p>
      <p>
        1.2. Оператором персональных данных является ИП Кривошеин Ярослав
        Петрович, ОГРНИП: 321723200036962, ИНН: 451501513311 (далее - Оператор).
      </p>

      <h2>2. Состав персональных данных</h2>
      <p>
        2.1. Персональные данные, обрабатываемые Оператором, включают в себя:
      </p>
      <ul>
        <li>Фамилия, имя, отчество;</li>
        <li>Контактный телефон;</li>
        <li>Адрес электронной почты;</li>
        <li>Адрес проживания;</li>
        <li>Иные данные, предоставляемые пользователями Сайта.</li>
      </ul>

      <h2>3. Цели обработки персональных данных</h2>
      <p>
        3.1. Оператор обрабатывает персональные данные пользователей для
        следующих целей:
      </p>
      <ul>
        <li>Предоставление услуг, предлагаемых на Сайте;</li>
        <li>Осуществление обратной связи с пользователями;</li>
        <li>
          Улучшение качества обслуживания и совершенствование работы Сайта;
        </li>
        <li>Выполнение требований законодательства РФ.</li>
      </ul>

      <h2>4. Принципы и условия обработки персональных данных</h2>
      <p>
        4.1. Обработка персональных данных осуществляется на законной и
        справедливой основе.
      </p>
      <p>
        4.2. Оператор обрабатывает персональные данные только с согласия
        пользователей, за исключением случаев, предусмотренных законодательством
        РФ.
      </p>
      <p>
        4.3. Оператор принимает все необходимые меры для защиты персональных
        данных от несанкционированного доступа, изменения, раскрытия или
        уничтожения.
      </p>

      <h2>5. Права пользователей</h2>
      <p>5.1. Пользователи имеют право:</p>
      <ul>
        <li>
          Получать информацию о своих персональных данных, обрабатываемых
          Оператором;
        </li>
        <li>
          Требовать уточнения, блокирования или уничтожения своих персональных
          данных, если они являются неполными, устаревшими, неточными или
          незаконно полученными;
        </li>
        <li>Отозвать свое согласие на обработку персональных данных;</li>
        <li>
          Бжаловать действия или бездействие Оператора в уполномоченный орган по
          защите прав субъектов персональных данных.
        </li>
      </ul>

      <h2>6. Заключительные положения</h2>
      <p>
        6.1. Настоящая Политика является общедоступным документом и размещена на
        Сайте.
      </p>
      <p>
        6.2. Оператор оставляет за собой право вносить изменения в Политику в
        одностороннем порядке. Изменения вступают в силу с момента их
        опубликования на Сайте.
      </p>
    </div>
  );
};

export default Policy;
