import React, { useMemo, useState } from "react";
import { culc2Unix, getAnyTimespan, transfer2Unix } from "../utils/time-transfer";

// const textareaStyle = {
//   width: "600px",
//   minHeight: "80px"
// }

const Transfer = () => {
  const [time, setTime] = useState(null);
  const [zone, setZone] = useState('+0000');

  // 识别时区
  const timeZone = useMemo(()=>{
    return getAnyTimespan(time, zone.slice(0,3) + ':' + zone.slice(3,5));
  }, [time, zone])

  // 转ISO标准时间
  const ISOTime = useMemo(()=>{
    return culc2Unix(time, zone);
  }, [time, zone])

  // 转unix时间戳
  const unixTime = useMemo(()=>{
    return transfer2Unix(time, zone);
  }, [time, zone])
    return (
      <section id="time-format-converter">
        <h3>时区转换器</h3>
        <h5>日期时间</h5>
        <textarea cols="100" rows="3" value={time} onChange={(e) => setTime(e.target.value)}></textarea>
        <h5>时区</h5>
        <input value={zone} onChange={(e)=> {setZone(e.target.value)}}/>
        <article>
          <h5>旧方法</h5>
          {/* <h5>所属时区</h5> */}
          {timeZone}
        </article>
        <article>
          <h5>新计算法</h5>
          {/* <h5>ISO时间</h5> */}
          {ISOTime}
        </article>
        <article>
          <h5>新拼算法</h5>
          {/* <h5>Unix时间</h5> */}
          {unixTime}
        </article>
      </section>
    );
  };

export default Transfer;