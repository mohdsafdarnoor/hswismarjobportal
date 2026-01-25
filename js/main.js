// Central content store (keeps HTML clean)

window.HSW = window.HSW || {};

window.HSW.toolsByCategory = {
  "working-student": {
    orientation: [
      { name: "Perplexity", desc: "Research companies, roles, and requirements with sourced answers.", url: "https://www.perplexity.ai" },
      { name: "Google Gemini", desc: "Build search strategy and role targeting plan.", url: "https://gemini.google.com" }
    ],
    application: [
      { name: "ChatGPT", desc: "Draft and tailor CV bullets and cover letters from your real experience.", url: "https://chat.openai.com" },
      { name: "LanguageTool", desc: "German/English grammar and spelling checks.", url: "https://languagetool.org" },
      { name: "DeepL Write", desc: "Rewrite text for clearer German/English tone.", url: "https://www.deepl.com/write" }
    ],
    interview: [
      { name: "ChatGPT", desc: "Mock interviews, STAR answers, and question bank.", url: "https://chat.openai.com" },
      { name: "Perplexity", desc: "Company/product research before interviews.", url: "https://www.perplexity.ai" }
    ],
    onboarding: [
      { name: "DeepL", desc: "Translate onboarding docs and emails.", url: "https://www.deepl.com" },
      { name: "Notion", desc: "Track onboarding tasks and notes.", url: "https://www.notion.so" }
    ]
  },

  "internship": {
    orientation: [
      { name: "Perplexity", desc: "Research internship portals and company context.", url: "https://www.perplexity.ai" },
      { name: "Google Gemini", desc: "Plan targeting and search queries.", url: "https://gemini.google.com" }
    ],
    application: [
      { name: "ChatGPT", desc: "Draft applications; personalise and verify every claim.", url: "https://chat.openai.com" },
      { name: "DeepL Write", desc: "Improve German/English tone.", url: "https://www.deepl.com/write" },
      { name: "LanguageTool", desc: "Final language checks.", url: "https://languagetool.org" }
    ],
    interview: [
      { name: "ChatGPT", desc: "Internship motivation + mock interview practice.", url: "https://chat.openai.com" },
      { name: "Google Gemini", desc: "Role-specific Q&A practice.", url: "https://gemini.google.com" }
    ],
    onboarding: [
      { name: "DeepL", desc: "Translate internal communications.", url: "https://www.deepl.com" },
      { name: "Notion", desc: "Onboarding checklist and learning notes.", url: "https://www.notion.so" }
    ]
  },

  "master-thesis": {
    orientation: [
      { name: "Perplexity", desc: "Explore thesis topics and company problems to solve.", url: "https://www.perplexity.ai" },
      { name: "Google Scholar", desc: "Find papers and citations.", url: "https://scholar.google.com" }
    ],
    application: [
      { name: "ChatGPT", desc: "Draft outreach emails and proposal outlines (customise).", url: "https://chat.openai.com" },
      { name: "DeepL Write", desc: "Refine tone for German/English outreach.", url: "https://www.deepl.com/write" }
    ],
    interview: [
      { name: "ChatGPT", desc: "Prepare for thesis discussions and technical questions.", url: "https://chat.openai.com" },
      { name: "Perplexity", desc: "Company/domain research for meetings.", url: "https://www.perplexity.ai" }
    ],
    onboarding: [
      { name: "Zotero", desc: "Reference manager for papers and thesis writing.", url: "https://www.zotero.org" },
      { name: "Notion", desc: "Plan milestones and research logs.", url: "https://www.notion.so" }
    ]
  },

  "full-time-job": {
    orientation: [
      { name: "Perplexity", desc: "Research roles, companies, and requirements with sources.", url: "https://www.perplexity.ai" },
      { name: "Google Gemini", desc: "Plan targeting and skills gap analysis.", url: "https://gemini.google.com" }
    ],
    application: [
      { name: "ChatGPT", desc: "Draft CV/cover letter; keep it factual and specific.", url: "https://chat.openai.com" },
      { name: "LanguageTool", desc: "German/English quality checks.", url: "https://languagetool.org" },
      { name: "Grammarly", desc: "Clarity and tone for English applications.", url: "https://www.grammarly.com" }
    ],
    interview: [
      { name: "ChatGPT", desc: "Mock interviews, negotiation scripts, follow-ups.", url: "https://chat.openai.com" },
      { name: "Perplexity", desc: "Fast company research before interviews.", url: "https://www.perplexity.ai" }
    ],
    onboarding: [
      { name: "DeepL", desc: "Translate emails and documents.", url: "https://www.deepl.com" },
      { name: "Notion", desc: "Organise onboarding tasks and notes.", url: "https://www.notion.so" }
    ]
  }
};

// Prompt templates (short + structured; you can expand later)
window.HSW.prompts = {
  categories: ["cv","cover-letter","interview","onboarding"],
  actions: ["draft","improve","tailor","check"],

  templates: {
    cv: {
      draft: `Write 5–8 ATS-friendly CV bullet points for this experience.\n\nRole type: {{CATEGORY}}\nTarget job title: {{JOB_TITLE}}\nMy experience (facts only):\n{{EXPERIENCE}}\n\nRules:\n- Use action verbs, add measurable outcomes (time, scope, users, accuracy).\n- Keep each bullet 1 line.\n- Do not invent skills or results.`,
      improve: `Improve these CV bullets for clarity and ATS keywords. Keep all facts unchanged.\n\nTarget job title: {{JOB_TITLE}}\nJob description keywords:\n{{JD_KEYWORDS}}\n\nBullets:\n{{TEXT}}`,
      tailor: `Tailor my CV bullets to this job description. Keep facts unchanged.\n\nJob ad:\n{{JOB_AD}}\n\nMy bullets:\n{{TEXT}}`,
      check: `Check these CV bullets for truthfulness risks, vague claims, and missing metrics. Suggest edits without inventing facts.\n\nBullets:\n{{TEXT}}`
    },

    "cover-letter": {
      draft: `Draft a short cover letter (180–220 words) for Germany.\n\nRole type: {{CATEGORY}}\nCompany: {{COMPANY}}\nJob title: {{JOB_TITLE}}\nMy facts:\n{{FACTS}}\n\nRules:\n- Simple, direct language.\n- No exaggerated adjectives.\n- Mention 2–3 relevant proof points.`,
      improve: `Improve this cover letter for clarity and consistency. Keep facts unchanged.\n\nLetter:\n{{TEXT}}`,
      tailor: `Tailor this cover letter to the job ad. Keep facts unchanged.\n\nJob ad:\n{{JOB_AD}}\n\nLetter:\n{{TEXT}}`,
      check: `Check the letter for risky claims, inconsistencies, and unnatural AI tone. Suggest safer wording.\n\nLetter:\n{{TEXT}}`
    },

    interview: {
      draft: `Create an interview prep pack.\n\nRole type: {{CATEGORY}}\nJob title: {{JOB_TITLE}}\nCompany: {{COMPANY}}\nMy background (facts):\n{{FACTS}}\n\nOutput:\n- 10 likely questions\n- 6 STAR story outlines (context→action→result)\n- 6 questions to ask interviewer`,
      improve: `Improve these interview answers for structure (context→action→result) and clarity. Keep facts unchanged.\n\nAnswers:\n{{TEXT}}`,
      tailor: `Tailor my interview prep to the company and job ad.\n\nJob ad:\n{{JOB_AD}}\nCompany notes:\n{{COMPANY_NOTES}}\n\nMy answers:\n{{TEXT}}`,
      check: `Check these interview answers for unverifiable claims and filler. Suggest improvements.\n\nAnswers:\n{{TEXT}}`
    },

    onboarding: {
      draft: `Create a 14-day onboarding plan for this role in Germany.\n\nRole type: {{CATEGORY}}\nJob title: {{JOB_TITLE}}\nTeam context:\n{{CONTEXT}}\n\nOutput:\n- Days 1–3, 4–7, 8–14 goals\n- Questions to ask\n- Documents to request`,
      improve: `Improve this onboarding email/message for clarity and professionalism.\n\nText:\n{{TEXT}}`,
      tailor: `Tailor this onboarding message to the company tone.\n\nCompany tone notes:\n{{COMPANY_TONE}}\nText:\n{{TEXT}}`,
      check: `Check this message for grammar, tone, and clarity. Suggest a final version.\n\nText:\n{{TEXT}}`
    }
  }
};
