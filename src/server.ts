import "dotenv/config";
import server from "./app";

const HOST = process.env.HOST;
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}/`);
});