# Paper2Poster Setup for SoL2LBot Research

## Overview
Paper2Poster offers an automated approach to generate academic posters from research papers using a three-stage pipeline: **Parser → Planner → Painter-Commenter**.

## Directory Structure Setup ✅
```
/Users/sirui/Desktop/Paper2Poster-data/
└── SoL2LBot/
    └── SoLBot-Paper-AERA2026-cleaned.docx
```

## Step 1: Convert Paper to PDF
Since Paper2Poster works with PDF files, convert your Word document:

```bash
# Option 1: Use macOS built-in conversion
# Open the .docx file and export as PDF named "paper.pdf"

# Option 2: Use LibreOffice (if installed)
cd /Users/sirui/Desktop/Paper2Poster-data/SoL2LBot/
libreoffice --headless --convert-to pdf SoLBot-Paper-AERA2026-cleaned.docx
mv SoLBot-Paper-AERA2026-cleaned.pdf paper.pdf
```

## Step 2: Set Up Environment Variables
Create a `.env` file in the Paper2Poster directory:

```bash
cd /Users/sirui/Desktop/Paper2Poster
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
```

## Step 3: Fix Dependency Issues
The requirements.txt has some conflicts. Try this minimal setup:

```bash
cd /Users/sirui/Desktop/Paper2Poster

# Create a clean virtual environment
python3 -m venv paper2poster_env
source paper2poster_env/bin/activate

# Upgrade pip first
pip install --upgrade pip

# Install core dependencies
pip install openai python-dotenv pillow pandas numpy matplotlib seaborn

# Try installing the main dependencies one by one
pip install python-pptx
pip install docling
pip install camel-ai

# If specific versions fail, try without version constraints
pip install accelerate aiofiles aiohttp
```

## Step 4: Run Paper2Poster (High Performance)
Once dependencies are resolved:

```bash
cd /Users/sirui/Desktop/Paper2Poster

python -m PosterAgent.new_pipeline \
    --poster_path="/Users/sirui/Desktop/Paper2Poster-data/SoL2LBot/paper.pdf" \
    --model_name_t="4o" \
    --model_name_v="4o" \
    --poster_width_inches=48 \
    --poster_height_inches=36 \
    --max_workers=3
```

## Step 5: Alternative Economic Option
If you want to save on API costs:

```bash
python -m PosterAgent.new_pipeline \
    --poster_path="/Users/sirui/Desktop/Paper2Poster-data/SoL2LBot/paper.pdf" \
    --model_name_t="vllm_qwen" \
    --model_name_v="4o" \
    --poster_width_inches=48 \
    --poster_height_inches=36 \
    --no_blank_detection
```

## Expected Output
The tool will generate:
- `poster.pptx` - Editable PowerPoint poster
- Intermediate files for debugging
- Layout analysis and visual components

## Paper2Poster Evaluation
After generation, you can evaluate the poster quality:

```bash
# Create evaluation questions from your paper
python -m Paper2Poster-eval.create_paper_questions \
    --paper_folder="Paper2Poster-data/SoL2LBot"

# Evaluate with PaperQuiz
python -m Paper2Poster-eval.eval_poster_pipeline \
    --paper_name="SoL2LBot" \
    --poster_method="4o_4o_generated_posters" \
    --metric=qa

# Evaluate with VLM-as-Judge
python -m Paper2Poster-eval.eval_poster_pipeline \
    --paper_name="SoL2LBot" \
    --poster_method="4o_4o_generated_posters" \
    --metric=judge
```

## Troubleshooting Common Issues

### 1. Dependency Conflicts
If you encounter the `alabaster==1.0.0` error:
```bash
pip install alabaster==0.7.16  # Use available version
```

### 2. PDF Parsing Issues
If the PDF parsing fails:
- Ensure your PDF has selectable text (not scanned images)
- Try converting with different tools
- Check that figures are embedded properly

### 3. Memory Issues
For large papers (20K+ tokens):
```bash
# Add memory optimization flags
python -m PosterAgent.new_pipeline \
    --poster_path="..." \
    --model_name_t="4o" \
    --model_name_v="4o" \
    --poster_width_inches=48 \
    --poster_height_inches=36 \
    --max_workers=1  # Reduce parallel processing
```

### 4. API Rate Limits
If you hit OpenAI rate limits:
- Add delays between requests
- Use the economic model option
- Consider using local models

## Comparison with Manual Poster

### Paper2Poster Advantages:
- **Automated Layout:** Handles complex multi-column layouts
- **Figure Extraction:** Automatically includes relevant figures
- **Content Summarization:** Distills key points from long papers
- **Consistent Formatting:** Professional academic poster standards

### Manual Poster Advantages:
- **Design Control:** Full customization of visual elements
- **Research Emphasis:** Highlight specific findings you want to emphasize
- **Qualitative Focus:** Better handling of quotes and interaction patterns
- **Brand Consistency:** Match your institution's poster templates

## Recommended Approach

1. **Use Paper2Poster** for initial automated generation
2. **Use the Visual Design Poster** I created for comparison
3. **Combine best elements** from both approaches
4. **Customize** the automated output with your specific design preferences

The automated tool excels at layout and content organization, while the manual approach gives you complete control over visual design and research emphasis.

## Files Created for Your Project

1. **`SoL2LBot_Visual_Design_Poster.html`** - Rich visual poster with chatbot interface mockups
2. **`SoL2LBot_Qualitative_Poster_48x36.html`** - Qualitative-focused research poster
3. **`SoL2LBot_AERA_Poster_Content.md`** - Complete content guide
4. This setup guide for automated generation

Choose the approach that best fits your conference presentation needs!
















