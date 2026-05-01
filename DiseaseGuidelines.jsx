import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SearchIcon from "@mui/icons-material/Search";

// This is your data from DiseaseGuidelines.jsx
const diseaseGuidelines = [
  {
    key: "akiec",
    title: "Actinic Keratoses (akiec)",
    subtitle: "Precancerous rough, scaly patches caused by sun damage.",
    dos: [
      "Wear broad-spectrum sunscreen daily (SPF 30+).",
      "Use hats, sunglasses, and protective clothing.",
      "Schedule regular dermatologist check-ups.",
      "Keep skin moisturized to reduce dryness.",
    ],
    donts: [
      "Avoid tanning beds and prolonged sun exposure.",
      "Don’t pick or scratch lesions.",
      "Avoid harsh, heavily perfumed skincare products.",
    ],
    diet: [
      "Antioxidants: berries, citrus, spinach, tomatoes.",
      "Omega-3: fish, walnuts, flaxseeds.",
      "Hydrate well (2–3 L/day).",
    ],
    precautions: [
      "Annual skin screenings.",
      "Monitor and report new or enlarging lesions.",
    ],
  },
  {
    key: "bcc",
    title: "Basal Cell Carcinoma (bcc)",
    subtitle: "Most common skin cancer, usually linked to UV exposure.",
    dos: [
      "Apply SPF 50 sunscreen and reapply regularly.",
      "Wear protective clothing; avoid 10am–4pm sun.",
      "Adhere to post-treatment follow-ups.",
    ],
    donts: [
      "Don’t ignore recurring sores or non-healing bumps.",
      "Avoid smoking and excess alcohol (slows healing).",
      "Don’t self-medicate without medical advice.",
    ],
    diet: [
      "Vitamin C & E: oranges, almonds, sunflower seeds.",
      "Cruciferous veggies: broccoli, cabbage.",
      "Cut back on processed/fried foods.",
    ],
    precautions: [
      "Early detection is critical — see a doctor promptly.",
      "After surgery, protect scar from sunlight.",
    ],
  },
  {
    key: "bkl",
    title: "Benign Keratosis-like Lesions (bkl)",
    subtitle: "Non-cancerous growths often mistaken for melanoma.",
    dos: [
      "Maintain gentle skin hygiene.",
      "Use mild, non-irritating skincare.",
      "Get periodic checks to rule out melanoma.",
    ],
    donts: [
      "Don’t scratch or try DIY removal.",
      "Avoid harsh sun on the lesions.",
      "Skip heavy, oily creams on the spot.",
    ],
    diet: [
      "Balanced meals with greens & fruits.",
      "Zinc sources: pumpkin seeds, chickpeas.",
      "Limit refined sugar.",
    ],
    precautions: [
      "Monitor size/shape changes and consult a doctor if they evolve.",
      "Avoid home freezing/burning remedies.",
    ],
  },
  {
    key: "df",
    title: "Dermatofibroma (df)",
    subtitle: "Small, benign nodules often after minor trauma or insect bites.",
    dos: [
      "Keep the area clean and moisturized.",
      "Prefer soft cotton clothing to avoid friction.",
      "Use prescribed ointments if itchy.",
    ],
    donts: [
      "Don’t scratch or pick at the bump.",
      "Avoid steroid creams without advice.",
      "No home attempts to remove it.",
    ],
    diet: [
      "Immunity boosters: citrus, leafy greens.",
      "Adequate protein for tissue repair.",
      "Stay hydrated.",
    ],
    precautions: [
      "Usually harmless — watch for unusual growth or pain.",
      "Consult dermatologist if rapid change occurs.",
    ],
  },
  {
    key: "mel",
    title: "Melanoma (mel)",
    subtitle: "Most dangerous skin cancer from melanocytes.",
    dos: [
      "Self-checks using ABCDE (Asymmetry, Border, Color, Diameter, Evolving).",
      "Use SPF 50+ diligently.",
      "Seek immediate help for changing moles.",
    ],
    donts: [
      "Don’t ignore small or subtle changes.",
      "Avoid tanning and prolonged direct sun.",
      "Don’t delay biopsy or treatment.",
    ],
    diet: [
      "Antioxidants: blueberries, spinach, carrots.",
      "Vitamin D: mushrooms, fortified milk.",
      "Cut down on red/processed meat.",
    ],
    precautions: [
      "Family history = higher risk → more frequent check-ups.",
      "Lifelong monitoring after treatment.",
    ],
  },
  {
    key: "nv",
    title: "Melanocytic Nevi / Moles (nv)",
    subtitle: "Common non-cancerous moles; a few can transform.",
    dos: [
      "Monitor moles and photograph to track changes.",
      "Daily sunscreen use.",
      "Seek advice for new or changing moles.",
    ],
    donts: [
      "Don’t scratch or shave over moles.",
      "Avoid excessive sun exposure.",
      "Don’t ignore bleeding or itching.",
    ],
    diet: [
      "Vitamin A foods: carrots, sweet potato.",
      "Nuts & seeds to support immunity.",
      "Avoid ultra-processed junk foods.",
    ],
    precautions: [
      "See a dermatologist if a mole changes in color, size, or symmetry.",
      "Extra vigilance if you have many moles.",
    ],
  },
  {
    key: "vasc",
    title: "Vascular Lesions (vasc)",
    subtitle: "Abnormal blood vessels (e.g., angiomas, hemangiomas).",
    dos: [
      "Keep the area clean and moisturized.",
      "Protect from injury or friction.",
      "Consult a doctor if it enlarges or bleeds.",
    ],
    donts: [
      "Don’t press, scratch, or cut the lesion.",
      "Avoid hot compresses or DIY cauterization.",
      "Don’t use chemical irritants.",
    ],
    diet: [
      "Vessel-friendly foods: garlic, onions, citrus.",
      "Omega-3: fish, flaxseeds.",
      "Limit alcohol and excess salt.",
    ],
    precautions: [
      "Most are harmless; large/painful ones need evaluation.",
      "Monitor vascular birthmarks in children regularly.",
    ],
  },
  {
    key: "eczema",
    title: "Eczema (eczema)",
    subtitle: "Chronic inflammatory skin condition causing dry, itchy patches.",
    dos: [
      "Moisturize skin multiple times daily with fragrance-free creams.",
      "Use gentle, soap-free cleansers and lukewarm water.",
      "Wear soft, breathable fabrics like cotton.",
      "Identify and avoid personal triggers (e.g., allergens, stress).",
    ],
    donts: [
      "Avoid scratching to prevent skin damage and infection.",
      "Don’t use harsh soaps or detergents.",
      "Avoid long, hot showers or baths.",
      "Stay away from known irritants (e.g., wool, synthetic fabrics).",
    ],
    diet: [
      "Anti-inflammatory foods: fatty fish, turmeric, ginger.",
      "Probiotics: yogurt, kefir, sauerkraut.",
      "Hydrate well (2–3 L/day).",
    ],
    precautions: [
      "Manage stress through relaxation techniques.",
      "Keep fingernails short to minimize skin damage from scratching.",
      "Use a humidifier in dry environments.",
    ],
  },
  {
    key: "acne",
    title: "Acne (acne)",
    subtitle: "Common skin condition causing pimples, blackheads, and cysts.",
    dos: [
      "Cleanse face twice daily with a gentle cleanser.",
      "Use non-comedogenic (won't clog pores) skincare products.",
      "Apply topical treatments as prescribed (benzoyl peroxide, salicylic acid).",
      "Maintain a healthy diet and stay hydrated.",
    ],
    donts: [
      "Avoid picking or squeezing pimples to prevent scarring.",
      "Don’t over-wash or scrub the skin harshly.",
      "Avoid oily or greasy cosmetics and hair products.",
      "Limit sun exposure and use sunscreen.",
    ],
    diet: [
      "Low-glycemic foods: whole grains, legumes, vegetables.",
      "Omega-3 rich foods: fish, flaxseeds, walnuts.",
      "Limit dairy and sugary foods.",
    ],
    precautions: [
      "Consult a dermatologist for persistent or severe acne.",
      "Be patient; treatments can take weeks to show results.",
      "Avoid stress as it can exacerbate acne.",
    ],
  },
  {
    key: "psoriasis",
    title: "Psoriasis (psoriasis)",
    subtitle: "Chronic autoimmune condition causing red, scaly skin patches.",
    dos: [
      "Moisturize skin regularly with thick creams or ointments.",
      "Take lukewarm baths with Epsom salts or oatmeal.",
      "Use prescribed topical treatments (corticosteroids, vitamin D analogs).",
      "Manage stress through relaxation techniques.",
    ],
    donts: [
      "Avoid scratching or picking at plaques to prevent worsening.",
      "Don’t use harsh soaps or skincare products.",
      "Avoid excessive alcohol consumption.",
      "Limit sun exposure and use sunscreen.",
    ],
    diet: [
      "Anti-inflammatory foods: fatty fish, fruits, vegetables.",
      "Whole grains and fiber-rich foods.",
      "Limit red meat and processed foods.",
    ],
    precautions: [
      "Regularly monitor for joint pain (psoriatic arthritis).",
      "Consult a dermatologist for flare-ups or new symptoms.",
      "Avoid smoking as it can worsen psoriasis.",
    ],
  },
  {
    key: "rosacea",
    title: "Rosacea (rosacea)",
    subtitle: "Chronic skin condition causing facial redness and pimples.",
    dos: [
      "Use gentle, fragrance-free cleansers and moisturizers.",
      "Apply sunscreen daily (SPF 30+).",
      "Identify and avoid personal triggers (e.g., spicy foods, alcohol, extreme temperatures).",
      "Use prescribed topical or oral treatments as directed.",
    ],
    donts: [
      "Avoid scrubbing or using abrasive skincare products.",
      "Don’t use hot water on the face; opt for lukewarm instead.",
      "Avoid known triggers that cause flare-ups.",
      "Limit alcohol and spicy food intake.",
    ],
    diet: [
      "Anti-inflammatory foods: leafy greens, berries, fatty fish.",
      "Hydrate well (2–3 L/day).",
      "Limit caffeine and hot beverages.",
    ],
    precautions: [
      "Consult a dermatologist for persistent redness or bumps.",
      "Be cautious with new skincare products; patch test first.",
      "Manage stress as it can trigger flare-ups.",
    ],
  },
  {
    key: "folliculitis",
    title: "Folliculitis (folliculitis)",
    subtitle: "Inflammation of hair follicles causing red, itchy bumps.",
    dos: [
      "Keep the affected area clean and dry.",
      "Use warm compresses to soothe irritation.",
      "Apply over-the-counter antibacterial creams if needed.",
      "Wear loose-fitting clothing to reduce friction.",
    ],
    donts: [
      "Avoid shaving the affected area until healed.",
      "Don’t scratch or pick at the bumps.",
      "Avoid hot tubs or pools that may be contaminated.",
      "Limit use of oily or greasy skin products.",
    ],
    diet: [
      "Balanced diet with plenty of fruits and vegetables.",
      "Foods rich in zinc: nuts, seeds, legumes.",
      "Stay hydrated.",
    ],
    precautions: [
      "Consult a healthcare provider if it worsens or spreads.",
      "Avoid sharing personal items like towels or razors.",
      "Maintain good hygiene to prevent recurrence.",
    ],
  },
  {
    key: "hives",
    title: "Hives (hives)",
    subtitle: "Red, itchy welts caused by allergic reactions or other triggers.",
    dos: [
      "Take antihistamines as recommended by a healthcare provider.",
      "Apply cool compresses to relieve itching.",
      "Wear loose, comfortable clothing.",
      "Identify and avoid known triggers (foods, medications, stress).",
    ],
    donts: [
      "Avoid scratching to prevent skin damage and infection.",
      "Don’t use hot water on the affected area.",
      "Avoid known allergens or irritants.",
      "Limit alcohol and caffeine intake.",
    ],
    diet: [
      "Anti-inflammatory foods: fruits, vegetables, fatty fish.",
      "Probiotics: yogurt, kefir, sauerkraut.",
      "Stay hydrated (2–3 L/day).",
    ],
    precautions: [
      "Seek immediate medical attention if hives are accompanied by difficulty breathing or swelling of the face/throat.",
      "Keep a diary of flare-ups to identify triggers.",
      "Consult a healthcare provider for persistent or severe hives.",
    ],
  },
  {
    key: "urticaria",
    title: "Chronic Urticaria (urticaria)",
    subtitle: "Long-lasting hives that can persist for six weeks or more.",
    dos: [
      "Take prescribed antihistamines regularly.",
      "Use cool compresses to soothe itching.",
      "Wear loose, breathable clothing.",
      "Maintain a diary to track flare-ups and potential triggers.",
    ],
    donts: [
      "Avoid scratching to prevent skin damage and infection.",
      "Don’t use hot water on the affected area.",
      "Avoid known allergens or irritants.",
      "Limit alcohol and caffeine intake.",
    ],
    diet: [
      "Anti-inflammatory foods: fruits, vegetables, fatty fish.",
      "Probiotics: yogurt, kefir, sauerkraut.",
      "Stay hydrated (2–3 L/day).",
    ],
    precautions: [
      "Consult a healthcare provider for persistent or severe urticaria.",
      "Seek immediate medical attention if hives are accompanied by difficulty breathing or swelling of the face/throat.",
      "Consider allergy testing to identify specific triggers.",
    ],
  },
  {
    key: "seborrheic_dermatitis",
    title: "Seborrheic Dermatitis (seborrheic_dermatitis)",
    subtitle: "Chronic skin condition causing scaly patches, red skin, and dandruff.",
    dos: [
      "Use medicated shampoos containing ketoconazole, selenium sulfide, or zinc pyrithione.",
      "Apply antifungal creams or corticosteroids as prescribed.",
      "Keep affected areas clean and dry.",
      "Moisturize skin with non-irritating lotions.",
    ],
    donts: [
      "Avoid harsh soaps and skincare products.",
      "Don’t scratch or pick at scaly patches.",
      "Limit exposure to cold, dry weather.",
      "Avoid excessive use of hair styling products.",
    ],
    diet: [
      "Anti-inflammatory foods: fatty fish, fruits, vegetables.",
      "Probiotics: yogurt, kefir, sauerkraut.",
      "Stay hydrated (2–3 L/day).",
    ],
    precautions: [
      "Consult a dermatologist for persistent or severe symptoms.",
      "Avoid known triggers such as stress and certain foods.",
      "Regularly wash hair and affected skin areas.",
    ],
  },
  {
    key: "lupus",
    title: "Cutaneous Lupus Erythematosus (lupus)",
    subtitle: "Autoimmune disease causing skin rashes and lesions.",
    dos: [
      "Use broad-spectrum sunscreen daily (SPF 30+).",
      "Wear protective clothing and hats when outdoors.",
      "Follow prescribed treatments (topical steroids, immunomodulators).",
      "Maintain a healthy lifestyle with regular exercise and balanced diet.",
    ],
    donts: [
      "Avoid direct sun exposure, especially during peak hours.",
      "Don’t use harsh skincare products or irritants.",
      "Avoid smoking and excessive alcohol consumption.",
      "Limit stress as it can trigger flare-ups.",
    ],
    diet: [
      "Anti-inflammatory foods: fatty fish, fruits, vegetables.",
      "Foods rich in antioxidants: berries, nuts, green tea.",
      "Stay hydrated (2–3 L/day).",
    ],
    precautions: [
      "Regularly monitor for new or worsening symptoms.",
      "Consult a healthcare provider for any signs of systemic involvement.",
      "Avoid known triggers such as certain medications and infections.",
    ],
  },
  {
    key: "vitiligo",
    title: "Vitiligo (vitiligo)",
    subtitle: "Loss of skin pigment causing white patches.",
    dos: [
      "Use sunscreen daily to protect depigmented areas.",
      "Wear protective clothing and hats when outdoors.",
      "Follow prescribed treatments (topical corticosteroids, calcineurin inhibitors).",
      "Consider cosmetic options like makeup or self-tanning products.",
    ],
    donts: [
      "Avoid direct sun exposure, especially during peak hours.",
      "Don’t use harsh skincare products or irritants.",
      "Avoid skin trauma (cuts, scrapes) that can worsen depigmentation.",
      "Limit stress as it can trigger or worsen symptoms.",
    ],
    diet: [
      "Balanced diet rich in fruits, vegetables, and whole grains.",
      "Foods high in antioxidants: berries, nuts, green tea.",
      "Stay hydrated (2–3 L/day).",
    ],
    precautions: [
      "Regularly monitor for new or expanding patches.",
      "Consult a dermatologist for any changes in skin condition.",
      "Avoid known triggers such as certain chemicals and skin injuries.",
    ],
  },
  {
    key: "tinea",
    title: "Tinea (tinea)",
    subtitle: "Fungal infections affecting skin, hair, or nails (e.g., athlete's foot, ringworm).",
    dos: [
      "Keep affected areas clean and dry.",
      "Use antifungal creams, powders, or sprays as prescribed.",
      "Wear breathable, moisture-wicking clothing and footwear.",
      "Change socks and underwear daily.",
    ],
    donts: [
      "Avoid sharing personal items like towels, clothing, or footwear.",
      "Don’t walk barefoot in communal areas (gyms, pools).",
      "Avoid tight-fitting clothing that traps moisture.",
      "Limit use of oily or greasy skin products.",
    ],
    diet: [
      "Balanced diet with plenty of fruits and vegetables.",
      "Foods rich in probiotics: yogurt, kefir, sauerkraut.",
      "Limit sugar and refined carbohydrates.",
    ],
    precautions: [
      "Consult a healthcare provider if the infection worsens or spreads.",
      "Complete the full course of antifungal treatment even if symptoms improve.",
      "Maintain good hygiene to prevent recurrence.",
    ],
  },
  {
    key: "scabies",
    title: "Scabies (scabies)",
    subtitle: "Contagious skin infestation caused by mites, leading to intense itching and rash.",
    dos: [
      "Use prescribed scabicidal creams or lotions on the entire body.",
      "Wash all clothing, bedding, and towels in hot water.",
      "Vacuum furniture and carpets to remove mites.",
      "Keep fingernails short to minimize skin damage from scratching.",
    ],
    donts: [
      "Avoid close physical contact with others until treated.",
      "Don’t share personal items like clothing or bedding.",
      "Avoid scratching to prevent skin damage and infection.",
      "Limit exposure to crowded places until treatment is complete.",
    ],
    diet: [
      "Balanced diet with plenty of fruits and vegetables.",
      "Foods rich in zinc: nuts, seeds, legumes.",
      "Stay hydrated.",
    ],
    precautions: [
      "All household members and close contacts should be treated simultaneously.",
      "Consult a healthcare provider if symptoms persist after treatment.",
      "Avoid re-infestation by maintaining good hygiene and cleaning living areas thoroughly.",
    ],
  },
  {
    key: "impetigo",
    title: "Impetigo (impetigo)",
    subtitle: "Highly contagious bacterial skin infection causing red sores and blisters.",
    dos: [
      "Keep the affected area clean and dry.",
      "Use prescribed topical or oral antibiotics as directed.",
      "Wash hands frequently to prevent spread.",
      "Cover sores with gauze or bandages to protect them.",
    ],
    donts: [
      "Avoid touching or scratching the sores.",
      "Don’t share personal items like towels, clothing, or bedding.",
      "Avoid close contact with others until treated.",
      "Limit exposure to communal areas (schools, gyms) until healed.",
    ],
    diet: [
      "Balanced diet with plenty of fruits and vegetables.",
      "Foods rich in vitamin C: citrus fruits, strawberries, bell peppers.",
      "Stay hydrated to support healing.",
    ],
    precautions: [
      "Consult a healthcare provider if the infection worsens or spreads.",
      "Complete the full course of antibiotics even if symptoms improve.",
      "Maintain good hygiene to prevent recurrence and spread to others.",
    ],
  },
  {
    key: "herpes",
    title: "Herpes Simplex Virus (herpes)",
    subtitle: "Viral infection causing painful blisters, commonly around the mouth or genitals.",
    dos: [
      "Use antiviral medications as prescribed to manage outbreaks.",
      "Keep the affected area clean and dry.",
      "Avoid touching the sores to prevent spreading the virus.",
      "Use sunscreen on lips and face to prevent sun-triggered outbreaks.",
    ],
    donts: [
      "Avoid close contact with others during an outbreak.",
      "Don’t share personal items like lip balm, utensils, or towels.",
      "Avoid kissing or sexual contact when sores are present.",
      "Limit stress and get adequate rest to help prevent outbreaks.",
    ],
    diet: [
      "Balanced diet with plenty of fruits and vegetables.",
      "Foods rich in lysine: yogurt, cheese, fish, chicken.",
      "Limit arginine-rich foods: nuts, chocolate, caffeine.",
    ],
    precautions: [
      "Avoid close contact with others during an outbreak.",
      "Wash hands thoroughly after touching affected areas.",
      "Do not share personal items (lip balm, towels, utensils) during outbreaks.",
      "Use protection (e.g., condoms) during sexual activity to reduce transmission risk.",
      "Consult a healthcare provider for frequent or severe outbreaks.",
      "Inform partners if you have active lesions.",
      "Manage stress and maintain a healthy immune system to help prevent recurrences."
    ],
  }
];

export default function DiseasesDosAndDonts() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredGuidelines = useMemo(() => {
        return diseaseGuidelines.filter(d =>
            d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.key.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Box mb={4}>
                <Typography variant="h4" fontWeight={800} gutterBottom>
                    Do’s, Don’ts, Diet & Precautions
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    A comprehensive guide for common skin conditions.
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search for a disease..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mt: 3, "& .MuiOutlinedInput-root": { borderRadius: 24 } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {filteredGuidelines.length > 0 ? (
                filteredGuidelines.map((d, idx) => (
                    <Accordion
                        key={d.key}
                        defaultExpanded={idx === 0}
                        sx={{
                            borderRadius: 3,
                            mb: 2,
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "divider",
                            background: "linear-gradient(180deg, #ffffff 0%, #f9fbff 100%)",
                            boxShadow: "0 6px 24px rgba(17,24,39,0.08)",
                            "& .MuiAccordionSummary-root": {
                                background:
                                    "linear-gradient(90deg, rgba(59,130,246,0.08) 0%, rgba(147,197,253,0.06) 100%)",
                            },
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box>
                                <Typography variant="h6" fontWeight={700}>
                                    {d.title}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    {d.subtitle}
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                                        Do’s
                                    </Typography>
                                    <List dense>
                                        {d.dos.map((t, i) => (
                                            <ListItem key={i} sx={{ py: 0.3 }}>
                                                <ListItemIcon>
                                                    <CheckCircleOutlineIcon color="success" />
                                                </ListItemIcon>
                                                <ListItemText primary={t} />
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                                        Don’ts
                                    </Typography>
                                    <List dense>
                                        {d.donts.map((t, i) => (
                                            <ListItem key={i} sx={{ py: 0.3 }}>
                                                <ListItemIcon>
                                                    <DoNotDisturbOnIcon color="error" />
                                                </ListItemIcon>
                                                <ListItemText primary={t} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                                        Diet
                                    </Typography>
                                    <List dense>
                                        {d.diet.map((t, i) => (
                                            <ListItem key={i} sx={{ py: 0.3 }}>
                                                <ListItemIcon>
                                                    <RestaurantIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText primary={t} />
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                                        Precautions
                                    </Typography>
                                    <List dense>
                                        {d.precautions.map((t, i) => (
                                            <ListItem key={i} sx={{ py: 0.3 }}>
                                                <ListItemIcon>
                                                    <WarningAmberIcon color="warning" />
                                                </ListItemIcon>
                                                <ListItemText primary={t} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4 }}>
                    No results found for your search.
                </Typography>
            )}
        </Container>
    );
}