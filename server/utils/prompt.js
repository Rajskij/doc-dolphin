export const MEDICAL_PROMPT = `Read this medical test image and extract only the medical data, including:
- Test names
- Results
- Units
- Reference ranges (if available)

Avoid explanations or commentary.`;

export const MEDICAL_PROMPT_1 = `Analyze my medical test results below. 
Highlight any abnormal values, explain their potential implications in simple terms, 
and suggest any next steps (e.g., consulting a specialist, lifestyle changes). 
Be precise and professional. Provide Summary only.`;

export const MEDICAL_PROMPT_2 = `Read this image and extract data only`;
