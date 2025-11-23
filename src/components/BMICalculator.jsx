import React, { useState, useEffect } from 'react';
import { Activity, AlertCircle, TrendingUp, Scale, Heart, Target, History, Save } from 'lucide-react';
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

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)',
      padding: '24px',
    },
    card: {
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      marginBottom: '24px',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '24px',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1F2937',
    },
    tabContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      borderBottom: '2px solid #E5E7EB',
    },
    tab: (active) => ({
      padding: '8px 16px',
      fontWeight: '600',
      cursor: 'pointer',
      color: active ? '#4F46E5' : '#6B7280',
      borderBottom: active ? '2px solid #4F46E5' : 'none',
      marginBottom: '-2px',
      background: 'none',
      border: 'none',
      fontSize: '16px',
    }),
    inputGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '24px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '2px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: '16px',
      outline: 'none',
      boxSizing: 'border-box',
    },
    select: {
      padding: '12px',
      border: '2px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: '16px',
      outline: 'none',
      cursor: 'pointer',
    },
    flexInput: {
      display: 'flex',
      gap: '8px',
    },
    bmiCard: {
      background: 'linear-gradient(135deg, #6366F1 0%, #9333EA 100%)',
      borderRadius: '12px',
      padding: '24px',
      color: 'white',
      marginBottom: '24px',
    },
    bmiDisplay: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    },
    bmiNumber: {
      fontSize: '60px',
      fontWeight: 'bold',
    },
    button: {
      width: '100%',
      backgroundColor: '#4F46E5',
      color: 'white',
      fontWeight: '600',
      padding: '12px 24px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      marginBottom: '24px',
    },
    sectionCard: {
      backgroundColor: '#F9FAFB',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '24px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1F2937',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px',
    },
    riskItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
      marginBottom: '8px',
    },
    recommendationGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '16px',
    },
    recommendationCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    disclaimer: {
      backgroundColor: '#FEF3C7',
      border: '1px solid #FCD34D',
      borderRadius: '8px',
      padding: '16px',
      marginTop: '32px',
    },
    scale: {
      position: 'relative',
      height: '48px',
      backgroundColor: '#E5E7EB',
      borderRadius: '24px',
      overflow: 'hidden',
      marginBottom: '8px',
    },
    scaleInner: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
    },
    scaleMarker: (position) => ({
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '4px',
      backgroundColor: 'black',
      left: `${position}%`,
      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    }),
    scaleLabel: (position) => ({
      position: 'absolute',
      top: '-32px',
      left: `${position}%`,
      transform: 'translateX(-50%)',
      backgroundColor: 'black',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
    }),
  };

  const bmiCategories = [
    { name: 'Underweight', range: '< 18.5', color: '#3B82F6', min: 0, max: 18.5, risks: ['Malnutrition', 'Weakened immune system', 'Osteoporosis', 'Anemia'] },
    { name: 'Normal Weight', range: '18.5 - 24.9', color: '#22C55E', min: 18.5, max: 24.9, risks: ['Lowest health risk', 'Optimal metabolic function'] },
    { name: 'Overweight', range: '25 - 29.9', color: '#EAB308', min: 25, max: 29.9, risks: ['Increased cardiovascular risk', 'Type 2 diabetes risk', 'Hypertension', 'Sleep apnea'] },
    { name: 'Obese Class I', range: '30 - 34.9', color: '#F97316', min: 30, max: 34.9, risks: ['High cardiovascular risk', 'Type 2 diabetes', 'Hypertension', 'Joint problems', 'Metabolic syndrome'] },
    { name: 'Obese Class II', range: '35 - 39.9', color: '#EF4444', min: 35, max: 39.9, risks: ['Very high cardiovascular risk', 'Severe metabolic complications', 'Limited mobility', 'Reduced quality of life'] },
    { name: 'Obese Class III', range: '≥ 40', color: '#B91C1C', min: 40, max: 100, risks: ['Extremely high health risk', 'Severe chronic conditions', 'Significantly reduced life expectancy'] }
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
    const riskLevel = { level: 'Low', color: '#22C55E' };
    const bmiValue = parseFloat(bmi);

    if (bmiValue >= 30) {
      risks.push('High risk of metabolic syndrome');
      risks.push('Increased risk of type 2 diabetes');
      risks.push('Elevated cardiovascular disease risk');
      risks.push('Increased risk of certain cancers');
      riskLevel.level = 'High';
      riskLevel.color = '#EF4444';
    } else if (bmiValue >= 25) {
      risks.push('Moderate metabolic risk');
      risks.push('Increased cardiovascular risk');
      risks.push('Monitor for metabolic changes');
      riskLevel.level = 'Moderate';
      riskLevel.color = '#EAB308';
    } else if (bmiValue < 18.5) {
      risks.push('Risk of nutritional deficiencies');
      risks.push('Weakened immune system');
      risks.push('Reduced bone density risk');
      riskLevel.level = 'Elevated';
      riskLevel.color = '#F97316';
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
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <Activity size={32} color="#4F46E5" />
          <h1 style={styles.title}>Advanced BMI Health Calculator</h1>
        </div>

        <div style={styles.tabContainer}>
          <button style={styles.tab(activeTab === 'calculator')} onClick={() => setActiveTab('calculator')}>
            Calculator
          </button>
          <button style={styles.tab(activeTab === 'history')} onClick={() => setActiveTab('history')}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <History size={16} />
              History
            </div>
          </button>
        </div>

        {activeTab === 'calculator' && (
          <>
            <div style={styles.inputGrid}>
              <div>
                <label style={styles.label}>Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  style={styles.input}
                  placeholder="Enter age"
                />
              </div>

              <div>
                <label style={styles.label}>Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{...styles.input, ...styles.select}}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label style={styles.label}>Height</label>
                <div style={styles.flexInput}>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    style={{...styles.input, flex: 1}}
                    placeholder="Height"
                  />
                  <select
                    value={heightUnit}
                    onChange={(e) => setHeightUnit(e.target.value)}
                    style={styles.select}
                  >
                    <option value="cm">cm</option>
                    <option value="ft">ft</option>
                    <option value="in">in</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={styles.label}>Weight</label>
                <div style={styles.flexInput}>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    style={{...styles.input, flex: 1}}
                    placeholder="Weight"
                  />
                  <select
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value)}
                    style={styles.select}
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>
            </div>

            {bmi && category && (
              <div>
                <div style={styles.bmiCard}>
                  <div style={styles.bmiDisplay}>
                    <div>
                      <p style={{fontSize: '14px', opacity: 0.9, marginBottom: '4px'}}>Body Mass Index</p>
                      <p style={styles.bmiNumber}>{bmi}</p>
                    </div>
                    <Scale size={64} style={{opacity: 0.8}} />
                  </div>
                  <div style={{paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.2)'}}>
                    <p style={{fontSize: '18px', fontWeight: '600'}}>{category.name}</p>
                    <p style={{fontSize: '14px', opacity: 0.9}}>Range: {category.range} kg/m²</p>
                    {age && (
                      <p style={{fontSize: '12px', opacity: 0.75, marginTop: '8px'}}>
                        {gender === 'male' ? '👨' : '👩'} {age} years old
                      </p>
                    )}
                  </div>
                </div>

                <button style={styles.button} onClick={saveToHistory}>
                  <Save size={20} />
                  Save to History
                </button>

                <div style={{marginBottom: '24px'}}>
                  <h3 style={styles.sectionTitle}>
                    <TrendingUp size={20} color="#4F46E5" />
                    BMI Scale Visualization
                  </h3>
                  <div style={styles.scale}>
                    <div style={styles.scaleInner}>
                      {bmiCategories.map((cat, idx) => (
                        <div
                          key={idx}
                          style={{
                            backgroundColor: cat.color,
                            flex: 1,
                          }}
                        />
                      ))}
                    </div>
                    <div style={styles.scaleMarker(getBMIPosition())}>
                      <div style={styles.scaleLabel(getBMIPosition())}>{bmi}</div>
                    </div>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6B7280'}}>
                    <span>15</span>
                    <span>20</span>
                    <span>25</span>
                    <span>30</span>
                    <span>35</span>
                    <span>40</span>
                  </div>
                </div>

                {metabolicRisk && (
                  <div style={styles.sectionCard}>
                    <h3 style={styles.sectionTitle}>
                      <Heart size={20} color="#4F46E5" />
                      Metabolic Risk Assessment
                    </h3>
                    <div style={{marginBottom: '16px'}}>
                      <span style={{fontSize: '14px', color: '#6B7280'}}>Overall Risk Level: </span>
                      <span style={{fontSize: '18px', fontWeight: 'bold', color: metabolicRisk.color}}>
                        {metabolicRisk.level}
                      </span>
                    </div>
                    <div>
                      {metabolicRisk.risks.map((risk, idx) => (
                        <div key={idx} style={styles.riskItem}>
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: metabolicRisk.color,
                            marginTop: '6px',
                          }} />
                          <p style={{color: '#374151', margin: 0}}>{risk}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {recommendations.length > 0 && (
                  <div style={{...styles.sectionCard, background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)'}}>
                    <h3 style={styles.sectionTitle}>
                      <Target size={20} color="#22C55E" />
                      Personalized Health Recommendations
                    </h3>
                    <div style={styles.recommendationGrid}>
                      {recommendations.map((rec, idx) => (
                        <div key={idx} style={styles.recommendationCard}>
                          <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px'}}>
                            <span style={{fontSize: '32px'}}>{rec.icon}</span>
                            <div>
                              <h4 style={{fontWeight: '600', color: '#1F2937', marginBottom: '4px', marginTop: 0}}>{rec.title}</h4>
                              <p style={{fontSize: '14px', color: '#6B7280', margin: 0}}>{rec.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={styles.sectionCard}>
                  <h3 style={styles.sectionTitle}>
                    <AlertCircle size={20} color="#4F46E5" />
                    Health Risk Factors
                  </h3>
                  <div>
                    {category.risks.map((risk, idx) => (
                      <div key={idx} style={styles.riskItem}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: category.color,
                          marginTop: '6px',
                        }} />
                        <p style={{color: '#374151', margin: 0}}>{risk}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'history' && (
          <div>
            {history.length === 0 ? (
              <div style={{textAlign: 'center', padding: '48px 0'}}>
                <History size={64} color="#D1D5DB" style={{margin: '0 auto 16px'}} />
                <p style={{color: '#6B7280'}}>No history data yet. Save your measurements to track progress!</p>
              </div>
            ) : (
              <>
                <div style={styles.sectionCard}>
                  <h3 style={{...styles.sectionTitle, marginBottom: '16px'}}>BMI Trend Over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={history.map((h, i) => ({ ...h, index: i + 1, date: formatDate(h.date) }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[15, 40]} />
                      <Tooltip />
                      <Legend />
                      <ReferenceLine y={18.5} stroke="#3B82F6" strokeDasharray="3 3" label="Underweight" />
                      <ReferenceLine y={25} stroke="#22C55E" strokeDasharray="3 3" label="Normal" />
                      <ReferenceLine y={30} stroke="#F97316" strokeDasharray="3 3" label="Obese" />
                      <Line type="monotone" dataKey="bmi" stroke="#6366F1" strokeWidth={3} name="BMI" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div style={styles.sectionCard}>
                  <h3 style={{...styles.sectionTitle, marginBottom: '16px'}}>History Log</h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    {[...history].reverse().map((entry, idx) => (
                      <div key={idx} style={{...styles.recommendationCard, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div>
                          <p style={{fontWeight: '600', color: '#1F2937', margin: '0 0 4px 0'}}>
                            {new Date(entry.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                          <p style={{fontSize: '14px', color: '#6B7280', margin: 0}}>
                            BMI: {entry.bmi} • Weight: {entry.weight} kg
                          </p>
                        </div>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '16px',
                          fontSize: '14px',
                          fontWeight: '600',
                          backgroundColor: entry.category === 'Normal Weight' ? '#D1FAE5' :
                            entry.category === 'Underweight' ? '#DBEAFE' :
                            entry.category === 'Overweight' ? '#FEF3C7' : '#FEE2E2',
                          color: entry.category === 'Normal Weight' ? '#065F46' :
                            entry.category === 'Underweight' ? '#1E40AF' :
                            entry.category === 'Overweight' ? '#92400E' : '#991B1B',
                        }}>
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

        <div style={styles.disclaimer}>
          <p style={{fontSize: '14px', color: '#92400E', margin: 0}}>
            <strong>Medical Disclaimer:</strong> This calculator is for educational purposes only and should not replace professional medical advice. BMI does not account for muscle mass, bone density, body composition, or overall health. Always consult healthcare professionals for comprehensive health assessments.
          </p>
        </div>
      </div>

      <div style={{textAlign: 'center', fontSize: '14px', color: '#6B7280'}}>
        <p>Built with React & Recharts • Data persists across sessions • WHO BMI Classification</p>
      </div>
    </div>
  );
};

export default BMICalculator;
