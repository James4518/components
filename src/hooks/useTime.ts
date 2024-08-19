export enum MinTongTy {
  month = "month",
  day = "day"
}
export class Difference {
  one: Date;
  two: Date;
  constructor(one: number | string | Date, two?: number | string | Date) {
    this.one = new Date(one);
    this.two = two ? new Date(two) : new Date();
  }
  getMaxMinDate = (one: Date, two: Date, type: MinTongTy) => {
    const minTime = one.getTime() - two.getTime() > 0 ? two : one;
    const maxTime = one.getTime() - two.getTime() > 0 ? one : two;
    //获取最大日期当月的天数
    const maxDateDay = new Date(
      maxTime.getFullYear(),
      maxTime.getMonth() + 1,
      0
    ).getDate();
    const minDate =
      minTime.getDate() > maxDateDay ? maxDateDay : minTime.getDate();
    let maxMinTong;
    if (type == "month") {
      maxMinTong =
        maxTime.getFullYear() +
        "/" +
        (minTime.getMonth() + 1) +
        "/" +
        minDate +
        " " +
        minTime.toLocaleTimeString("chinese", { hour12: false });
    } else {
      maxMinTong =
        maxTime.getFullYear() +
        "/" +
        (maxTime.getMonth() + 1) +
        "/" +
        minDate +
        " " +
        minTime.toLocaleTimeString("chinese", { hour12: false });
    }
    maxMinTong = new Date(maxMinTong);
    return {
      minTime,
      maxTime,
      maxMinTong
    };
  };
  getYear = (one: Date, two: Date) => {
    const oneYear = one.getFullYear();
    const twoYear = two.getFullYear();
    // 计算出与最小日期的日时分相同的最大日期的值
    // 如2016-8-17和2019-6-30,计算出来的maxMinTong为2019-8-17
    const { maxTime, maxMinTong } = this.getMaxMinDate(
      one,
      two,
      MinTongTy.month
    );
    // 计算相差多少年
    let chaYear = Math.abs(oneYear - twoYear);
    // 如果计算出的maxMinTong(如2019-8-17)大于了最大日期,则表示最后一年没有满,需要减一
    if (maxMinTong.getTime() > maxTime.getTime()) {
      chaYear--;
    }
    return chaYear;
  };
  getMonth = (one: Date, two: Date, value?: number) => {
    const oneMonth = one.getFullYear() * 12 + (one.getMonth() + 1);
    const twoMonth = two.getFullYear() * 12 + (two.getMonth() + 1);
    // 计算出与最小日期的日时分相同的最大日期的值
    // 如2016-8-17和2019-6-30,计算出来的maxMinTong为2019-6-17
    const { maxTime, maxMinTong } = this.getMaxMinDate(one, two, MinTongTy.day);
    // 计算最小日期到maxMinTong(如2019-6-17)的月份,这样刚好对应月日
    let chaMonth = Math.abs(oneMonth - twoMonth);
    // 如果计算出来的maxMinTong(如2019-6-17)大于最大日期,则表示最后一月没有满,需要减一
    if (maxMinTong.getTime() > maxTime.getTime()) {
      chaMonth--;
    }
    if (value) {
      return chaMonth - value;
    } else {
      return chaMonth;
    }
  };
  getDay = (one: Date, two: Date, value?: number) => {
    const chaTime = Math.abs(new Date(one).getTime() - new Date(two).getTime());
    if (value) {
      return parseInt((chaTime / 86400000).toString()) - value;
    } else {
      return parseInt((chaTime / 86400000).toString());
    }
  };
  getHour = (one: Date, two: Date, value?: number) => {
    const chaTime = Math.abs(new Date(one).getTime() - new Date(two).getTime());
    if (value) {
      return parseInt((chaTime / 3600000).toString()) - value;
    } else {
      return parseInt((chaTime / 3600000).toString());
    }
  };
  getMinute = (one: Date, two: Date, value?: number) => {
    const chaTime = Math.abs(new Date(one).getTime() - new Date(two).getTime());
    if (value) {
      return parseInt((chaTime / 60000).toString()) - value;
    } else {
      return parseInt((chaTime / 60000).toString());
    }
  };
  getSecond = (one: Date, two: Date, value?: number) => {
    const chaTime = Math.abs(new Date(one).getTime() - new Date(two).getTime());
    if (value) {
      return parseInt((chaTime / 1000).toString()) - value;
    } else {
      return parseInt((chaTime / 1000).toString());
    }
  };
  // 相差年月日时分秒
  getDif = () => {
    // 计算出与最小日期的日时分相同的最大日期的值
    const { minTime, maxTime, maxMinTong } = this.getMaxMinDate(
      this.one,
      this.two,
      MinTongTy.day
    );
    let Day1 = this.getDay(minTime, maxMinTong);
    // 如果大于了,就需要减掉多余天数
    if (maxMinTong.getTime() > maxTime.getTime()) {
      const preMonth = maxMinTong.getMonth() - 1;
      const lastTime = maxMinTong.setMonth(preMonth);
      Day1 = Day1 - this.getDay(new Date(lastTime), maxMinTong);
    }
    const years = this.getYear(this.one, this.two);
    const months = this.getMonth(this.one, this.two, years * 12);
    // let DayMedian = this.getDay(this.one, this.two, Day1);
    // let weeks = parseInt(DayMedian / 7);
    // let days = DayMedian - weeks * 7;
    let days;
    if (this.one.getTime() > this.two.getTime()) {
      days = this.getDay(this.one, this.two, Day1);
    }
    if (this.one.getTime() < this.two.getTime()) {
      days = this.getDay(this.one, this.two);
    }
    const hours = this.getHour(
      this.one,
      this.two,
      this.getDay(this.one, this.two) * 24
    );
    const minutes = this.getMinute(
      this.one,
      this.two,
      this.getDay(this.one, this.two) * 24 * 60 + hours * 60
    );
    const seconds = this.getSecond(
      this.one,
      this.two,
      this.getDay(this.one, this.two) * 24 * 60 * 60 +
        hours * 60 * 60 +
        minutes * 60
    );
    console.log(years, months, days, hours, minutes, seconds);
    return { years, months, days, hours, minutes, seconds };
  };
}

// export function Difference(one, two) {
//   one = convertToNormalTime(one);
//   two = two ? convertToNormalTime(two) : new Date();
//   const getMaxMinDate = (one, two, type) => {
//     const minTime =
//       new Date(one).getTime() - new Date(two).getTime() > 0 ? two : one;
//     const maxTime =
//       new Date(one).getTime() - new Date(two).getTime() > 0 ? one : two;
//     const maxDateDay = new Date(
//       new Date(maxTime).getFullYear(),
//       new Date(maxTime).getMonth() + 1,
//       0
//     ).getDate();
//     const maxMinDate =
//       new Date(minTime).getDate() > maxDateDay
//         ? maxDateDay
//         : new Date(minTime).getDate();
//     let maxMinTong = null;
//     if (type == "month") {
//       maxMinTong =
//         new Date(maxTime).getFullYear() +
//         (new Date(minTime).getMonth() + 1) +
//         maxMinDate +
//         new Date(minTime).toLocaleTimeString("chinese", { hour12: false });
//     } else {
//       maxMinTong =
//         new Date(maxTime).getFullYear() +
//         (new Date(maxTime).getMonth() + 1) +
//         maxMinDate +
//         new Date(minTime).toLocaleTimeString("chinese", { hour12: false });
//     }
//     return {
//       minTime,
//       maxTime,
//       maxMinTong
//     };
//   };
//   const getYear = (one, two) => {
//     const oneYear = new Date(one).getFullYear();
//     const twoYear = new Date(two).getFullYear();
//     // 计算出与最小日期的日时分相同的最大日期的值
//     // 如2016-8-17和2019-6-30,计算出来的maxMinTong为2019-8-17
//     const { minTime, maxTime, maxMinTong } = getMaxMinDate(one, two, "month");
//     // 计算相差多少年
//     let chaYear = Math.abs(oneYear - twoYear);
//     // 如果计算出的maxMinTong(如2019-8-17)大于了最大日期,则表示最后一年没有满,需要减一
//     if (new Date(maxMinTong).getTime() > new Date(maxTime).getTime()) {
//       chaYear--;
//     }
//     return chaYear;
//   };
//   const getMonth = (one, two, value) => {
//     const oneMonth =
//       new Date(one).getFullYear() * 12 + (new Date(one).getMonth() + 1);
//     const twoMonth =
//       new Date(two).getFullYear() * 12 + (new Date(two).getMonth() + 1);
//     // 计算出与最小日期的日时分相同的最大日期的值
//     // 如2016-8-17和2019-6-30,计算出来的maxMinTong为2019-6-17
//     const { minTime, maxTime, maxMinTong } = getMaxMinDate(one, two, "day");
//     // 计算最小日期到maxMinTong(如2019-6-17)的月份,这样刚好对应月日
//     let chaMonth = Math.abs(oneMonth - twoMonth);
//     // 如果计算出来的maxMinTong(如2019-6-17)大于最大日期,则表示最后一月没有满,需要减一
//     if (new Date(maxMinTong).getTime() > new Date(maxTime).getTime()) {
//       chaMonth--;
//     }
//     if (value) {
//       return chaMonth - value;
//     } else {
//       return chaMonth;
//     }
//   };
//   const getDay = (one, two, value) => {
//     const chaTime = Math.abs(new Date(one).getTime() - new Date(two).getTime());
//     if (value) {
//       return parseInt(chaTime / 86400000) - value;
//     } else {
//       return parseInt(chaTime / 86400000);
//     }
//   };
//   const getHour = (one, two, value) => {
//     const chaTime = Math.abs(new Date(one).getTime() - new Date(two).getTime());
//     if (value) {
//       return parseInt(chaTime / 3600000) - value;
//     } else {
//       return parseInt(chaTime / 3600000);
//     }
//   };
//   const getMinute = (one, two, value) => {
//     const chaTime = Math.abs(new Date(one).getTime() - new Date(two).getTime());
//     if (value) {
//       return parseInt(chaTime / 60000) - value;
//     } else {
//       return parseInt(chaTime / 60000);
//     }
//   };
//   const getSecond = (one, two, value) => {
//     const chaTime = Math.abs(new Date(one).getTime() - new Date(two).getTime());
//     if (value) {
//       return parseInt(chaTime / 1000) - value;
//     } else {
//       return parseInt(chaTime / 1000);
//     }
//   };
//   const getDif = (time, two) => {
//     // 计算出与最小日期的日时分相同的最大日期的值
//     const { minTime, maxTime, maxMinTong } = getMaxMinDate(one, two, "day");
//     let Day1 = getDay(minTime, maxMinTong);
//     // 如果大于了,就需要减掉多余天数
//     if (new Date(maxMinTong).getTime() > new Date(maxTime).getTime()) {
//       let prevMonth = new Date(maxMinTong).getMonth() - 1;
//       let lastTime = new Date(maxMinTong).setMonth(prevMonth);
//       Day1 =
//         Day1 -
//         getDay(
//           new Date(lastTime).getFullYear() +
//             (new Date(lastTime).getMonth() + 1) +
//             new Date(lastTime).getDate(),
//           maxMinTong
//         );
//     }
//     let years = getYear(one, two);
//     let months = getMonth(one, two, years * 12);
//     let DayMedian = getDay(one, two, Day1);
//     let weeks = parseInt(DayMedian / 7);
//     let days = DayMedian - weeks * 7;
//     let hours = getHour(one, two, getDay(one, two) * 24);
//     let minutes = getMinute(one, two, getDay(one, two) * 24 * 60 + hours * 60);
//     let seconds = getSecond(
//       one,
//       two,
//       getDay(one, two) * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60
//     );
//     return { years, months, days, hours, minutes, seconds };
//   };
//   return getDif(one, two);
// }

// const moment = require("moment");
// export function currentTime(targetTime: any) {
//   const targetMoment = moment(targetTime);
//   const currentMoment = moment();
//   const duration = moment.duration(targetMoment.diff(currentMoment));
//   const years = Math.abs(duration.years());
//   const months = Math.abs(duration.months());
//   const days = Math.abs(duration.days());
//   const hours = Math.abs(duration.hours());
//   const minutes = Math.abs(duration.minutes());
//   const seconds = Math.abs(duration.seconds());
//   let mes = "";
//   if (currentMoment < targetMoment) {
//     mes = `还剩：${years}-${months}-${days}-${hours}-${minutes}-${seconds}`;
//   }
//   if (currentMoment > targetMoment) {
//     mes = `进行中:${years}-${months}-${days}-${hours}-${minutes}-${seconds}`;
//   }
//   return {
//     years,
//     months,
//     days,
//     hours,
//     minutes,
//     seconds,
//     currentMoment,
//     targetMoment,
//     mes
//   };
// }
