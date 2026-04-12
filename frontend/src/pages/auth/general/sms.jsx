import { useState } from "react";

export default function sms() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!phone.startsWith("+")) {
      return setStatus("Phone must be in E.164 format (+123456789)");
    }

    try {
      const response = await fetch("http://localhost:5000/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone, message })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ SMS Sent Successfully");
        setPhone("");
        setMessage("");
      } else {
        setStatus(data.error || "Failed to send SMS");
      }

    } catch (error) {
      setStatus("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Send SMS</h2>
      <form onSubmit={handleSend} style={styles.form}>
        <input
          type="text"
          placeholder="+1234567890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send SMS</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
    margin: "auto"
  }
};