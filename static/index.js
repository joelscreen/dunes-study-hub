let study_tips = [
    "After finishing a topic, close your notes and write down everything you remember. Then check what you missed.",
    "When stuck on a problem, explain it out loud as if teaching a class. Confusion becomes obvious quickly.",
    "Study similar subjects back-to-back (like math problems of different types) to improve problem discrimination.",
    "Before reading a chapter, spend 30 seconds giving a glance through the source. Your brain then recognizes the text when learning it again, improving memory.",
    "When reviewing mistakes, write why your answer was wrong — not just the correct answer.",
    "Turn headings into questions before studying. Example: “What is photosynthesis?” Then answer it.",
    "Space review sessions: Day 1, Day 3, Day 7, Day 14. This dramatically improves long-term memory.",
    "Study in focused silence when learning new material; use light noise only during revision.",
    "When solving problems, check units carefully — many mistakes come from unit confusion.",
    "For essays, outline your argument in bullet points before writing full paragraphs.",
    "Use the “2-minute rule”: if a task takes under 2 minutes, do it immediately.",
    "When memorizing, connect new information to something you already know.",
    "Mix topics during revision instead of blocking one topic for hours.",
    "After reading a paragraph, summarize it in one sentence.",
    "If you can't explain it simply, you don't understand it well enough yet.",
    "Time yourself when practicing exam questions to build exam stamina.",
    "Study the topic you avoid first — procrastination usually hides difficulty.",
    "Review old test papers and identify patterns in the types of questions asked.",
    "For formulas, practice applying them, not just memorizing them.",
    "Before exams, focus more on weak areas than topics you already know well.",
    "Study actively with pen and paper — writing improves retention.",
    "Break a 2-hour study block into 4 structured sessions with short breaks.",
    "Revisit material just before you're about to forget it — not after you forget it.",
    "When revising, cover answers and predict them before checking.",
    "End every study session by writing the three most important things you learned."
]
let random_num = Math.floor(Math.random() * study_tips.length)
let p = document.getElementById("study_tip")
let tip_btn = document.getElementById("new_tip_btn")

function generateTip() {
    let random_num = Math.floor(Math.random() * study_tips.length)
    p.textContent = study_tips[random_num]
}

generateTip()

tip_btn.addEventListener("click", generateTip)
