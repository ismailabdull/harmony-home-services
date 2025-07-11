const express = require('express');
const multer = require('multer');
const archiver = require('archiver');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Ensure directories exist
const dirs = ['uploads', 'temp', 'downloads'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Extract single website
app.post('/api/extract', async (req, res) => {
  try {
    const { url, options = {} } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL
    try {
      new URL(url);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const domain = new URL(url).hostname.replace(/[^a-zA-Z0-9]/g, '_');
    const outputFile = `temp/${domain}_${timestamp}.html`;
    
    // Build obelisk command
    let command = `obelisk "${url}" -o "${outputFile}"`;
    
    // Add options
    if (options.gzip) command += ' -z';
    if (options.noCss) command += ' --no-css';
    if (options.noJs) command += ' --no-js';
    if (options.noMedias) command += ' --no-medias';
    if (options.noEmbeds) command += ' --no-embeds';
    if (options.timeout) command += ` -t ${options.timeout}`;
    if (options.userAgent) command += ` -u "${options.userAgent}"`;
    if (options.insecure) command += ' --insecure';
    if (options.quiet) command += ' -q';
    if (options.verbose) command += ' --verbose';
    if (options.skipResourceUrlError) command += ' --skip-resource-url-error';
    if (options.maxConcurrentDownload) command += ` --max-concurrent-download ${options.maxConcurrentDownload}`;

    console.log(`Executing: ${command}`);
    
    // Execute obelisk command
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr && !stderr.includes('obelisk')) {
      console.error('Obelisk stderr:', stderr);
    }

    // Check if file was created
    if (!fs.existsSync(outputFile)) {
      return res.status(500).json({ error: 'Failed to extract website' });
    }

    // Create zip file
    const zipFile = `downloads/${domain}_${timestamp}.zip`;
    const output = fs.createWriteStream(zipFile);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      // Clean up temp file
      fs.unlinkSync(outputFile);
      
      // Send zip file
      res.download(zipFile, `${domain}_extracted.zip`, (err) => {
        if (err) {
          console.error('Download error:', err);
        }
        // Clean up zip file after download
        setTimeout(() => {
          if (fs.existsSync(zipFile)) {
            fs.unlinkSync(zipFile);
          }
        }, 5000);
      });
    });

    archive.on('error', (err) => {
      console.error('Archive error:', err);
      res.status(500).json({ error: 'Failed to create zip file' });
    });

    archive.pipe(output);
    archive.file(outputFile, { name: 'index.html' });
    archive.finalize();

  } catch (error) {
    console.error('Extraction error:', error);
    res.status(500).json({ error: 'Failed to extract website', details: error.message });
  }
});

// Extract multiple websites from file
app.post('/api/extract-batch', upload.single('urlFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'URL file is required' });
    }

    const filePath = req.file.path;
    const urls = fs.readFileSync(filePath, 'utf8')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'));

    if (urls.length === 0) {
      return res.status(400).json({ error: 'No valid URLs found in file' });
    }

    // Generate unique filename for batch
    const timestamp = Date.now();
    const batchFile = `temp/batch_${timestamp}.txt`;
    fs.writeFileSync(batchFile, urls.join('\n'));

    // Create output directory
    const outputDir = `temp/batch_${timestamp}`;
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Build obelisk command for batch processing
    let command = `obelisk -i "${batchFile}" -o "${outputDir}"`;
    
    // Add options from request body
    const { options = {} } = req.body;
    if (options.gzip) command += ' -z';
    if (options.noCss) command += ' --no-css';
    if (options.noJs) command += ' --no-js';
    if (options.noMedias) command += ' --no-medias';
    if (options.noEmbeds) command += ' --no-embeds';
    if (options.timeout) command += ` -t ${options.timeout}`;
    if (options.userAgent) command += ` -u "${options.userAgent}"`;
    if (options.insecure) command += ' --insecure';
    if (options.quiet) command += ' -q';
    if (options.verbose) command += ' --verbose';
    if (options.skipResourceUrlError) command += ' --skip-resource-url-error';
    if (options.maxConcurrentDownload) command += ` --max-concurrent-download ${options.maxConcurrentDownload}`;

    console.log(`Executing batch: ${command}`);
    
    // Execute obelisk command
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr && !stderr.includes('obelisk')) {
      console.error('Obelisk stderr:', stderr);
    }

    // Create zip file with all extracted websites
    const zipFile = `downloads/batch_${timestamp}.zip`;
    const output = fs.createWriteStream(zipFile);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      // Clean up temp files
      fs.unlinkSync(filePath);
      fs.unlinkSync(batchFile);
      fs.rmSync(outputDir, { recursive: true, force: true });
      
      // Send zip file
      res.download(zipFile, `batch_extracted_${timestamp}.zip`, (err) => {
        if (err) {
          console.error('Download error:', err);
        }
        // Clean up zip file after download
        setTimeout(() => {
          if (fs.existsSync(zipFile)) {
            fs.unlinkSync(zipFile);
          }
        }, 5000);
      });
    });

    archive.on('error', (err) => {
      console.error('Archive error:', err);
      res.status(500).json({ error: 'Failed to create zip file' });
    });

    archive.pipe(output);
    
    // Add all files from output directory to zip
    const files = fs.readdirSync(outputDir);
    files.forEach(file => {
      const filePath = path.join(outputDir, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        archive.file(filePath, { name: file });
      }
    });
    
    archive.finalize();

  } catch (error) {
    console.error('Batch extraction error:', error);
    res.status(500).json({ error: 'Failed to extract websites', details: error.message });
  }
});

// Check if obelisk is installed
app.get('/api/check-obelisk', async (req, res) => {
  try {
    const { stdout } = await execAsync('obelisk -h');
    res.json({ installed: true, version: stdout.split('\n')[0] });
  } catch (error) {
    res.json({ installed: false, error: 'Obelisk not found. Please install it first.' });
  }
});

app.listen(PORT, () => {
  console.log(`Harmony Website Extractor running on http://localhost:${PORT}`);
  console.log('Make sure Obelisk is installed: go install github.com/go-shiori/obelisk/cmd/obelisk@latest');
}); 