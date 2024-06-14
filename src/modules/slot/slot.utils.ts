export const getTimeInMinutes = async (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const addMinutes = async (time: string, minutes: number) => {
  const [hours, currentMinutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + currentMinutes + minutes;
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;

  return `${newHours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}`;
};
