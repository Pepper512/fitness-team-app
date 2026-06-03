// Fitness-Team plan data (renders offline)
window.PLAN = {
  hrMax: 158,
  zones: [
    ["Z1 · Very light","50–60%","79–95","Warm-up, cooldown, stroll"],
    ["Z2 · Aerobic base ★","60–70%","95–111","Easy — talk in full sentences"],
    ["Z3 · Moderate","70–80%","111–126","Comfortably hard"],
    ["Z4 · Hard","80–90%","126–142","Hard, short phrases only"],
    ["Z5 · Max","90–100%","142–158","All-out"]
  ],
  week: [
    ["Today ▶","iFIT Walk/Run","Easy on-ramp — any walk/jog, Zone 2","car"],
    ["Day 2","Strength A","Squat & Press","str"],
    ["Day 3","iFIT Walk/Run","Any program — keep it easy","car"],
    ["Day 4","Strength B","Hinge & Pull","str"],
    ["Day 5","iFIT Walk","Longer easy walk / recovery","car"],
    ["Day 6","Strength C","Full-Body Volume","str"],
    ["Day 7","Rest","Light mobility 5–10 min","rest"]
  ],
  cardioMenu: [
    "Foundations of Jogging: Puerto Rico (Knox)",
    "Foundations of Cardio: Mexico City (Knox)",
    "Costa Rica Walking (John Peel)",
    "Australia Weight-Loss Walking",
    "Mediterranean Hiking — incline"
  ],
  days: [
    { id:"A", title:"Squat & Press", ex:[
      ["goblet_squat","Goblet Squat","3 × 10–12","Hold one DB at chest; sit between hips, heels down."],
      ["db_floor_press","DB Floor Press (or Push-up)","3 × 10–12","Press from the floor; shoulder-friendly bench sub."],
      ["db_rdl","DB Romanian Deadlift","3 × 10–12","DBs along the thighs, hinge at hips, flat back."],
      ["db_ohp","Standing Overhead Press","3 × 10–12","Brace core, press overhead; don't arch the low back."],
      ["db_curl","DB Biceps Curl","2 × 12–15","Controlled up and down; no swinging."],
      ["plank","Plank","3 × 30–45 s","Straight line head-to-heels; squeeze glutes."]
    ]},
    { id:"B", title:"Hinge & Pull", ex:[
      ["hip_thrust","Glute Bridge (or DB Hip Thrust)","3 × 10–12","Drive through heels, squeeze glutes at the top."],
      ["db_row","DB Bent-Over Row","3 × 10–12","Flat back, pull to ribs, squeeze shoulder blades."],
      ["bulgarian","DB Split Squat","3 × 8–10 / leg","Rear foot elevated; drop straight down, front heel down."],
      ["one_arm_row","Single-Arm DB Row","3 × 10 / arm","Brace on a bench; row to the hip, no twisting."],
      ["db_tricep","DB Triceps Extension","2 × 12–15","Elbows tucked; extend fully, control the return."],
      ["dead_bug","Dead Bug","3 × 8 / side","Low back glued to floor; opposite arm + leg."]
    ]},
    { id:"C", title:"Full-Body Volume", ex:[
      ["reverse_lunge","DB Reverse Lunge","3 × 10 / leg","Step back, knee toward floor, push through front heel."],
      ["incline_press","Incline DB Press (or Floor Press)","3 × 12","Slight incline; press up and slightly together."],
      ["lateral_raise","DB Lateral Raise","2 × 15","Raise to shoulder height; lead with the elbows."],
      ["calf_raise","Standing Calf Raise","2 × 15","Full stretch at bottom, big squeeze at top."],
      ["glute_bridge","Glute Bridge","3 × 15","Drive hips up, squeeze glutes, ribs down."],
      ["side_plank","Side Plank","2 × 20–30 s / side","Stack the body; hips high, straight line."]
    ]}
  ]
};