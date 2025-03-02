import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

// 📌 Styles for the Invoice
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  header: { textAlign: "center", fontSize: 20, marginBottom: 20 },
  section: { marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  bold: { fontWeight: "bold" },
  footer: { textAlign: "center", marginTop: 20, fontSize: 10, color: "gray" },
});

// 📌 Invoice Component
const InvoicePDF = ({ booking }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>🎉 EventHive Booking Invoice</Text>

      <View style={styles.section}>
        <Text style={styles.bold}>Booking Details:</Text>
        <Text style={styles.row}>Booking ID: {booking.bookingId}</Text>
        <Text style={styles.row}>Venue: {booking.venueName}</Text>
        <Text style={styles.row}>Date: {booking.date}</Text>
        <Text style={styles.row}>Guests: {booking.guests}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>Customer Details:</Text>
        <Text style={styles.row}>Name: {booking.name}</Text>
        <Text style={styles.row}>Email: {booking.email}</Text>
        <Text style={styles.row}>Phone: {booking.phone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>Payment Details:</Text>
        <Text style={styles.row}>Amount Paid: ₹{booking.price.toLocaleString()}</Text>
        <Text style={styles.row}>Payment Method: Stripe</Text>
      </View>

      <Text style={styles.footer}>Thank you for booking with EventHive! 🎊</Text>
    </Page>
  </Document>
);

export default InvoicePDF;
