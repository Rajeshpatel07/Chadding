import express from "express";
import router from "./routes/routes.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router)


app.listen(5000, () => console.log(`Server started at 5000`));
