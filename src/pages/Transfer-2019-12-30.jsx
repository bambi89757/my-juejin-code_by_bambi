import React, { useMemo, useState } from "react";
import { culc2Datetime, culc2Unix, getAnyTimespan, transfer2Datetime, transfer2Unix } from "../utils/time-transfer";

const Transfer = () => {
  const [time, setTime] = useState('1970-01-01 00:00:00');
  const [zone, setZone] = useState('+0000');
  const [unix, setUnix] = useState(0);

  // 测试transfer2Datetime
  const testTransfer2Datetime = useMemo(()=>{
    return transfer2Datetime(unix, zone);
  }, [unix, zone])

// 测试culc2Datetime
const testCulc2Datetime = useMemo(()=>{
  return culc2Datetime(unix, zone);
}, [unix, zone])

  // 测试老方法getAnyTimespan
  const testGetAnyTimespan = useMemo(()=>{
    return getAnyTimespan(time, zone.slice(0,3) + ':' + zone.slice(3,5));
  }, [time, zone])

  // 测试culc2Unix
  const testCulc2Unix = useMemo(()=>{
    return culc2Unix(time, zone);
  }, [time, zone])

  // 测试transfer2Unix
  const testTransfer2Unix = useMemo(()=>{
    return transfer2Unix(time, zone);
  }, [time, zone])
    return (
      <>
        <section className="time-format-converter set-timezone">
          <h5>时区</h5>
          <input value={zone} onChange={(e)=> {setZone(e.target.value)}}/>
        </section>
        <section className="time-format-converter format-to-datetime">
          <h3>时区转换器：转datetime字符</h3>
          <h5>时间戳</h5>
          <textarea cols="100" rows="3" value={unix} onChange={(e) => setUnix(e.target.value)}></textarea>
          <article>
            <h5>transfer2Datetime</h5>
            {testTransfer2Datetime}
          </article>
          <article>
            <h5>culc2Datetime</h5>
            {testCulc2Datetime}
          </article>
        </section>
        <section className="time-format-converter format-to-unix">
          <h3>时区转换器：转unix时间戳</h3>
          <h5>日期时间</h5>
          <textarea cols="100" rows="3" value={time} onChange={(e) => setTime(e.target.value)}></textarea>
          <article>
            <h5>旧方法</h5>
            {testGetAnyTimespan}
          </article>
          <article>
            <h5>culc2Unix</h5>
            {testCulc2Unix}
          </article>
          <article>
            <h5>transfer2Unix</h5>
            {testTransfer2Unix}
          </article>
        </section>
      </>
      
    );
  };

export default Transfer;