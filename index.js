// index.js
const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY } = require("./config");

const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5001;
const corsOptions = {
  origin: "*",
  methods: ["POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

app.post("/ask", async (req, res) => {
  const prompt = req.body.subject;
  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `I want you to generate a comprehensive and well-structured lesson plan for ${prompt}. Please include clear learning objectives, relevant examples, detailed explanations, and a variety of activities and assessments to ensure effective learning. Format the lesson plan using Markdown.`,
        },
        { role: "user", content: prompt },
      ],
    });
    const completion = response.data.choices[0].message;
    console.log(completion);
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));
