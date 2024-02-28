import express from "express";
import OpenAI from "openai";
import cors from 'cors';


const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/synonym/', (req, res) => {
    res.status(200).json({
        "message": "Howdy"
    })
})

app.post('/api/synonym/', async (req, res) => {
    const wordText = req.body.wordText

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": "You are a linguist ready to answer my questions."
            },
            {
                "role": "user",
                "content": "Give me 3 synonyms of this word, only giving me the synonyms, without numbering or extra explanantion, sepeareted with commas: " + wordText
            }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    const synonymsText = response.choices[0].message.content
    res.status(200).json({
        "synonymsText": synonymsText
    })
})

app.listen(3000, () => {
    console.log('Listening to port 3000')
})
