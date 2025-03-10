const { processText } = require('../services/geminiService');

exports.enhanceText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required and must be a string.' });
    }

    if (text.length > 10000) {
      return res.status(400).json({ error: 'Text is too long. Max 10,000 characters allowed.' });
    }

    const responseText = await processText(text);

    try {
      const cleanResponse = responseText.replace(/```json|```/g, '').trim();
      const enhancedResult = JSON.parse(cleanResponse);
      return res.json(enhancedResult);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return res.status(500).json({ error: 'Invalid enhancement result', rawResponse: responseText });
    }
  } catch (error) {
    console.error('Enhancement error:', error);
    return res.status(500).json({ error: 'Text enhancement failed', message: error.message });
  }
};
