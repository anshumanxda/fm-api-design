import app from "./server";
import * as dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(
    `Hello from http://localhost:${process.env.PORT}`,
    process.env.PORT
  );
});
