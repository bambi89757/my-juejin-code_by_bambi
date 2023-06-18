// 计算以分钟为单位的时区gap，例如 '+04:00'被转换为240
function getOffsetMinute(timeZone) {
    if (!/^[+-][0-9]{2}:((0[0-9])|([1-5][0-9]))$/.test(timeZone)) { // 与产品沟通，暂时使用较为严格的格式验证限制，缺少首位0和正负号视为非法格式
        return 0;
    }
    let time = timeZone.split(':');

    if (timeZone[0] === '-') {
        return parseInt(time[0]) * 60 - parseInt(time[1].slice(0,2)); //time[0]本身带正负号不需要加，time[1]不带需要加。
    } else {
        return parseInt(time[0]) * 60 + parseInt(time[1].slice(0,2));
    }
}

function getOffsetTz(minute) {
    const h = Math.floor(minute / 60);
    const m = minute % 60;
    return (h > 0 ? '-' : '+')
             + h.replace(/^\d$/, '0$')
             + m.replace(/^\d$/, '0$')
}

function placeZeroTime(date) {
    if (!/[0-5][0-9]:[0-5][0-9]$/.test(date)) return date +  ' 00:00:00';
    return date;
}

/**
* @date {str} 时间字符串 - '2015-01-01'、'2015-01-01 12'、 '2015-01-01 12:11'、'2015-01-01 12:12:12'格式
* @timeZone {str} 时区字符串 - '+0400'、'+0000'格式
* @returns {number|string} 按时区转换的Unix时间戳 or 错误提示
*/

export const transfer2Unix = (date, timeZone) => {
    // 如果输入的date不是要求的格式，返回Invalid Date
    const Error1 = 'Invalid Date';
    // 如果输入的timeZone不是要求的格式，返回Invalid TimeZone
    const Error2 = 'Invalid TimeZone';
    // 如果检测出date包含时区，则提示第二个timeZone参数无效
    const Warn =() => '【日期时间】已包含时区：' + new Date(date).getTime();

    // 1. 【Error】date无法识别
    if (new Date(date).toString() === 'Invalid Date') return Error1;
    // 2. 【Warn】date是Date对象，提示已经包含了时区
    if (date instanceof Date) return Warn();
    // 3. 【Error】date不是字符串不是Date对象，不予解析。
    if (typeof date !== 'string') return Error1;
    // 4. 【Warn】date是字符串，字符串末尾包含时区
    if (/([+-][01][0-9][0-5][0-9])|Z$/.test(date)) return Warn();
    // 5. 【Error】timeZone格式不对，返回Invalid TimeZone
    if (!/^[+-][01][0-9][0-5][0-9]$|^undefined$|^$/.test(timeZone)) return Error2;
    
    // 6.1 date是字符串，加入时区之前需要保证含有hh:mm
    date = placeZeroTime(date);
    // 6.2 【Success】date是合法字符，没传timeZone，默认是本地时区不用处理timeZone
    if (!timeZone) return new Date(date).getTime();
    // 6.3 【Success】date是合法字符，可以直接拼接timeZone字符，直接得出Unix。
    return new Date(date + timeZone).getTime();
}

// culc
export const culc2Unix = (date, timeZone) => {
    // 如果输入的date不是要求的格式，返回Invalid Date
    const Error1 = 'Invalid Date';
    // 如果输入的timeZone不是要求的格式，返回Invalid TimeZone
    const Error2 = 'Invalid TimeZone';
    // 如果检测出date包含时区，则提示第二个timeZone参数无效
    const Warn =() => '【日期时间】已包含时区：' + new Date(date).getTime();

    // 1. 【Error】date无法识别
    if (new Date(date).toString() === 'Invalid Date') return Error1;
    // 2. 【Warn】date是Date对象，提示已经包含了时区
    if (date instanceof Date) return Warn();
    // 3. 【Error】date不是字符串不是Date对象，不予解析。
    if (typeof date !== 'string') return Error1;
    // 4. 【Warn】date是字符串，字符串末尾包含时区
    if (/([+-][01][0-9][0-5][0-9])|Z$/.test(date)) return Warn();
    // 5. 【Error】timeZone格式不对，返回Invalid TimeZone
    if (!/^[+-][01][0-9][0-5][0-9]$|^undefined$|^$/.test(timeZone)) return Error2;
    
    // 6.1 date是字符串，加入时区之前需要保证含有hh:mm
    date = placeZeroTime(date);
    // 6.2 【Success】date是合法字符，没传timeZone，默认是本地时区不用处理timeZone
    if (!timeZone) return new Date(date).getTime();
    // 6.2 【Success】date是合法字符，需要配合timeZone，进行毫秒计算，来得出Unix。
    const localUnix = new Date(date).getTime(); // 本地时间为date时 毫秒数
    const localZeroUnixGap = new Date(date).getTimezoneOffset() * 60 * 1000; // 本地时间和零时区的Gap 毫秒数
    const timeZoneZeroUnixGap = getOffsetMinute(timeZone.slice(0,3) + ':' + timeZone.slice(3,5)) * 60 * 1000; // 零时区与目标时区的Gap 毫秒数
    return localUnix - (localZeroUnixGap + timeZoneZeroUnixGap); // 本地时区为date的毫秒数 - 本地时区与目标时区所差的毫秒数 = 目标时区为date的毫秒数(Unix时间戳)
}


// old 

export const getAnyTimespan = (date, timeZone) => {
    if(!/^\d{5,}$/.test(date)) {
        date = String(date)
        .replace(/^([0-9]{4})$/, '$1-01-01 00:00:00')
        .replace(/^([0-9]{4}-[0-9]{2})$/, '$1-01 00:00:00')
        .replace(/^([0-9]{4}-[0-9]{2}-[0-9]{2})$/, '$1 00:00:00')
        .replace(/^([0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2})$/, '$1:00:00')
        date = new Date(date).getTime()
        
        return date - new Date(date).getTimezoneOffset() * 60 * 1000 - getOffsetMinute(timeZone) * 60 * 1000;
    }
    return date;
}

function pl0(timeString) {
    return `${timeString}`.replace(/^(\d)$/,'0$1');
}

// 计算以分钟为单位的时区gap，例如 '+04:00'被转换为240
function culcMinute(tz) {
    const time = [tz.slice(0,3), tz.slice(3,5)];
    const h = parseInt(time[0]) * 60;
    const m = tz[0] === '-' ? - parseInt(time[1]) : parseInt(time[1])
    return h + m;
}

/**
* @unix {number|Date} 时间戳 - 1564704000000格式
* @timeZone {str} 时区字符串 - '+04:00'、'+00:00'格式
* @returns {str} - '2015-01-01 12:12:12'格式
*/
export const transfer2Datetime = (unix, timeZone) => {
    const gap = culcMinute(timeZone);
    const targetTimeUnixIfUTC = +unix + gap * 60 * 1000;
    const t = new Date(targetTimeUnixIfUTC)
    return `${t.getUTCFullYear()}-` +
        `${pl0(t.getUTCMonth() + 1)}-` +
        `${pl0(t.getUTCDate())} ` +
        `${pl0(t.getUTCHours())}:` +
        `${pl0(t.getUTCMinutes())}:` +
        `${pl0(t.getUTCSeconds())}`;
}

export const culc2Datetime = (unix, timeZone) => {
    // 计算日期需要的常量
    const d = new Date(+unix);
    const monthCycleDays = [31,, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const getMonthCycleDays = (month, year) => monthCycleDays[month] ? monthCycleDays[month] : (year % 4 ? 29 : 28)
    const UTCMonth = d.getUTCMonth();
    const lastUTCMonth = UTCMonth - 1;
    const UTCYear = d.getUTCFullYear();
    const currentCycleDays = getMonthCycleDays(UTCMonth, UTCYear);
    const lastCycleDays = getMonthCycleDays(lastUTCMonth + (lastUTCMonth >= 0 ? 0 : 12), UTCYear);

    // 开始计算
    const gapSeconds = culcMinute(timeZone) * 60;
    const orgSeconds = d.getUTCSeconds() + gapSeconds;
    const modSeconds = orgSeconds % 60;
    const seconds = pl0(modSeconds + (modSeconds >= 0 ? 0 : 60));
    const orgMinutes =  d.getUTCMinutes() + Math.floor(orgSeconds / 60);
    const modMinutes = orgMinutes % 60;
    const minutes = pl0(modMinutes + (modMinutes >= 0 ? 0 : 60));
    const orgHours =  d.getUTCHours() + Math.floor(orgMinutes / 60);
    const modHours = orgHours % 24;
    const hours = pl0(modHours + (modHours >= 0 ? 0 : 24));
    const orgDate =  d.getUTCDate() + Math.floor(orgHours / 24);
    const modDate = orgDate % currentCycleDays === 0 ? currentCycleDays : orgDate % currentCycleDays;
    const date = pl0(modDate + (modDate > 0 ? 0 : lastCycleDays));
    const orgMonth =  d.getUTCMonth() + Math.floor(orgDate / currentCycleDays === 1 ? 0 : (orgDate / currentCycleDays));
    const modgMonth = orgMonth % 12;
    const month = pl0(modgMonth + 1 + (modgMonth >= 0 ? 0 : 12));
    const year = d.getUTCFullYear() + Math.floor(orgMonth / 12);
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}${timeZone}`;
}

export function Tz (date) {
    date = /^\d+$/.test(date) ? +date : date;
    const datetime = new Date(date).toString();
    this.value = datetime.replace(/^.*GMT([+-]\d{4}).*$/,'$1');
    this.name = datetime.replace(/^.*\((.+)\).*$/,'$1');
    this.date = date;
    this.datetime = datetime;
}

// const culcLocalTz = (date) =>{
//     let timegapHour = String(0 - Math.floor(new Date(date).getTimezoneOffset()/60)) // 获取小时
//         .replace(/^([+-]?)(\d)$/, '$1' + 0 + '$2') // 单数小时补0
//         .replace(/^(\d+)$/, '+' + '$1'); // 整数小时补+号
//     let timegapMinute = String(Math.abs(new Date(date).getTimezoneOffset()%60)) // 获取分钟
//         .replace(/^(\d)$/, 0 + '$1'); // 单数分钟补0
//     return `${timegapHour}:${timegapMinute}`;
// }



