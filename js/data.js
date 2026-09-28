/* ==========================================================================
   SITE CONTENT
   Everything you see on the page comes from this file. Edit text here,
   add photos by dropping them into /images and adding the file name below.
   Photos: put the full-size file in images/ (and, optionally, a smaller copy
   with the same name in images/thumbs/ for faster loading).
   ========================================================================== */

const SITE = {
  profile: {
    name: "Deboneel Kundu Partho",
    shortName: "D. K. Partho",
    location: "Mymensingh, Bangladesh",
    headline: "Agricultural Engineer at Bangladesh Agricultural University",
    focusTags: ["Crop Modelling", "Hydrological Modelling", "CMIP6 Climate Projections", "Research and Postgraduate Aspirant"],
    summary: "Four Q1 journal papers on climate-resilient irrigation, hydrology and water quality. MS student in Irrigation & Water Management at Bangladesh Agricultural University, looking for a funded MS or PhD position abroad.",
    status: "Open to funded MS / PhD positions",
    email: "deboneel1998@gmail.com",
    academicEmail: "partho.2105056@bau.edu.bd",
    phone: "+8801782449070",
    phoneDisplay: "+880 1782 449070",
    whatsapp: "8801782449070",
    linkedin: "https://www.linkedin.com/in/deboneelpartho",
    github: "https://github.com/deboneel",
    resume: "resume/Deboneel_Kundu_Partho_Resume_P.pdf",
    portrait: "images/CEGIS.jpg",
    personalBoard: { title: "Off the field", photos: [
      { src: "Image.jpg", caption: "Off the field" },
      { src: "defence.jpeg", caption: "On campus, BAU" },
    ] },
    video: "video/Engineer_working.mp4",
    videoPoster: "video/video-poster.jpg",
    bio: [
      "Deboneel Kundu Partho is an agricultural engineering graduate specializing in irrigation & water management from Bangladesh Agricultural University, ranked 2nd in his department, with four Q1 journal publications in climate-resilient irrigation, hydrology, and water quality modeling.",
      "He has worked as a research assistant at the AgroSense and Water Innovation Lab and as a field research associate at Bangladesh Agricultural University, working on climate-driven irrigation modeling, CMIP6 climate analysis, CropWat, AquaCrop, and DSSAT simulations, GIS-based spatial analysis, rice AWD field trials, potato irrigation, phytoremediation, and river water-quality assessment. He also completed a technical internship at CEGIS under the Ministry of Water Resources, contributing to irrigation planning, hydro-meteorological analysis, ArcGIS mapping, AquaCrop simulations, and SWAT training.",
      "His research interests lie in climate-resilient irrigation, agricultural and water-resources modeling, GIS and spatial analysis, and sustainable water management. He is particularly interested in integrating field research, climate projections, and modeling tools to address real-world agricultural and environmental challenges.",
      "He is currently seeking a funded MS or PhD opportunity where he can contribute his research experience, develop advanced expertise, and pursue meaningful research in agricultural, environmental, or water-resources systems.",
      "Outside research, he enjoys making new friends and listening to music.",
    ],
  },

  focus: [
    {
      title: "Climate projections for irrigation",
      text: "Downscaling and bias-correcting CMIP6 / CMIP5 GCM ensembles to estimate how irrigation demand and water availability shift at district and sub-district scale.",
      tools: ["CMIP6 / CMIP5", "EQM · QDM · QM", "SSP / RCP"],
    },
    {
      title: "GIS & spatial analysis",
      text: "Turning scattered field and station data into continuous surfaces and thematic layers that planners can act on at upazila level.",
      tools: ["ArcGIS Pro", "Kriging · IDW", "Remote sensing"],
    },
    {
      title: "Crop-water modelling",
      text: "Simulating crop water requirement and irrigation schedules for rice, potato, maize and wheat, now and under future scenarios.",
      tools: ["CropWat", "AquaCrop", "DSSAT"],
    },
    {
      title: "Hydrosystems",
      text: "Watershed-scale modelling that links land use, soils and climate to basin water balance.",
      tools: ["SWAT+", "HEC-HMS"],
    },
  ],

  experience: [
    {
      role: "Research Intern, Agricultural & Fisheries Division",
      org: "CEGIS · Center for Environmental and Geographic Information Services, Ministry of Water Resources",
      place: "Agargaon, Dhaka",
      period: "Jun – Jul 2026",
      points: [
        "Worked on the North Rajshahi Irrigation Project, assessing drought severity and water availability with the Agroecological Zones (AEZ) database.",
        "Processed hydro-meteorological data and produced soil and agricultural thematic maps in ArcGIS Pro.",
        "Ran crop yield and water-requirement simulations in FAO AquaCrop; trained in SWAT and GIS / remote sensing for climate-smart irrigation.",
        "Co-authored technical reports and received a formal commendation from the Executive Director (Acting).",
      ],
      tags: ["ArcGIS Pro", "AquaCrop", "SWAT", "Remote sensing"],
      boards: [{ title: "Internship at CEGIS, Dhaka", photos: [
        { src: "Internship.jpg", caption: "Receiving the CEGIS certificate" },
        { src: "cegis (2).jpg", caption: "Analysis work at CEGIS" },
        { src: "cegis (3).jpg", caption: "Technical session, CEGIS" },
        { src: "Internship (2).jpg", caption: "Meeting with the CEGIS team" },
      ] }],
      certificate: "certificates/CEGIS_Certificate.pdf",
    },
    {
      role: "Research Assistant (Contract, hybrid)",
      org: "WebAIS project",
      place: "Natore · Manikganj · Satkhira",
      period: "Jul 2025 – Present",
      points: [
        "WebAIS (Web-based Agricultural Information System for Bangladesh) is building a digital twin of Bangladeshi agriculture, linking field sensors, satellite data and hydrological, climate and crop models to raise irrigation efficiency.",
        "Led by TH Köln and executed by BADC, with BUET, BAU, BRRI and BARI as national partners; funded by the Government of Bangladesh and the Ministry of Agriculture.",
        "My part: DSSAT crop modelling to optimise stage-specific rice irrigation at pilot sites in Natore, Manikganj and Satkhira.",
      ],
      tags: ["DSSAT", "Rice irrigation", "Multi-institution"],
      boards: [{ title: "WebAIS rice pilot sites", photos: [
        { src: "WEBAIS.jpg", caption: "At a WebAIS pilot site" },
        { src: "WEBAIS2.jpg", caption: "Walking the rice field" },
      ] }],
    },
    {
      role: "Field Research Associate",
      org: "Bangladesh Agricultural University",
      place: "Mymensingh",
      period: "Nov 2024 – Present",
      points: [
        "Potato ET₀ irrigation modelling (2 seasons): built and validated an ET₀-based precision irrigation model that cut field water input while holding target yield.",
        "Potato phytoremediation & wastewater reuse (1 season): designed trials linking crop stress response to contaminant load reduction.",
        "BRRI dhan88 AWD management (3 seasons): ran Alternate Wetting and Drying protocols and trained team members on water-table monitoring.",
      ],
      tags: ["ET₀ modelling", "Field trials", "AWD"],
      boards: [{ title: "Potato field trials", photos: [
        { src: "Potato.jpg", caption: "Potato plot layout" },
        { src: "Field.jpg", caption: "Field observation" },
        { src: "portato5.jpg", caption: "Recording field data" },
        { src: "Potato1.jpg", caption: "Sampling with the team" },
        { src: "potato3.jpg", caption: "Potato trial, mid-season" },
      ] }],
    },
    {
      role: "Research Assistant",
      org: "AgroSense and Water Innovation Lab, BAU",
      place: "Mymensingh",
      period: "Jan 2024 – Present",
      points: [
        "Led CropWat irrigation projections for maize and potato (supporting wheat) across Mymensingh, and mapped Brahmaputra River water quality from field samples.",
        "Mentored 15+ research teams (50+ members) in Rajshahi, Bogura, Rangpur and Dinajpur, standardising CropWat, CMIP6 downscaling and GIS interpolation workflows.",
        "Three seasons of AWD rice trials: LAI, grain yield, 1000-grain weight, panicle data, plus CMIP6 bias correction, LOOCV, kriging and IDW (p = 1, 2, 3).",
      ],
      tags: ["CropWat", "CMIP6", "Kriging / IDW", "AWD rice"],
      boards: [{ title: "Rice field · AWD trials", photos: [
        { src: "AWD.jpg", caption: "Installing AWD field tubes" },
        { src: "AWD1.jpg", caption: "Water management in the plot" },
        { src: "AWD3.jpg", caption: "AWD field site" },
        { src: "AWD (2).jpg", caption: "Harvest sampling" },
        { src: "AWD (3).jpg", caption: "With the field team" },
        { src: "Plant_Height.jpg", caption: "Measuring plant height" },
      ] }, { title: "Lab work & sessions", photos: [
        { src: "Lab_Work.jpg", caption: "Sample analysis in the lab" },
        { src: "Session.jpg", caption: "Training Session with Team Members" },
      ] }],
    },
  ],

  projects: [
    {
      title: "North Rajshahi Irrigation Project",
      kicker: "CEGIS · GIS + AquaCrop",
      image: "images/projects/NRIP.jpg",
      pos: "center 30%",
      summary: "Why does one irrigation schedule perform so differently across a 175,933 ha project?",
      finding: "Soil texture, not scheduling, drives outcomes across 84% of the area. Result: an upazila-targeted AWD recommendation instead of a blanket policy change.",
      method: "Seven thematic layers (AEZ, soil texture, drainage, moisture, recession, land type, landform) from SRDI, BADC and BBS data, plus AquaCrop runs of Boro rice for every soil type and irrigation rhythm in the Barind Tract.",
      tools: ["ArcGIS Pro", "AquaCrop", "Kriging"],
      url: "https://deboneel.github.io/CEGIS_NRIP/",
    },
    {
      title: "Irrigation Atlas of Bangladesh, Rabi 2023–24",
      kicker: "64 districts · 5 variables",
      image: "images/projects/CEGIS_Irrigation.jpg",
      summary: "What sits behind the national 72% irrigation coverage figure?",
      finding: "The districts leading irrigation coverage (Rajshahi, Rangpur, Mymensingh) also have the deepest groundwater tables: a sustainability risk hidden by the headline number.",
      method: "Mapped coverage, surface vs groundwater reliance, power source and groundwater depth; Ordinary Kriging of 2023 readings into a four-tier depth-risk class across 362 upazilas.",
      tools: ["ArcGIS Pro", "Ordinary Kriging", "BADC data"],
      url: "https://deboneel.github.io/CEGIS_Irrigation_Project/",
    },
    {
      title: "Mapping the Harvest",
      kicker: "18 maps · 6 crops",
      image: "images/projects/Agri_Them_clean.jpg",
      summary: "Which districts are truly specialised in a crop, and which are simply large?",
      finding: "A recurring pattern: an irrigated Rangpur–Rajshahi belt leads almost every parameter, while the Sylhet and coastal periphery stay structurally constrained.",
      method: "Joined BBS production and area statistics to district boundaries; computed yield, crop area and share of district area for Boro, Aus, Aman, wheat, maize and potato; charts in Python.",
      tools: ["ArcGIS Pro", "Python", "BBS statistics"],
      url: "https://deboneel.github.io/CEGIS_Agri_thematic_map/",
    },
    {
      title: "Half the Year, Underwater",
      kicker: "Haor region · 1.97 M ha",
      image: "images/projects/Project_1_Thumbnail.jpg",
      summary: "Why can most of the Haor grow only one Boro rice crop a year?",
      finding: "Over 46% of the region is poorly or very poorly drained and 68% is clay or clay-loam, which together explain the single-season limit.",
      method: "Six thematic layers (AEZ, land type, soil texture, drainage, water recession, soil moisture), including fixing a missing projection (Gulshan 303 BTM).",
      tools: ["ArcGIS Pro", "Geoprocessing", "Projection fix"],
      url: "https://deboneel.github.io/CEGIS_Haor_Project/",
    },
  ],

  // Published papers show full author lists (your name is highlighted).
  // Manuscripts under review deliberately show no author names.
  publications: [
    {
      title: "Spatiotemporal Dynamics of Climate-Driven Irrigation Requirements for Maize in Mymensingh, Bangladesh: A GIS-Based Multi-Model GCM Ensemble Projection Approach",
      journal: "Results in Engineering (Elsevier)", year: "2026", q: "Q1", impact: "IF 7.9",
      doi: "10.1016/j.rineng.2026.110970",
      authors: "Md Touhidul Islam, Atia Nishat, Deboneel Kundu Partho, Md Arafat Rahman, Trishna Rani Biswas, Sadman Arfin Asam, Arif Jewel, A.K.M. Adham",
    },
    {
      title: "Future Water Management Strategies for Potato Irrigation Under Multiple Climate Change Scenarios Using Advanced CMIP6 Modeling in Subtropical Bangladesh",
      journal: "Journal of Agriculture and Food Research (Elsevier)", year: "2025", q: "Q1", impact: "IF 6.2",
      doi: "10.1016/j.jafr.2025.102571",
      authors: "Md Touhidul Islam, Deboneel Kundu Partho, Nusrat Jahan, Md Jannatun Naiem, Tahira Ferdoushi Marzia, Md Mazharul Islam, Nahidul Islam, Sujan Chandra Roy, A.K.M. Adham",
    },
    {
      title: "Climate-Smart Irrigation Planning for Rabi Maize (Zea mays L.): CMIP6 Multi-Model Projections in North-Central Bangladesh",
      journal: "Journal of Agriculture and Food Research (Elsevier)", year: "2025", q: "Q1", impact: "IF 6.2",
      doi: "10.1016/j.jafr.2025.102225",
      authors: "Md Touhidul Islam, Deboneel Kundu Partho, Nusrat Jahan, Md Tarek Abrar, Azizul Hakim, Md Mazharul Islam, Md Touhidul Haider, A.K.M. Adham",
    },
    {
      title: "Regional Irrigation Water Quality Index for the Old Brahmaputra River, Bangladesh: A Multivariate and GIS-Based Spatiotemporal Assessment",
      journal: "Results in Engineering (Elsevier)", year: "2024", q: "Q1", impact: "IF 7.9",
      doi: "10.1016/j.rineng.2024.103667",
      authors: "Md. Touhidul Islam, Akash, Mst. Rimi Khatun, Nusrat Jahan, Md. Rakibul Islam, Deboneel Kundu Partho, Mohammad Golam Kibria, A.K.M. Adham",
    },
  ],
  underReview: [
    { title: "Spatially Explicit Mapping of Future Irrigation Demand for Boro Rice in the Drought-Prone Rajshahi Division: A GIS Kriging Approach Using CMIP6 Ensembles, Bangladesh", note: "From my B.Sc. thesis" },
    { title: "District-Scale Projections of Climate-Driven Divergence in Wheat Irrigation Requirements Under Shared Socioeconomic Pathways for Rangpur and Dinajpur, Bangladesh", note: "" },
  ],

  education: [
    {
      degree: "M.S. in Irrigation & Water Management",
      school: "Bangladesh Agricultural University, Mymensingh",
      period: "Ongoing",
      current: true,
      lines: [
        "Supervisor: Dr. A.K.M. Adham (Professor), Dept. of Irrigation & Water Management",
        "Enrolled in the Department of Irrigation & Water Management while applying for funded graduate study abroad.",
      ],
    },
    {
      degree: "B.Sc. in Agricultural Engineering",
      school: "Bangladesh Agricultural University, Mymensingh · Dept. of Irrigation & Water Management",
      period: "2022 – 2026",
      lines: [
        "CGPA 3.488 / 4.00 over 8 semesters, ranked 2nd in the department",
        "Thesis: Spatially Explicit Mapping of Future Irrigation Demand for Boro Rice in the Drought-Prone Rajshahi Division, a GIS kriging approach using CMIP6 ensembles",
        "Supervisors: Dr. Md. Touhidul Islam (Associate Professor) and Dr. A.K.M. Adham (Professor)",
      ],
      boards: [
        { title: "Thesis defence", photos: [
          { src: "20260823_131436.jpg", caption: "After the thesis defence, Aug 2026" },
          { src: "Supervisor.jpg", caption: "With my supervisor" },
          { src: "Cosupervisor.jpg", caption: "With my co-supervisor" },
          { src: "thesis.jpg", caption: "Thesis report and GIS maps" },
        ] },
        { title: "Faculty · Dept. of IWM", photos: [
          { src: "iwm.jpg", caption: "Dept. of Irrigation & Water Management, BAU" },
        ] },
      ],
    },
  ],
  school: [
    { name: "Higher Secondary Certificate (HSC)", group: "Science", school: "Govt. M. M. City College", board: "Jashore Board", year: "2020", gpa: "GPA 5.00 / 5.00", file: "certificates/HSC certificates.pdf" },
    { name: "Secondary School Certificate (SSC)", group: "Science", school: "Bagerhat Govt. High School", board: "Jashore Board", year: "2018", gpa: "GPA 5.00 / 5.00", file: "certificates/SSC_Certificates.pdf" },
    { name: "Junior School Certificate (JSC)", group: "", school: "Bagerhat Govt. High School", board: "Jashore Board", year: "2015", gpa: "GPA 5.00 / 5.00", file: "certificates/JSC_Certificates.pdf" },
  ],

  // Key B.Sc. courses (names only)
  coursework: [
    "Hydrology", "Irrigation Science", "Irrigation System Design", "On-Farm Water Management",
    "Hydrosystems Modelling", "GIS and Remote Sensing", "Agricultural Meteorology and Climate Change",
    "Groundwater and Well Technology", "Geohydrology", "Irrigation Water Quality and Treatment",
    "Drainage and Reclamation Engineering", "Soil and Water Conservation Engineering",
    "Fluid Mechanics and Hydraulics", "Hydraulic Structure", "Pumps and Tubewells",
    "River Training and Flood Management", "Statistics", "Applied Programming",
  ],
  handsOn: {
    title: "Course practicals & field visits",
    text: "Hands-on sessions from courses such as Agricultural Power, Agricultural Machinery, Heat Engine and Pumps & Tubewells, plus field visits to the Bangladesh Meteorological Department (BMD) weather station in Mymensingh for Agricultural Meteorology & Climate Change and to an electrical substation for the electrical engineering courses.",
    boards: [
      { title: "Machinery practicals", photos: [
        { src: "Machinery_Training.jpg", caption: "Farm power & machinery training" },
        { src: "Power tiller.jpg", caption: "Power tiller operation" },
        { src: "Pump.jpg", caption: "Irrigation pump & tubewell practical" },
        { src: "Tractor.jpg", caption: "Tractor operation" },
      ] },
      { title: "Field visits", photos: [
        { src: "Weather_station_Visit.jpg", caption: "BMD weather station, Mymensingh" },
        { src: "Electrical_Tour.jpg", caption: "Electrical substation tour" },
      ] },
    ],
  },
  baures: {
    board: "BAURES events",
    title: "BAURES research events",
    text: "Research is something I follow outside my own projects too. I'm an active participant in programmes run by the Bangladesh Agricultural University Research System (BAURES), attending and taking part in its workshops, seminars and research-progress events.",
    photos: [
      { src: "BAURES_workshop.jpg", caption: "Annual Workshop on BAU Research Progress 2023–24" },
      { src: "BAURES.jpg", caption: "BAURES research event" },
    ],
  },

  skills: [
    { group: "GIS & spatial", items: ["ArcGIS Pro", "ArcMap", "Kriging & IDW", "Remote sensing", "AutoCAD"] },
    { group: "Climate & crop-water", items: ["CMIP6 / CMIP5 ensembles", "Bias correction", "CropWat", "AquaCrop", "DSSAT"] },
    { group: "Hydrology", items: ["SWAT+", "HEC-HMS"] },
    { group: "Data & code", items: ["Python (NumPy, Pandas, Matplotlib, Seaborn)", "Statistical & ML modelling", "LOOCV"] },
    { group: "Tools", items: ["Excel", "Word", "PowerPoint", "HTML / CSS", "Adobe Illustrator", "Canva"] },
    { group: "Languages", items: ["Bangla (native)", "English (professional)"] },
  ],

  certificates: [
    { title: "B.Sc. in Agricultural Engineering (Provisional)", by: "Bangladesh Agricultural University", date: "2026", file: "certificates/BSc_Provisional_Certificate.pdf", thumb: "certificates/thumbs/bsc-provisional-certificate.jpg" },
    { title: "Internship, Agricultural & Fisheries Division", by: "CEGIS, Ministry of Water Resources", date: "2026", file: "certificates/CEGIS_Certificate.pdf", thumb: "certificates/thumbs/cegis-internship-certificate.jpg" },
    { title: "Extension field trip", by: "Dept. of Agricultural Extension Education, BAU", date: "2025", file: "certificates/extension_certificate.pdf", thumb: "certificates/thumbs/extension-field-trip-certificate.jpg" },
    { title: "Research Assistant recommendation", by: "Dr. Md. Touhidul Islam, IWM, BAU", date: "2024", file: "certificates/RA_Touhid sir.pdf", thumb: "certificates/thumbs/ra-recommendation-letter.jpg" },
    { title: "Higher Secondary Certificate", by: "Board of Education, Jashore", date: "2020", file: "certificates/HSC certificates.pdf", thumb: "certificates/thumbs/hsc-certificate.jpg" },
    { title: "Secondary School Certificate", by: "Board of Education, Jashore", date: "2018", file: "certificates/SSC_Certificates.pdf", thumb: "certificates/thumbs/ssc-certificate.jpg" },
    { title: "Junior School Certificate", by: "Board of Education, Jashore", date: "2015", file: "certificates/JSC_Certificates.pdf", thumb: "certificates/thumbs/jsc-certificate.jpg" },
  ],

  next: {
    intro: "I'm enrolled in the MS programme at BAU and applying for a funded MS or PhD at a research university abroad.",
    now: [
      { title: "Preparing for IELTS", text: "Getting ready for the IELTS exam for graduate applications abroad." },
      { title: "HEC-HMS course", text: "Enrolled in an HEC-HMS hydrological modelling course offered by UNICEF." },
      { title: "Working with SWAT+", text: "Building watershed models in SWAT+ to connect land use, soils and climate with basin water balance." },
    ],
    questionsIntro: "The research questions I want to keep working on:",
    items: [
      { title: "Irrigation demand under future climate", text: "Moving from district-scale CMIP6 projections to field-to-basin estimates that irrigation planners can actually use." },
      { title: "Groundwater limits in heavily irrigated regions", text: "My atlas work showed the most irrigated districts also have the deepest water tables. I want to know how long that can hold, and what changes it." },
      { title: "Crop models coupled with hydrology", text: "Linking DSSAT / AquaCrop with SWAT+ so crop water use and basin water balance are modelled together instead of separately." },
    ],
    looking: "Supervisors and labs in agricultural water management, hydrology and climate adaptation.",
  },
};
