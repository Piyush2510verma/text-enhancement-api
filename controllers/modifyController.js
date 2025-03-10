const { processText } = require('../services/geminiService');

exports.modifyText = async (req, res) => {
  try {
    const { text, length, tone } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required and must be a string.' });
    }

    if (text.length > 10000) {
      return res.status(400).json({ error: 'Text is too long. Max 10,000 characters allowed.' });
    }

    const validLengths = ['shorter', 'longer'];
    const validTones = ['formal', 'casual', 'technical'];

    if (length && !validLengths.includes(length)) {
      return res.status(400).json({ error: 'Invalid length parameter. Must be "shorter" or "longer".' });
    }

    if (tone && !validTones.includes(tone)) {
      return res.status(400).json({ error: 'Invalid tone parameter. Must be "formal", "casual", or "technical".' });
    }

    let modificationPrompt = text;
    if (length || tone) {
      modificationPrompt += '\n\nModification request:';
      if (length) modificationPrompt += `\nLength: ${length}`;
      if (tone) modificationPrompt += `\nTone: ${tone}`;
    }

    const responseText = await processText(modificationPrompt);

    try {
      const cleanResponse = responseText.replace(/```json|```/g, '').trim();
      const modifiedResult = JSON.parse(cleanResponse);
      return res.json(modifiedResult);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return res.status(500).json({ error: 'Invalid modification result', rawResponse: responseText });
    }
  } catch (error) {
    console.error('Modification error:', error);
    return res.status(500).json({ error: 'Text modification failed', message: error.message });
  }
};
