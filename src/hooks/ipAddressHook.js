import { useState, useEffect } from "react";
import axios from "axios";

export default function useIpAddress() {
  const [ip, setIp] = useState(null);

  useEffect(() => {
    axios
      .get("https://api64.ipify.org?format=json")
      .then((response) => setIp(response.data.ip))
      .catch((error) => console.error("Error fetching IP:", error));
  }, []);

  return ip;
}
