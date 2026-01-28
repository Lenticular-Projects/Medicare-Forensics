const { GoogleGenerativeAI } = require("@google/generative-ai");

// 1. Setup API and Model
const apiKey = "AIzaSyBX1qY1ChLcpuGdkcHd3_ImEqF6peYV8Fc";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-pro',
    generationConfig: {
        temperature: 0.0,
        responseMimeType: "application/json",
        maxOutputTokens: 16000,
    },
    safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
    ]
});

// 2. The Massive User Input
const userPrompt = `
Logo
A
UHC Dual Complete FL-Y5 (HMO-POS D-SNP)
H2509-003-000
3.5 out of 5 stars 2026 plan year
UHC Dual Complete FL-D006 (HMO-POS D-SNP)
H2509-002-000
3.5 out of 5 stars 2026 plan year
UHC Dual Complete FL-D003 (PPO D-SNP)
H1889-002-001
4 out of 5 stars 2026 plan year
Summary
Monthly premium
$0.00
$0.00
$4.80
Medical deductible
$0
$261
$261 for In-Network Services per year
$288 for In-Network and Out-of-Network Services per year
Out-of-network maximum out-of-pocket
$0
$0
$13,900
In-network maximum out-of-pocket
$0
$9,250
$9,250
Combined maximum out-of-pocket
$0
$0
$13,900
Drug deductible
$615
$544
$615
Catastrophic coverage limit
$2,100
$2,100
$2,100
Part B giveback
Up to $0.60
Up to $0.60
N/A
Benefit details
Outpatient care and services  
Additional Services
Telehealth Services: $0 copay to talk with a network telehealth provider online through live audio and video.
Fitness Program: $0 copay for Renew Active®, which includes a free membership at core and premium gyms, plus online fitness classes and brain health challenges.
Meal Benefit: $0 copay for 28 home-delivered meals immediately after an inpatient hospitalization or skilled nursing facility (SNF) stay.
Telehealth Services: $0 copay to talk with a network telehealth provider online through live audio and video.
Fitness Program: $0 copay for Renew Active®, which includes a free membership at core and premium gyms, plus online fitness classes and brain health challenges.
Meal Benefit: $0 copay for 28 home-delivered meals immediately after an inpatient hospitalization or skilled nursing facility (SNF) stay.
Telehealth Services: $0 copay to talk with a network telehealth provider online through live audio and video.
Fitness Program: $0 copay for Renew Active®, which includes a free membership at core and premium gyms, plus online fitness classes and brain health challenges.
Meal Benefit: $0 copay for 28 home-delivered meals immediately after an inpatient hospitalization or skilled nursing facility (SNF) stay.
Ambulance Services
In-Network:

Ground Ambulance:
Copayment for Ground Ambulance Services $0

Air Ambulance:
Copayment for Air Ambulance Services $0
Prior Authorization Required for Air Ambulance
In-Network:

Ground Ambulance:
Coinsurance for Ground Ambulance Services 0% or 20%

Air Ambulance:
Coinsurance for Air Ambulance Services 0% or 20%
Prior Authorization Required for Air Ambulance
In-Network:

Ground Ambulance:
Coinsurance for Ground Ambulance Services 0% or 20%

Air Ambulance:
Coinsurance for Air Ambulance Services 0% or 20%
Prior Authorization Required for Air Ambulance

Out-of-Network:

Ambulance Services:
Coinsurance for Medicare Covered Ambulance Services - Ground 0% or 20%
Coinsurance for Medicare Covered Ambulance Services - Air 0% or 20%
Chiropractic Services
In-Network:

Chiropractic Services:
Copayment for Medicare-covered Chiropractic Services $0
Copayment for Routine Care $0
Maximum 12 Routine Care every year
Prior Authorization Required for Chiropractic Services
In-Network:

Chiropractic Services:
Copayment for Medicare-covered Chiropractic Services $0
Copayment for Routine Care $0
Maximum 12 Routine Care every year
Prior Authorization Required for Chiropractic Services
In-Network:

Chiropractic Services:
Copayment for Medicare-covered Chiropractic Services $0
Copayment for Routine Care $0
Maximum 12 Routine Care every year
Prior Authorization Required for Chiropractic Services

Out-of-Network:

Chiropractic Services:
Coinsurance for Medicare Covered Chiropractic Services 0% or 30%
Dental Services
$4,000 allowance toward covered preventive and comprehensive services.
$0 copay for covered preventive services such as oral exams, routine cleanings, X-rays and fluoride
$0 copay for all covered comprehensive services, such as fillings, crowns, root canals, extractions, bridges and dentures
You will have access to one of Medicare Advantage's largest dental networks, or you can choose any dentist.
$2,000 allowance toward covered preventive and comprehensive services.
$0 copay for covered preventive services such as oral exams, routine cleanings, X-rays and fluoride
$0 copay for all covered comprehensive services, such as fillings, crowns, root canals, extractions, bridges and dentures
You will have access to one of Medicare Advantage's largest dental networks, or you can choose any dentist.
$1,500 allowance toward covered preventive and comprehensive services.
$0 copay for covered preventive services such as oral exams, routine cleanings, X-rays and fluoride
$0 copay for all covered comprehensive services, such as fillings, crowns, root canals, extractions, bridges and dentures
You will have access to one of Medicare Advantage's largest dental networks, or you can choose any dentist.
Out-of-Network:

Preventive Dental Services:
Coinsurance for Medicare Covered Preventive Dental 0% or 40%
Diabetes Supplies and Services
In-Network:

Diabetic Supplies and Services:
Copayment for Medicare-covered Diabetic Supplies $0
Copayment for Medicare-covered Diabetic Therapeutic Shoes or Inserts $0
In-Network:

Diabetic Supplies and Services:
Copayment for Medicare-covered Diabetic Supplies $0
Copayment for Medicare-covered Diabetic Therapeutic Shoes or Inserts $0
In-Network:

Diabetic Supplies and Services:
Copayment for Medicare-covered Diabetic Supplies $0
Coinsurance for Medicare-covered Diabetic Therapeutic Shoes or Inserts 0% or 20%

Out-of-Network:

Diabetic Supplies and Services:
Coinsurance for Medicare Covered Diabetic Supplies 0% or 20%
Coinsurance for Medicare Covered Diabetic Therapeutic Shoes or Inserts 0% or 20%
Diagnostic Tests, Lab and Radiology Services, and X-Rays
Diagnostic Procedures/Tests: $0 copay
Lab Services: $0 copay
Diagnostic Radiology Services: $0 copay
X-Rays: $0 copay
Diagnostic Procedures/Tests: $0 - 20% of the cost
Lab Services: $0 copay
Diagnostic Radiology Services: $0 - 20% of the cost
X-Rays: $0 - 20% of the cost
Diagnostic Procedures/Tests: $0 - 20% of the cost
Lab Services: $0 copay
Diagnostic Radiology Services: $0 - 20% of the cost
X-Rays: $0 - 20% of the cost
Out-of-Network:

Diagnostic Procedures/Tests Services:
Coinsurance for Medicare Covered Diagnostic Procedures/Tests
0% or 40%
Copayment for Medicare Covered Lab Services
$0
Coinsurance for Medicare Covered Diagnostic Radiological Services 0% or 40%
Coinsurance for Medicare Covered Therapeutic Radiological Services 0% or 20%
Coinsurance for Medicare Covered Outpatient X-Ray Services 0% or 40%
Doctor Office Visits
Routine Annual Physical Exam: $0 copay 1 per year
Routine Annual Physical Exam: $0 copay 1 per year
Routine Annual Physical Exam: $0 copay 1 per year
Out-of-Network:

Doctor Office Visit Services:
Coinsurance for Medicare Covered Primary Care Office Visit 0% or 30%
Note: $0 copayment applies to Medicare covered telehealth and Medicare covered remote monitoring. The higher cost share applies to all other Medicare covered services.
Doctor Specialty Visit
In-Network:

Doctor Specialty Visit:
Copayment for Physician Specialist Office Visit $0
Prior Authorization Required for Doctor Specialty Visit
Referral Required for Doctor Specialty Visit
Note: $0 copayment applies to Medicare covered telehealth and Medicare covered remote monitoring. The higher cost share applies to all other Medicare covered services.
In-Network:

Doctor Specialty Visit:
Coinsurance for Physician Specialist Office Visit 0% to 20%
Prior Authorization Required for Doctor Specialty Visit
Referral Required for Doctor Specialty Visit
Note: $0 copayment applies to Medicare covered telehealth and Medicare covered remote monitoring. The higher cost share applies to all other Medicare covered services.
In-Network:

Doctor Specialty Visit:
Coinsurance for Physician Specialist Office Visit 0% to 20%
Prior Authorization Required for Doctor Specialty Visit
Note: $0 copayment applies to Medicare covered telehealth and Medicare covered remote monitoring. The higher cost share applies to all other Medicare covered services.

Out-of-Network:

Doctor Specialty Visit Services:
Coinsurance for Medicare Covered Physician Specialist Office Visit 0% or 30%
Note: $0 copayment applies to Medicare covered telehealth and Medicare covered remote monitoring. The higher cost share applies to all other Medicare covered services.
Durable Medical Equipment
In-Network:

Durable Medical Equipment:
Copayment for Medicare-covered Durable Medical Equipment $0
Prior Authorization Required for Durable Medical Equipment
In-Network:

Durable Medical Equipment:
Coinsurance for Medicare-covered Durable Medical Equipment 0% or 20%
Prior Authorization Required for Durable Medical Equipment
In-Network:

Durable Medical Equipment:
Coinsurance for Medicare-covered Durable Medical Equipment 0% or 20%
Prior Authorization Required for Durable Medical Equipment

Out-of-Network:

Durable Medical Equipment Services:
Coinsurance for Medicare Covered Durable Medical Equipment 0% or 20%
Emergency Care

Emergency Care:
Copayment for Emergency Care $0
Copayment for Medicare Covered Emergency Care waived if you are admitted to the hospital with in 24 hours

Worldwide Coverage:
Copayment for Worldwide Emergency Coverage $0
Copayment for Worldwide Emergency Transportation $0

Emergency Care:
Copayment for Emergency Care $0 or $115
Copayment for Medicare Covered Emergency Care waived if you are admitted to the hospital with in 24 hours

Worldwide Coverage:
Copayment for Worldwide Emergency Coverage $0
Copayment for Worldwide Emergency Transportation $0

Emergency Care:
Copayment for Emergency Care $0 or $115
Copayment for Medicare Covered Emergency Care waived if you are admitted to the hospital with in 24 hours

Worldwide Coverage:
Copayment for Worldwide Emergency Coverage $0
Copayment for Worldwide Emergency Transportation $0
Hearing Services
Hearing Aids Package: $2,500 allowance up to 2 hearing aids every 2 years
Choose from a broad selection of OTC and brand-name prescription hearing aids through UnitedHealthcare Hearing.
Access to one of the largest national networks with thousands of hearing professionals.
Hearing Aids Package: $2,200 allowance up to 2 hearing aids every 2 years
Choose from a broad selection of OTC and brand-name prescription hearing aids through UnitedHealthcare Hearing.
Access to one of the largest national networks with thousands of hearing professionals.
Hearing Aids Package: $2,200 allowance up to 2 hearing aids every 2 years
Choose from a broad selection of OTC and brand-name prescription hearing aids through UnitedHealthcare Hearing.
Access to one of the largest national networks with thousands of hearing professionals.
Out-of-Network:

Hearing Exams Services:
Coinsurance for Medicare Covered Hearing Exams 0% or 30%
Home Health Care
In-Network:

Home Health Services:
Copayment for Medicare-covered Home Health Services $0
Prior Authorization Required for Home Health Services
Referral Required for Home Health Services
In-Network:

Home Health Services:
Copayment for Medicare-covered Home Health Services $0
Prior Authorization Required for Home Health Services
Referral Required for Home Health Services
In-Network:

Home Health Services:
Copayment for Medicare-covered Home Health Services $0
Prior Authorization Required for Home Health Services

Out-of-Network:

Home Health Services:
Copayment for Medicare Covered Home Health $0
Outpatient Mental Health Care
In-Network:

Outpatient Mental Health Services:
Copayment for Medicare-covered Individual Sessions $0
Copayment for Medicare-covered Group Sessions $0
In-Network:

Outpatient Mental Health Services:
Coinsurance for Medicare-covered Individual Sessions 0% to 20%
Coinsurance for Medicare-covered Group Sessions 0% or 20%
In-Network:

Outpatient Mental Health Services:
Coinsurance for Medicare-covered Individual Sessions 0% to 20%
Coinsurance for Medicare-covered Group Sessions 0% or 20%

Out-of-Network:

Mental Health Services:
Coinsurance for Medicare Covered Individual Sessions 0% or 30%
Coinsurance for Medicare Covered Group Sessions 0% or 30%
Outpatient Prescription Drugs
In-Network:

Outpatient Part B RX Drugs:
Copayment for Medicare Part B Chemotherapy Drugs $0
Copayment for Other Medicare Part B Drugs $0
In-Network:

Outpatient Part B RX Drugs:
Coinsurance for Medicare Part B Chemotherapy Drugs 0% to 20%
Coinsurance for Other Medicare Part B Drugs 0% to 20%
In-Network:

Outpatient Part B RX Drugs:
Coinsurance for Medicare Part B Chemotherapy Drugs 0% to 20%
Coinsurance for Other Medicare Part B Drugs 0% to 20%

Out-of-Network:

Outpatient Part B RX Drugs Services:
Coinsurance for Medicare Covered Medicare Part B Chemotherapy Drugs 0% or 20%
Coinsurance for Medicare Covered Other Medicare Part B Drugs 0% or 20%
Outpatient Rehabilitation Services
In-Network:

Cardiac and Pulmonary Rehabilitation Services:
Copayment for Medicare-covered Cardiac Rehabilitation Services $0
Copayment for Medicare-covered Intensive Cardiac Rehabilitation Services $0
Copayment for Medicare-covered Pulmonary Rehabilitation Services $0
Prior Authorization Required for Cardiac and Pulmonary Rehabilitation Services
Referral Required for Cardiac and Pulmonary Rehabilitation Services

Occupational Therapy Rehabilitation Services:
Copayment for Medicare-covered Occupational Therapy Services $0
Prior Authorization Required for Occupational Therapy Rehabilitation Services
Referral Required for Occupational Therapy Rehabilitation Services

Physical Therapy and Speech-Language Pathology Services:
Copayment for Medicare-covered Physical Therapy and Speech-Language Pathology Service $0
Prior Authorization Required for Physical Therapy and Speech-Language Pathology Services
Referral Required for Physical Therapy and Speech-Language Pathology Services
In-Network:

Cardiac and Pulmonary Rehabilitation Services:
Coinsurance for Medicare-covered Cardiac Rehabilitation Services 0% or 20%
Coinsurance for Medicare-covered Intensive Cardiac Rehabilitation Services 0% or 20%
Coinsurance for Medicare-covered Pulmonary Rehabilitation Services 0% or 20%
Prior Authorization Required for Cardiac and Pulmonary Rehabilitation Services
Referral Required for Cardiac and Pulmonary Rehabilitation Services

Occupational Therapy Rehabilitation Services:
Coinsurance for Medicare-covered Occupational Therapy Services 0% or 20%
Prior Authorization Required for Occupational Therapy Rehabilitation Services
Referral Required for Occupational Therapy Rehabilitation Services

Physical Therapy and Speech-Language Pathology Services:
Coinsurance for Medicare-covered Physical Therapy and Speech-Language Pathology Service 0% or 20%
Prior Authorization Required for Physical Therapy and Speech-Language Pathology Services
Referral Required for Physical Therapy and Speech-Language Pathology Services
In-Network:

Cardiac and Pulmonary Rehabilitation Services:
Coinsurance for Medicare-covered Cardiac Rehabilitation Services 0% or 20%
Coinsurance for Medicare-covered Intensive Cardiac Rehabilitation Services 0% or 20%
Coinsurance for Medicare-covered Pulmonary Rehabilitation Services 0% or 20%
Prior Authorization Required for Cardiac and Pulmonary Rehabilitation Services

Occupational Therapy Rehabilitation Services:
Coinsurance for Medicare-covered Occupational Therapy Services 0% or 20%
Prior Authorization Required for Occupational Therapy Rehabilitation Services

Physical Therapy and Speech-Language Pathology Services:
Coinsurance for Medicare-covered Physical Therapy and Speech-Language Pathology Service 0% or 20%
Prior Authorization Required for Physical Therapy and Speech-Language Pathology Services

Out-of-Network:

Cardiac Rehabilitation Services:
Coinsurance for Medicare Covered Cardiac Rehabilitation Services
0% or 30%
Coinsurance for Medicare Covered Intensive Cardiac Rehabilitation Services
0% or 30%
Coinsurance for Medicare Covered Pulmonary Rehabilitation Services
0% or 30%
Coinsurance for Medicare Covered Occupational Therapy Services
0% or 30%
Coinsurance for Medicare Covered Physical Therapy and Speech-Language Pathology Services
0% or 30%
Outpatient Services/Surgery
In-Network:

Outpatient Hospital Services:
Copayment for Medicare Covered Outpatient Hospital Services $0
Prior Authorization Required for Outpatient Hospital Services
Referral Required for Outpatient Hospital Services
Benefit Details - General 9a1 Note - NOTE ON COST SHARING RANGE FOR OUTPATIENT HOSPITAL SERVICES: $0 copayment for outpatient diagnostic colonoscopies. The higher cost share applies to all other outpatient procedures.Benefit Details - General 9a1 Note - NOTE ON OUTPATIENT HOSPITAL SERVICES: Benefit category includes both the facility and professional component.

Outpatient Observation Services:
Copayment for Medicare Covered Observation Services $0
Prior Authorization Required for Outpatient Observation Services
Referral Required for Outpatient Observation Services
Benefit Details - General 9a2 Note - NOTE ON OBSERVATION SERVICES: Benefit category includes both the facility and professional component.

Ambulatory Surgical Center Services:
Copayment for Ambulatory Surgical Center Services $0
Prior Authorization Required for Ambulatory Surgical Center Services
Referral Required for Ambulatory Surgical Center Services
Benefit Details - General 9b Note - NOTE ON ASC SERVICES: Benefit category 9b includes both the facility and professional component.Benefit Details - General 9b Note - NOTE ON COST SHARING RANGE FOR ASC Services: $0 copayment for outpatient diagnostic colonoscopies. The higher cost share applies to all other outpatient procedures.
In-Network:

Outpatient Hospital Services:
Coinsurance for Medicare Covered Outpatient Hospital Services 0% to 20%
Prior Authorization Required for Outpatient Hospital Services
Referral Required for Outpatient Hospital Services
Benefit Details - General 9a1 Note - NOTE ON COST SHARING RANGE FOR OUTPATIENT HOSPITAL SERVICES: $0 copayment for outpatient diagnostic colonoscopies. The higher cost share applies to all other outpatient procedures.Benefit Details - General 9a1 Note - NOTE ON OUTPATIENT HOSPITAL SERVICES: Benefit category includes both the facility and professional component.

Outpatient Observation Services:
Coinsurance for Medicare Covered Observation Services 0% or 20%
Prior Authorization Required for Outpatient Observation Services
Referral Required for Outpatient Observation Services
Benefit Details - General 9a2 Note - NOTE ON OBSERVATION SERVICES: Benefit category includes both the facility and professional component.

Ambulatory Surgical Center Services:
Coinsurance for Ambulatory Surgical Center Services 0% to 20%
Prior Authorization Required for Ambulatory Surgical Center Services
Referral Required for Ambulatory Surgical Center Services
Benefit Details - General 9b Note - NOTE ON ASC SERVICES: Benefit category 9b includes both the facility and professional component.Benefit Details - General 9b Note - NOTE ON COST SHARING RANGE FOR ASC Services: $0 copayment for outpatient diagnostic colonoscopies. The higher cost share applies to all other outpatient procedures.
In-Network:

Outpatient Hospital Services:
Coinsurance for Medicare Covered Outpatient Hospital Services 0% to 20%
Prior Authorization Required for Outpatient Hospital Services
Benefit Details - General 9a1 Note - NOTE ON COST SHARING RANGE FOR OUTPATIENT HOSPITAL SERVICES: $0 copayment for outpatient diagnostic colonoscopies. The higher cost share applies to all other outpatient procedures.Benefit Details - General 9a1 Note - NOTE ON OUTPATIENT HOSPITAL SERVICES: Benefit category includes both the facility and professional component.

Outpatient Observation Services:
Coinsurance for Medicare Covered Observation Services 0% or 20%
Prior Authorization Required for Outpatient Observation Services
Benefit Details - General 9a2 Note - NOTE ON OBSERVATION SERVICES: Benefit category includes both the facility and professional component.

Ambulatory Surgical Center Services:
Coinsurance for Ambulatory Surgical Center Services 0% to 20%
Prior Authorization Required for Ambulatory Surgical Center Services
Benefit Details - General 9b Note - NOTE ON ASC SERVICES: Benefit category 9b includes both the facility and professional component.Benefit Details - General 9b Note - NOTE ON COST SHARING RANGE FOR ASC Services: $0 copayment for outpatient diagnostic colonoscopies. The higher cost share applies to all other outpatient procedures.

Out-of-Network:

Outpatient Hospital Services:
Coinsurance for Medicare Covered Outpatient Hospital Services 0% or 40%
Coinsurance for Medicare Covered Ambulatory Surgical Center Services 0% or 40%
Benefit Details - General 9a1 Note - NOTE ON COST SHARING RANGE FOR OUTPATIENT HOSPITAL SERVICES: $0 copayment for outpatient diagnostic colonoscopies. The higher cost share applies to all other outpatient procedures.Benefit Details - General 9a1 Note - NOTE ON OUTPATIENT HOSPITAL SERVICES: Benefit category includes both the facility and professional component.
Outpatient Substance Abuse
In-Network:

Outpatient Substance Abuse Services:
Copayment for Medicare-covered Individual Sessions $0
Copayment for Medicare-covered Group Sessions $0
Prior Authorization Required for Outpatient Substance Abuse Services
Note: $0 copayment applies to Medicare covered telehealth for individual sessions. The higher cost share applies to all other Medicare covered services.
In-Network:

Outpatient Substance Abuse Services:
Coinsurance for Medicare-covered Individual Sessions 0% to 20%
Coinsurance for Medicare-covered Group Sessions 0% or 20%
Prior Authorization Required for Outpatient Substance Abuse Services
Note: $0 copayment applies to Medicare covered telehealth for individual sessions. The higher cost share applies to all other Medicare covered services.
In-Network:

Outpatient Substance Abuse Services:
Coinsurance for Medicare-covered Individual Sessions 0% to 20%
Coinsurance for Medicare-covered Group Sessions 0% or 20%
Prior Authorization Required for Outpatient Substance Abuse Services
Note: $0 copayment applies to Medicare covered telehealth for individual sessions. The higher cost share applies to all other Medicare covered services.

Out-of-Network:

Outpatient Substance Abuse Services:
Coinsurance for Medicare Covered Individual Sessions 0% or 30%
Coinsurance for Medicare Covered Group Sessions 0% or 30%
Note: $0 copayment applies to Medicare covered telehealth for individual sessions. The higher cost share applies to all other Medicare covered services.
Over-the-Counter Items
$349 credit per month for OTC products and wellness support, plus healthy food and utilities for qualifying members.
$229 credit per month for OTC products and wellness support, plus healthy food and utilities for qualifying members.
$139 credit per month for OTC products and wellness support, plus healthy food and utilities for qualifying members.
Out-of-Network:

Over-The-Counter (OTC) Items Services:
Copayment for Non-Medicare Covered Over-The-Counter (OTC) Items $0
Podiatry Services
$0 copay 12 visits per year
$0 copay 12 visits per year
In-Network:

Podiatry Services:
Coinsurance for Medicare-Covered Podiatry Services 0% or 20%
Copayment for Routine Foot Care $0
Maximum 12 visits every year
Prior Authorization Required for Podiatry Services

Out-of-Network:

Podiatry Services:
Coinsurance for Medicare Covered Podiatry Services 0% or 30%
Preventive Services and Wellness/Education Programs
In-Network:
$0.00 copay for Medicare Covered Preventive Services:

Abdominal aortic aneurysm screening
Alcohol misuse screenings & counseling
Bone mass measurements (bone density)
Cardiovascular disease screenings
Cardiovascular disease (behavioral therapy)
Cervical & vaginal cancer screening
Colorectal cancer screenings
Depression screenings
Diabetes screenings
Diabetes self-management training
Glaucoma tests
Hepatitis B (HBV) infection screening
Hepatitis C screening test
HIV screening
Lung cancer screening
Mammograms (screening)
Nutrition therapy services
Obesity screenings & counseling
One-time Welcome to Medicare preventive visit
Prostate cancer screenings(PSA)
Sexually transmitted infections screening & counseling
Shots:
COVID-19 shots
Flu shots
Hepatitis B shots
Pneumococcal shots
Tobacco use cessation
Yearly "Wellness" visit

In-Network:
$0.00 copay for Medicare Covered Preventive Services:

Abdominal aortic aneurysm screening
Alcohol misuse screenings & counseling
Bone mass measurements (bone density)
Cardiovascular disease screenings
Cardiovascular disease (behavioral therapy)
Cervical & vaginal cancer screening
Colorectal cancer screenings
Depression screenings
Diabetes screenings
Diabetes self-management training
Glaucoma tests
Hepatitis B (HBV) infection screening
Hepatitis C screening test
HIV screening
Lung cancer screening
Mammograms (screening)
Nutrition therapy services
Obesity screenings & counseling
One-time Welcome to Medicare preventive visit
Prostate cancer screenings(PSA)
Sexually transmitted infections screening & counseling
Shots:
COVID-19 shots
Flu shots
Hepatitis B shots
Pneumococcal shots
Tobacco use cessation
Yearly "Wellness" visit

In-Network:
$0.00 copay for Medicare Covered Preventive Services:

Abdominal aortic aneurysm screening
Alcohol misuse screenings & counseling
Bone mass measurements (bone density)
Cardiovascular disease screenings
Cardiovascular disease (behavioral therapy)
Cervical & vaginal cancer screening
Colorectal cancer screenings
Depression screenings
Diabetes screenings
Diabetes self-management training
Glaucoma tests
Hepatitis B (HBV) infection screening
Hepatitis C screening test
HIV screening
Lung cancer screening
Mammograms (screening)
Nutrition therapy services
Obesity screenings & counseling
One-time Welcome to Medicare preventive visit
Prostate cancer screenings(PSA)
Sexually transmitted infections screening & counseling
Shots:
COVID-19 shots
Flu shots
Hepatitis B shots
Pneumococcal shots
Tobacco use cessation
Yearly "Wellness" visit


Out-of-Network:

Medicare-covered Preventive Services:
Coinsurance for Medicare Covered Medicare-covered Preventive Services 0% to 40%
Prosthetic Devices
In-Network:

Prosthetics/Medical Supplies:
Copayment for Medicare-covered Prosthetic Devices $0
Copayment for Medicare-covered Medical Supplies $0
Prior Authorization Required for Prosthetics/Medical Supplies
In-Network:

Prosthetics/Medical Supplies:
Coinsurance for Medicare-covered Prosthetic Devices 0% or 20%
Coinsurance for Medicare-covered Medical Supplies 0% or 20%
Prior Authorization Required for Prosthetics/Medical Supplies
In-Network:

Prosthetics/Medical Supplies:
Coinsurance for Medicare-covered Prosthetic Devices 0% or 20%
Coinsurance for Medicare-covered Medical Supplies 0% or 20%
Prior Authorization Required for Prosthetics/Medical Supplies

Out-of-Network:

Prosthetics/Medical Supplies Services:
Coinsurance for Medicare Covered Prosthetic Devices 0% or 20%
Coinsurance for Medicare Covered Medical Supplies 0% or 20%
Renal Dialysis
In-Network:

Dialysis Services:
Copayment for Medicare-covered Dialysis Services $0
Prior Authorization Required for Dialysis Services
Referral Required for Dialysis Services
In-Network:

Dialysis Services:
Coinsurance for Medicare-covered Dialysis Services 0% or 20%
Prior Authorization Required for Dialysis Services
Referral Required for Dialysis Services
In-Network:

Dialysis Services:
Coinsurance for Medicare-covered Dialysis Services 0% or 20%
Prior Authorization Required for Dialysis Services

Out-of-Network:

Dialysis Services:
Coinsurance for Medicare Covered Dialysis Services 0% or 20%
Transportation
$0 copay for 72 one-way rides to or from doctor visits or the pharmacy to get prescriptions
$0 copay for 36 one-way rides to or from doctor visits or the pharmacy to get prescriptions
$0 copay for 36 one-way rides to or from doctor visits or the pharmacy to get prescriptions.
Urgently Needed Care

Urgent Care:
Copayment for Urgent Care $0

Note: $0 copayment applies to Medicare covered telehealth. The higher cost share applies to all other Medicare covered services.

Worldwide Coverage:
Copayment for Worldwide Urgent Coverage $0

Urgent Care:
Copayment for Urgent Care $0 to $40

Note: $0 copayment applies to Medicare covered telehealth. The higher cost share applies to all other Medicare covered services.

Worldwide Coverage:
Copayment for Worldwide Urgent Coverage $0

Urgent Care:
Copayment for Urgent Care $0 to $40

Note: $0 copayment applies to Medicare covered telehealth. The higher cost share applies to all other Medicare covered services.

Worldwide Coverage:
Copayment for Worldwide Urgent Coverage $0
Vision Services
Routine Eye Exam: $0 copay 1 per year
Routine Eyewear: $0 copay for standard prescription lenses
$400 allowance every year for 1 pair of lenses/frames or contacts.
Routine Eye Exam: $0 copay 1 per year
Routine Eyewear: $0 copay for standard prescription lenses
$300 allowance every year for 1 pair of lenses/frames or contacts.
Routine Eye Exam: $0 copay 1 per year
Routine Eyewear: $0 copay for standard prescription lenses
$250 allowance every year for 1 pair of lenses/frames or contacts.
Out-of-Network:

Eye Exams Services:
Coinsurance for Medicare Covered Eye Exams 0% or 30%
Coinsurance for Medicare Covered Eyewear 0% or 40%
Inpatient care  
Inpatient Hospital Care
In-Network:

Acute Hospital Services:
Copayment for Acute Hospital Services per Stay $0
Prior Authorization Required for Acute Hospital Services
Referral Required for Acute Hospital Services
Note: All inpatient substance abuse and mental health care (including both care received in an acute care facility and a Medicare-certified psychiatric facility) are included in category 1b.
In-Network:

Acute Hospital Services:
Copayment for Acute Hospital Services per Stay $0 or $1835
Prior Authorization Required for Acute Hospital Services
Referral Required for Acute Hospital Services
Note: All inpatient substance abuse and mental health care (including both care received in an acute care facility and a Medicare-certified psychiatric facility) are included in category 1b.
In-Network:

Acute Hospital Services:
Copayment for Acute Hospital Services per Stay $0 or $1905
Prior Authorization Required for Acute Hospital Services
Note: All inpatient substance abuse and mental health care (including both care received in an acute care facility and a Medicare-certified psychiatric facility) are included in category 1b.

Out-of-Network:

Acute Hospital Services:
Copayment for Acute Hospital Services per Stay $0 or $1905
Note: All inpatient substance abuse and mental health care (including both care received in an acute care facility and a Medicare-certified psychiatric facility) are included in category 1b.
Inpatient Mental Health Care
In-Network:

Psychiatric Hospital Services:
Copayment for Psychiatric Hospital Services per Stay $0
Prior Authorization Required for Psychiatric Hospital Services
Benefit Details - General Note - NOTE ON INPATIENT SUBSTANCE ABUSE: All inpatient substance abuse and mental health care (including both care received in an acute care facility and a Medicare-certified psychiatric facility) are included in category 1b.
In-Network:

Psychiatric Hospital Services:
Copayment for Psychiatric Hospital Services per Stay $0 or $1835
Prior Authorization Required for Psychiatric Hospital Services
Benefit Details - General Note - NOTE ON INPATIENT SUBSTANCE ABUSE: All inpatient substance abuse and mental health care (including both care received in an acute care facility and a Medicare-certified psychiatric facility) are included in category 1b.
In-Network:

Psychiatric Hospital Services:
Copayment for Psychiatric Hospital Services per Stay $0 or $1905
Prior Authorization Required for Psychiatric Hospital Services
Benefit Details - General Note - NOTE ON INPATIENT SUBSTANCE ABUSE: All inpatient substance abuse and mental health care (including both care received in an acute care facility and a Medicare-certified psychiatric facility) are included in category 1b.

Out-of-Network:

Psychiatric Hospital Services:
Copayment for Psychiatric Hospital per Stay $0 or $1905
Benefit Details - General Note - NOTE ON INPATIENT SUBSTANCE ABUSE: All inpatient substance abuse and mental health care (including both care received in an acute care facility and a Medicare-certified psychiatric facility) are included in category 1b.
Skilled Nursing Facility (SNF)
In-Network:

Skilled Nursing Facility Services:
Copayment for Skilled Nursing Facility Services per Stay $0
Prior Authorization Required for Skilled Nursing Facility Services
Referral Required for Skilled Nursing Facility Services
In-Network:

Skilled Nursing Facility Services:
Copayment for Skilled Nursing Facility Services per Stay $0
Prior Authorization Required for Skilled Nursing Facility Services
Referral Required for Skilled Nursing Facility Services
In-Network:

Skilled Nursing Facility Services:
Copayment for Skilled Nursing Facility Services per Stay $0
Prior Authorization Required for Skilled Nursing Facility Services

Plan documents
Links to plan documents
Plan notes
Dual-Eligible Special Needs Plans
Refer to the Summary of Benefits for prescription drug cost information.
Refer to the Summary of Benefits for prescription drug cost information.
Refer to the Summary of Benefits for prescription drug cost information.
`;

const SYSTEM_PROMPT = `
You are a highly skilled Forensic Medicare Auditor. 
Your goal is to analyze the "Raw Data" input (which contains 3 columns of Medicare plan details) 
and return a JSON object with a verdict ("STAY" or "SWITCH") and a detailed comparison.
`;

async function verifyFix() {
    console.log("Testing Gemini API with MASSIVE user payload...");

    try {
        const result = await model.generateContent([SYSTEM_PROMPT, userPrompt]);
        const response = await result.response;

        console.log("Finish Reason:", response.candidates?.[0]?.finishReason);
        console.log("Safety Ratings:", JSON.stringify(response.candidates?.[0]?.safetyRatings, null, 2));

        const text = response.text();
        console.log("Gemini Raw Output Length:", text.length);
        console.log("Gemini Raw Output Preview:", text.substring(0, 500));

        // Extraction Logic
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        if (start === -1 || end === -1) {
            throw new Error("No JSON object found in response");
        }
        const jsonString = text.substring(start, end + 1);
        const parsed = JSON.parse(jsonString);
        console.log("SUCCESS! Parsed JSON Verdict:", parsed.verdict);

    } catch (error) {
        console.error("FAILED:", error.message);
        console.error("Full Error:", error);
    }
}

verifyFix();
