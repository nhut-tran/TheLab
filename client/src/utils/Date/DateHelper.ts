//@ts-ignore
import CalendarDates from 'calendar-dates';
interface DateObj {
    date: number,
    iso: string,
    type: 'previous' | 'current';
}

export async function getDate(): Promise<DateObj[]> {
    const today = new Date()
    const calendarDate = new CalendarDates();
    const fullDates = await calendarDate.getDates(today) as DateObj[];
    return fullDates.filter((d) => d.type === 'current');
}