import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function PeriodCalendar() {
  const [periodStart, setPeriodStart] = useState("2025-10-02"); // วันที่เริ่มล่าสุด
  const [cycleLength, setCycleLength] = useState(28); // รอบเดือนเฉลี่ย
  const [periodLength, setPeriodLength] = useState(5); // ระยะมีประจำเดือน
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    generateCycle();
  }, [periodStart]);

  const generateCycle = () => {
    const periodStartDate = dayjs(periodStart);
    let marks = {};

    // 🩸 ช่วงมีประจำเดือน
    for (let i = 0; i < periodLength; i++) {
      const date = periodStartDate.add(i, "day").format("YYYY-MM-DD");
      marks[date] = { marked: true, selected: true, selectedColor: "#fe0c21" };
    }

    // 🌼 วันตกไข่ (ประมาณวันที่ 14 ของรอบ)
    const ovulation = periodStartDate.add(14, "day").format("YYYY-MM-DD");
    marks[ovulation] = { marked: true, dotColor: "gold" };

    // 💕 วันที่มีโอกาสสูง (ก่อนตกไข่ 3 วัน)
    for (let i = 11; i <= 15; i++) {
      const date = periodStartDate.add(i, "day").format("YYYY-MM-DD");
      marks[date] = { marked: true, dotColor: "green" };
    }

    setMarkedDates(marks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌸 ปฏิทินรอบประจำเดือน 🌸</Text>

      <Calendar
        markingType={"multi-dot"}
        markedDates={markedDates}
        onDayPress={(day) => console.log("เลือกวันที่:", day.dateString)}
        theme={{
          todayTextColor: "#2196f3",
          arrowColor: "#2196f3",
          textDayFontSize: 14,
          textMonthFontSize: 18,
        }}
      />

      <View style={styles.legend}>
        <Text>🩸 สีชมพู = มีประจำเดือน</Text>
        <Text>🌼 สีทอง = วันตกไข่</Text>
        <Text>💚 สีเขียว = วันที่มีโอกาสสูง</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  header: { fontSize: 20, textAlign: "center", marginBottom: 10 },
  legend: { marginTop: 10, padding: 10, backgroundColor: "#f8f8f8", borderRadius: 10 },
});

