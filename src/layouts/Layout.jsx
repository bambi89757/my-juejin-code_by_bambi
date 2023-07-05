import React, { useMemo, useState } from "react";
import { Tz, culc2Datetime, culc2Unix, getAnyTimespan, transfer2Datetime, transfer2Unix } from "../utils/time-transfer";
import Header from "./Header";
import './style.css';

const Layout = ({children}) => {
  // const [time, setTime] = useState('1970-01-01 00:00:00');
  return (
    <main>
      <Header/>
      {children}
    </main>
  )
  };

export default Layout;