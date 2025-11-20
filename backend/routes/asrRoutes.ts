import { Router } from 'express';
import multer from 'multer';
import { openaiASR } from '../services/asrService';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post('/openai', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }
    const result = await openaiASR(req.file.path);
    res.json(result);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;