import React, { useEffect, useState } from 'react';
import styles from '../Auction/Timer.module.css';

const Timer = () => {
  // 시간을 담을 변수
  const [count, setCount] = useState(1);

  useEffect(() => {
    // 설정된 시간 간격마다 setInterval 콜백이 실행된다.
    const id = setInterval(() => {
      // 타이머 숫자가 하나씩 줄어들도록
      setCount((count) => count - 1);
    }, 60000);

    // 0이 되면 카운트가 멈춤
    if (count === 0) {
      clearInterval(id);
    }
    return () => clearInterval(id);
    // 카운트 변수가 바뀔때마다 useEffecct 실행
  }, [count]);

  return (
    <div className={styles.timer}>
      <span className={styles.count}>{count}</span>
    </div>
  );
};

export default Timer;
