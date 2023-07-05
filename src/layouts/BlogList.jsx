import React, { useMemo, useState } from "react";
import { Tz, culc2Datetime, culc2Unix, getAnyTimespan, transfer2Datetime, transfer2Unix } from "../utils/time-transfer";
import { Outlet } from "react-router-dom";

const BlogList = () => {
  // const [time, setTime] = useState('1970-01-01 00:00:00');
  return (
    <div className="blog-list">
      This is Blog List.
      <Outlet/>
    </div>
  )
  };

export default BlogList;