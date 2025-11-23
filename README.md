# 🏥 Advanced BMI Health Calculator

A comprehensive health assessment tool that calculates Body Mass Index (BMI) with age and gender-specific interpretations, metabolic risk assessment, and personalized health recommendations.

![BMI Calculator Demo](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.x-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Features

### Core Functionality
- **Real-time BMI Calculation** - Instant BMI computation with metric and imperial units
- **Age & Gender-Specific Analysis** - Personalized health interpretations based on demographics
- **Visual BMI Scale** - Interactive color-coded scale showing BMI position across categories
- **Historical Tracking** - Track BMI progress over time with trend visualization

### Health Assessment
- **Metabolic Risk Analysis** - Comprehensive risk stratification based on WHO/NIH guidelines
- **Personalized Recommendations** - Age and BMI-specific health guidance
- **Health Risk Factors** - Detailed breakdown of category-specific health risks
- **Clinical Classifications** - WHO BMI categories (Underweight → Obese Class III)

### Technical Features
- **Persistent Storage** - Data saved across browser sessions
- **Data Visualization** - Interactive charts using Recharts library
- **Responsive Design** - Mobile-first, works on all devices
- **Modern UI/UX** - Clean interface with Tailwind CSS

## 🎯 Use Cases

- **Patient Education** - Help individuals understand their BMI and health risks
- **Health Tracking** - Monitor weight management progress over time
- **Clinical Reference** - Quick BMI calculation tool for healthcare settings
- **Portfolio Project** - Demonstrates biomedical computing and data visualization skills

## 🛠️ Technologies Used

- **React** - Frontend framework
- **Recharts** - Data visualization library
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **Browser Storage API** - Persistent data storage

## 📊 Technical Highlights

### BMI Calculation Formula
```
BMI = weight (kg) / height (m)²
```

### BMI Categories (WHO Classification)
| Category | BMI Range | Risk Level |
|----------|-----------|------------|
| Underweight | < 18.5 | Nutritional deficiency risk |
| Normal Weight | 18.5 - 24.9 | Lowest health risk |
| Overweight | 25 - 29.9 | Increased cardiovascular risk |
| Obese Class I | 30 - 34.9 | High health risk |
| Obese Class II | 35 - 39.9 | Very high health risk |
| Obese Class III | ≥ 40 | Extremely high health risk |

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/bmi-health-calculator.git
cd bmi-health-calculator
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure
```
bmi-health-calculator/
├── src/
│   ├── components/
│   │   └── BMICalculator.jsx
│   ├── App.js
│   └── index.js
├── public/
├── package.json
└── README.md
```

## 💡 How It Works

1. **User Input** - Enter age, gender, height, and weight
2. **BMI Calculation** - Automatic calculation using validated formula
3. **Risk Assessment** - AI-powered analysis based on clinical guidelines
4. **Recommendations** - Personalized health advice based on results
5. **History Tracking** - Save and visualize progress over time

## 🎓 Clinical Validation

This calculator uses:
- **WHO BMI Classification** - International standard for BMI categories
- **NIH Guidelines** - Metabolic risk assessment criteria
- **Age-specific Adjustments** - Recommendations tailored to age groups
- **Evidence-based Recommendations** - Based on current medical literature

## ⚠️ Medical Disclaimer

This calculator is for **educational and informational purposes only**. It should not replace professional medical advice, diagnosis, or treatment. BMI is a screening tool and has limitations:
- Does not account for muscle mass
- Does not measure body fat distribution
- May not be accurate for athletes, elderly, or certain populations
- Should be used alongside other health metrics

Always consult qualified healthcare professionals for comprehensive health assessments.

## 🔮 Future Enhancements

- [ ] Multi-language support
- [ ] Waist-to-hip ratio calculation
- [ ] Body fat percentage estimation
- [ ] Export data to PDF/CSV
- [ ] Integration with fitness trackers
- [ ] Nutritional recommendations
- [ ] Exercise plan generator
- [ ] Social sharing features

## 📈 Project Goals

This project demonstrates:
- Implementation of clinical algorithms in software
- Health data visualization best practices
- User-centered design for health applications
- Understanding of biomedical concepts and public health guidelines
- Full-stack development skills (React, data persistence, charting)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Mohammad Khalaf**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [yourwebsite.com](https://yourwebsite.com)

## 🙏 Acknowledgments

- WHO for BMI classification guidelines
- NIH for metabolic health criteria
- React and Recharts communities
- All contributors and users of this tool

## 📞 Contact

For questions, suggestions, or collaboration opportunities:
- Open an issue on GitHub
- Connect on LinkedIn
- Email: 21bmed1028@isik.edu.tr

---

⭐ If you find this project helpful, please consider giving it a star!

**Built with ❤️ for better health awareness**
