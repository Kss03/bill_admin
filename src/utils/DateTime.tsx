
export class DateTime {
  getNowStr = () => {
    const date = new Date()
    let dd: number | string = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm: number | string = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy: number | string = date.getFullYear();
    if (yy < 10) yy = '0' + yy;

    let hh: number | string = date.getHours();
    if (yy < 10) hh = '0' + hh;

    let m: number | string = date.getMinutes();
    if (yy < 10) m = '0' + m;

    return yy + '-' + mm + '-' + dd + ' ' + hh + ":" + m;
  }
  getDuration = (start: number, end: number) => {
    const range = end - start
    let hh: number | string = Math.round(range / (3600 * 1000))
    let mm: number | string = Math.round(range / (60 * 1000)) % 60
    if (mm < 10) mm = '0' + mm
    return `${hh}h ${mm}m`
  }
  parseDate = (dateTime: string) => {
    return Date.parse(dateTime)
  }
}
