import dayjs from 'dayjs';

/**  quick parse: "5 days" → start + 4
  *  ISO (yyyy-mm-dd) → that exact date
  *  "" → start
  */
export function resolveEnd(start, endField) {
  if (!endField) return start;
  const m = endField.match(/(\d+)\s*day/);
  if (m) return dayjs(start).add(+m[1]-1, 'day').toDate();
  return dayjs(endField).isValid() ? new Date(endField) : start;
}

/**  parse time string into Date (defaults to hh:mm)
  *  If value like "3x a day" we map to 08-14-20 */
export function expandTimes(t) {
  if (t.match(/3x/i)) return ['08:00','14:00','20:00'];
  if (t.match(/2x/i)) return ['09:00','21:00'];
  if (t.match(/1x/i)) return ['09:00'];
  return [t]; // assume already “HH:mm”
}

export function buildReminderDocs({ med, start, end, userId, prescriptionId }) {
  const docs = [];
  for (let d = dayjs(start); !d.isAfter(end); d = d.add(1,'day')) {
    for (const t of med.times.flatMap(expandTimes)) {
      const [h,m] = t.split(':');
      const due  = d.hour(+h).minute(+m || 0).second(0).millisecond(0).toDate();
      docs.push({
        userId,
        prescription: prescriptionId,
        medName: med.name,
        due
      });
    }
  }
  return docs;
}
