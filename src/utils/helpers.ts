export function ConvertToArabicNumbers(num: string) {
  const arabicNumbers =
    "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
  return num.replace(/[0123456789]/g, (d) => {
    return arabicNumbers[Number(d)];
  });
}

export function twoDigitIt(num: string | number) {
  const value = Number(num);
  return value < 10 ? `0${num}` : value;
}

export function convertDateToPersian(date?: Date) {
  if (!date) return "";

  const currentDate = new Date(date);

  const month = currentDate.toLocaleDateString("fa-IR", {
    month: "long",
  });

  const jalaliDate = currentDate.toLocaleDateString("fa-IR");

  const [year, _, day] = jalaliDate.split("/");

  return `امروز ${day} ${month} ${year}`;
}
