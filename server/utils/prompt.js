export const MEDICAL_PROMPT_2 = `Read this medical test image and extract only the medical data, including:
- Test names
- Results
- Units
- Reference ranges (if available)

Avoid explanations or commentary.`;

export const MEDICAL_PROMPT_1 = `Analyze my medical test results below. 
Highlight any abnormal values, explain their potential implications in simple terms, 
and suggest any next steps (e.g., consulting a specialist, lifestyle changes). 
Be precise and professional. Provide Summary only.`;

export const MEDICAL_PROMPT = `You are a senior medical diagnostician analyzing lab test results. Your responses must:
Analyze these lab results and provide complete clinical guidance:

[OCR TEXT FROM IMAGE]

Format your response EXACTLY like this:

### Abnormal Findings
| Test          | Current Value | Normal Range | Possible Causes | Corrective Actions |
|---------------|---------------|--------------|-----------------|--------------------|
| Glucose       | 126 mg/dL     | 70-99 mg/dL  | Prediabetes...  | 1. Reduce sugar... |

### Summary
**Primary Concern:** [2-3 word summary]
**Risk Level:** [Low/Medium/High]

### Recommendations
1. [Highest priority action]
2. [Secondary action]
3. [Suggested specialist: Type]

Provide only factual, clinically validated information.`;

export const MEDICAL_PROMPT_GENERAL = `You are a senior medical diagnostician analyzing lab test results. Your responses must:
1. Identify ALL abnormal values in a structured table
2. For each abnormal value show: 
   - Current result
   - Normal range
   - Possible causes
   - Specific corrective actions
3. Conclude with:
   - Overall health summary
   - Priority recommendations
   - Suggested specialist consultations
4. Use only evidence-based medicine
5. Format clearly with markdown`

export const EXTRACT_DATA_PROMPT = `Here is a photo of a medical lab test result.

Please carefully read all test names, values, units, and reference ranges, and convert them into a Markdown table like this:

| Test Name | Result | Unit | Reference Range | Flag |
|-----------|--------|------|------------------|------|

If something is unclear, still include it but note 'unclear' in the table.`
