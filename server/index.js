import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import request from "request";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5000;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI || "http://localhost:5000/auth/callback";

const app = express();

app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET || "your_secret_here",
  resave: false,
  saveUninitialized: true
}));

const generateRandomString = (length) => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get("/auth/login", (req, res) => {
  const scope = ["streaming", "user-read-email", "user-read-private"];
  const state = generateRandomString(16);

  const authQueryParameters = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: scope.join(" "),
    redirect_uri: redirect_uri,
    state: state,
  });

  res.redirect(
    `https://accounts.spotify.com/authorize/?${authQueryParameters.toString()}`
  );
});

app.get("/auth/callback", (req, res) => {
  const code = req.query.code;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ error: "Failed to retrieve access token" });
    }

    const access_token = body.access_token;
    req.session.token = access_token; // Store token in session
    res.redirect("/");
  });
});

app.get("/auth/token", (req, res) => {
  res.json({ access_token: req.session.token || "" }); // Retrieve token from session
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
