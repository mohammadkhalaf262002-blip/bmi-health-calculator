import React, { useState, useEffect } from 'react';
import { Activity, AlertCircle, TrendingUp, Scale, Calendar, Heart, Target, History, Save } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('calculator');

  const bmiCategories = [
    { name: 'Underweight', range: '< 18.5', color: 'bg-blue-500', min: 0, max: 18.5, risks: ['Malnutrition', 'Weakened immune system', 'Osteoporosis', 'Anemia'] },
    { name: 'Normal Weight', range: '18.5 - 24.9', color: 'bg-green-500', min: 18.5, max: 24.9, risks: ['Lowest health risk', 'Optimal metabolic function'] },
    { name: 'Overweight', range: '25 - 29.9', color: 'bg-yellow-500', min: 25, max: 29.9, risks: ['Increased cardiovascular risk', 'Type 2 diabetes risk', 'Hypertension', 'Sleep apnea'] },
    { name: 'Obese Class I', range: '30 - 34.9', color: 'bg-orange-500', min: 30, max: 34.9, risks: ['High cardiovascular risk', 'Type 2 diabetes', 'Hypertension', 'Joint problems', 'Metabolic syndrome'] },
    { name: 'Obese Class II', range: '35 - 39.9', color: 'bg-red-500', min: 35, max: 39.9, risks: ['Very high cardiovascular risk', 'Severe metabolic complications', 'Limited mobility', 'Reduced quality of life'] },
    { name: 'Obese Class III', range: '≥ 40', color: 'bg-red-700', min: 40, max: 100, risks: ['Extremely high health risk', 'Severe chronic conditions', 'Significantly reduced life expectancy'] }
  ];

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const result = await window.storage.get('bmi-history');
      if (result) {
        setHistory(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('No history found');
    }
  };

  const saveToHistory = async () => {
    if (!bmi || !category) return;

    const entry = {
      date: new Date().toISOString(),
      bmi: parseFloat(bmi),
      weight: parseFloat(weight),
      category: category.name,
      age: parseInt(age),
      gender
    };

    const newHistory = [...history, entry];
    setHistory(newHistory);

    try {
      await window.storage.set('bmi-history', JSON.stringify(newHistory));
      alert('Data saved to history!');
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  };

  const calculateBMI = () => {
    if (!height || !weight) return;

    let heightInMeters = parseFloat(height);
    let weightInKg = parseFloat(weight);

    if (heightUnit === 'ft') {
      heightInMeters = heightInMeters * 0.3048;
    } else if (heightUnit === 'in') {
      heightInMeters = heightInMeters * 0.0254;
    } else {
      heightInMeters = heightInMeters / 100;
    }

    if (weightUnit === 'lbs') {
      weightInKg = weightInKg * 0.453592;
    }

    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
    setBMI(calculatedBMI.toFixed(1));

    const foundCategory = bmiCategories.find(cat => 
      calculatedBMI >= cat.min && calculatedBMI < cat.max
    );
    setCategory(foundCategory);
  };

  useEffect(() => {
    calculateBMI();
  }, [height, weight, heightUnit, weightUnit]);

  const getBMIPosition = () => {
    if (!bmi) return 0;
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 15) return 0;
    if (bmiValue > 40) return 100;
    return ((bmiValue - 15) / 25) * 100;
  };

  const getMetabolicRisk = () => {
    if (!bmi) return null;

    const risks = [];
    const riskLevel = { level: 'Low', color: 'text-green-600' };
    const bmiValue = parseFloat(bmi);

    if (bmiValue >= 30) {
      risks.push('High risk of metabolic syndrome');
      risks.push('Increased risk of type 2 diabetes');
      risks.push('Elevated cardiovascular disease risk');
      risks.push('Increased risk of certain cancers');
      riskLevel.level = 'High';
      riskLevel.color = 'text-red-600';
    } else if (bmiValue >= 25) {
      risks.push('Moderate metabolic risk');
      risks.push('Increased cardiovascular risk');
      risks.push('Monitor for metabolic changes');
      riskLevel.level = 'Moderate';
      riskLevel.color = 'text-yellow-600';
    } else if (bmiValue < 18.5) {
      risks.push('Risk of nutritional deficiencies');
      risks.push('Weakened immune system');
      risks.push('Reduced bone density risk');
      riskLevel.level = 'Elevated';
      riskLevel.color = 'text-orange-600';
    } else {
      risks.push('Low metabolic disease risk');
      risks.push('Healthy weight range');
      risks.push('Optimal cardiovascular health markers');
    }

    return { ...riskLevel, risks };
  };

  const getPersonalizedRecommendations = () => {
    if (!bmi || !age) return [];
    const recommendations = [];
    const bmiValue = parseFloat(bmi);
    const ageNum = parseInt(age);

    if (bmiValue < 18.5) {
      recommendations.push({
        title: 'Increase Caloric Intake',
        description: 'Focus on nutrient-dense foods with higher calories. Aim for 300-500 extra calories per day.',
        icon: '🍽️'
      });
      recommendations.push({
        title: 'Strength Training',
        description: 'Build muscle mass through resistance exercises 3-4 times per week.',
        icon: '💪'
      });
      recommendations.push({
        title: 'Medical Consultation',
        description: 'Consult a healthcare provider to rule out underlying conditions causing low weight.',
        icon: '👨‍⚕️'
      });
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      recommendations.push({
        title: 'Maintain Current Weight',
        description: 'Continue your current healthy lifestyle. Focus on balanced nutrition and regular exercise.',
        icon: '✅'
      });
      recommendations.push({
        title: 'Regular Exercise',
        description: '150 minutes of moderate aerobic activity or 75 minutes of vigorous activity weekly.',
        icon: '🏃'
      });
      if (ageNum > 40) {
        recommendations.push({
          title: 'Bone Health',
          description: 'Include weight-bearing exercises and ensure adequate calcium and vitamin D intake.',
          icon: '🦴'
        });
      }
      recommendations.push({
        title: 'Preventive Care',
        description: 'Regular health screenings and maintain healthy lifestyle habits.',
        icon: '🩺'
      });
    } else if (bmiValue >= 25 && bmiValue < 30) {
      recommendations.push({
        title: 'Weight Management',
        description: 'Aim for gradual weight loss of 0.5-1 kg per week through caloric deficit of 500 calories/day.',
        icon: '📉'
      });
      recommendations.push({
        title: 'Increase Physical Activity',
        description: 'Target 200-300 minutes of moderate activity weekly for weight management.',
        icon: '🚴'
      });
      recommendations.push({
        title: 'Dietary Modifications',
        description: 'Reduce processed foods, increase vegetables, lean proteins, and whole grains.',
        icon: '🥗'
      });
      recommendations.push({
        title: 'Monitor Progress',
        description: 'Track weight weekly and measure waist circumference monthly.',
        icon: '📊'
      });
    } else {
      recommendations.push({
        title: 'Medical Supervision',
        description: 'Consult healthcare providers for comprehensive weight management plan and metabolic screening.',
        icon: '🏥'
      });
      recommendations.push({
        title: 'Structured Exercise Program',
        description: 'Begin with low-impact activities like walking or swimming. Gradually increase intensity.',
        icon: '🏊'
      });
      recommendations.push({
        title: 'Behavioral Support',
        description: 'Consider working with a registered dietitian and behavioral therapist for sustainable changes.',
        icon: '🧠'
      });
      recommendations.push({
        title: 'Set Realistic Goals',
        description: 'Aim for 5-10% weight loss initially. Small changes lead to significant health improvements.',
        icon: '🎯'
      });
    }

    if (ageNum > 50) {
      recommendations.push({
        title: 'Age-Specific Screening',
        description: 'Regular cardiovascular and metabolic screening is important at your age.',
        icon: '🩺'
      });
    }

    return recommendations;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const metabolicRisk = getMetabolicRisk();
  const recommendations = getPersonalizedRecommendations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Advanced BMI Health Calculator</h1>
          </div>

          <div className="flex gap-2 mb-6 border-b">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === 'calculator'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              Calculator
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 font-semibold transition-colors flex items-center gap-2 ${
                activeTab === 'history'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <History className="w-4 h-4" />
              History
            </button>
          </div>

          {activeTab === 'calculator' && (
            <>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    placeholder="Enter age"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Height</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                      placeholder="Height"
                    />
                    <select
                      value={heightUnit}
                      onChange={(e) => setHeightUnit(e.target.value)}
                      className="px-3 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="cm">cm</option>
                      <option value="ft">ft</option>
                      <option value="in">in</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Weight</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                      placeholder="Weight"
                    />
                    <select
                      value={weightUnit}
                      onChange={(e) => setWeightUnit(e.target.value)}
                      className="px-3 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </select>
                  </div>
                </div>
              </div>

              {bmi && category && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm opacity-90 mb-1">Body Mass Index</p>
                        <p className="text-5xl font-bold">{bmi}</p>
                      </div>
                      <Scale className="w-16 h-16 opacity-80" />
                    </div>
                    <div className="pt-4 border-t border-white/20">
                      <p className="text-lg font-semibold">{category.name}</p>
                      <p className="text-sm opacity-90">Range: {category.range} kg/m²</p>
                      {age && (
                        <p className="text-xs opacity-75 mt-2">
                          {gender === 'male' ? '👨' : '👩'} {age} years old
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={saveToHistory}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    Save to History
                  </button>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                      BMI Scale Visualization
                    </h3>
                    <div className="relative h-12 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div className="absolute inset-0 flex">
                        {bmiCategories.map((cat, idx) => (
                          <div
                            key={idx}
                            className={`${cat.color} flex-1`}
                            style={{ width: `${100 / bmiCategories.length}%` }}
                          />
                        ))}
                      </div>
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-black shadow-lg transition-all duration-300"
                        style={{ left: `${getBMIPosition()}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                          {bmi}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>15</span>
                      <span>20</span>
                      <span>25</span>
                      <span>30</span>
                      <span>35</span>
                      <span>40</span>
                    </div>
                  </div>

                  {metabolicRisk && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-indigo-600" />
                        Metabolic Risk Assessment
                      </h3>
                      <div className="mb-4">
                        <span className="text-sm text-gray-600">Overall Risk Level: </span>
                        <span className={`text-lg font-bold ${metabolicRisk.color}`}>
                          {metabolicRisk.level}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {metabolicRisk.risks.map((risk, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              metabolicRisk.level === 'High' ? 'bg-red-600' :
                              metabolicRisk.level === 'Elevated' ? 'bg-orange-600' :
                              metabolicRisk.level === 'Moderate' ? 'bg-yellow-600' :
                              'bg-green-600'
                            }`} />
                            <p className="text-gray-700">{risk}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {recommendations.length > 0 && (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-600" />
                        Personalized Health Recommendations
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {recommendations.map((rec, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-start gap-3">
                              <span className="text-2xl">{rec.icon}</span>
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-1">{rec.title}</h4>
                                <p className="text-sm text-gray-600">{rec.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-indigo-600" />
                      Health Risk Factors
                    </h3>
                    <div className="space-y-2">
                      {category.risks.map((risk, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className={`w-2 h-2 rounded-full ${category.color} mt-2`} />
                          <p className="text-gray-700">{risk}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No history data yet. Save your measurements to track progress!</p>
                </div>
              ) : (
                <>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">BMI Trend Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={history.map((h, i) => ({ ...h, index: i + 1, date: formatDate(h.date) }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[15, 40]} />
                        <Tooltip />
                        <Legend />
                        <ReferenceLine y={18.5} stroke="#3b82f6" strokeDasharray="3 3" label="Underweight" />
                        <ReferenceLine y={25} stroke="#22c55e" strokeDasharray="3 3" label="Normal" />
                        <ReferenceLine y={30} stroke="#f59e0b" strokeDasharray="3 3" label="Obese" />
                        <Line type="monotone" dataKey="bmi" stroke="#6366f1" strokeWidth={3} name="BMI" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">History Log</h3>
                    <div className="space-y-3">
                      {[...history].reverse().map((entry, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-800">
                              {new Date(entry.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                            <p className="text-sm text-gray-600">
                              BMI: {entry.bmi} • Weight: {entry.weight} kg
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            entry.category === 'Normal Weight' ? 'bg-green-100 text-green-700' :
                            entry.category === 'Underweight' ? 'bg-blue-100 text-blue-700' :
                            entry.category === 'Overweight' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {entry.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Medical Disclaimer:</strong> This calculator is for educational purposes only and should not replace professional medical advice. BMI does not account for muscle mass, bone density, body composition, or overall health. Always consult healthcare professionals for comprehensive health assessments.
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>Built with React & Recharts • Data persists across sessions • WHO BMI Classification</p>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
