import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { MealOption } from '../types';
import { fetchNutritionFromQuery } from '../utils/nutritionApi';
import { getGroqApiKey, setGroqApiKey } from '../utils/groqKey';
import { styles } from '../styles';

interface MealPickerModalProps {
  visible: boolean;
  pendingId: string | null;
  options: MealOption[];
  onSelect: (id: string, option: MealOption) => void;
  onClose: () => void;
}

export const MealPickerModal: React.FC<MealPickerModalProps> = ({
  visible, pendingId, options, onSelect, onClose,
}) => {
  const [customQuery, setCustomQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchedOption, setFetchedOption] = useState<MealOption | null>(null);
  const [manualCal, setManualCal] = useState('');
  const [manualProtein, setManualProtein] = useState('');
  const [manualCarbs, setManualCarbs] = useState('');
  const [manualFats, setManualFats] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  useEffect(() => {
    if (visible) getGroqApiKey().then(k => setApiKey(k));
  }, [visible]);

  const resetCustom = () => {
    setCustomQuery('');
    setFetchedOption(null);
    setManualCal('');
    setManualProtein('');
    setManualCarbs('');
    setManualFats('');
    setShowManual(false);
  };

  const handleClose = () => {
    resetCustom();
    onClose();
  };

  const handleSaveApiKey = async () => {
    const k = apiKeyInput.trim();
    if (!k) return;
    await setGroqApiKey(k);
    setApiKey(k);
    setApiKeyInput('');
    setShowKeyInput(false);
  };

  const handleFetchMacros = async () => {
    const query = customQuery.trim();
    if (!query) return;

    const key = apiKey ?? (await getGroqApiKey());
    if (key) {
      setLoading(true);
      setFetchedOption(null);
      try {
        const result = await fetchNutritionFromQuery(query, key);
        if (result && result.macros.calories > 0) {
          setFetchedOption({ label: result.label, macros: result.macros });
        } else {
          setShowManual(true);
          Alert.alert(
            'No results',
            'API returned no nutrition data. Try: "3 eggs and 2 bread" or "1 cup rice and chicken". Enter manually below.'
          );
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        setShowManual(true);
        Alert.alert('Lookup failed', `${msg}\n\nEnter macros manually below.`);
      } finally {
        setLoading(false);
      }
    } else {
      setShowManual(true);
      if (!showKeyInput) setShowKeyInput(true);
    }
  };

  const handleAddManual = () => {
    const cal = parseInt(manualCal, 10) || 0;
    const protein = parseInt(manualProtein, 10) || 0;
    const carbs = parseInt(manualCarbs, 10) || 0;
    const fats = parseInt(manualFats, 10) || 0;
    if (cal === 0 && protein === 0 && carbs === 0 && fats === 0) {
      Alert.alert('Enter values', 'Add at least one macro value.');
      return;
    }
    setFetchedOption({
      label: customQuery.trim() || 'Custom meal',
      macros: { calories: cal, protein, carbs, fats },
    });
  };

  const handleSelectCustom = () => {
    if (pendingId && fetchedOption) {
      onSelect(pendingId, fetchedOption);
      handleClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>What did you eat?</Text>
          <Text style={styles.mealPickerSubtitle}>Select or add your meal</Text>
          <View style={styles.modalDivider} />

          <ScrollView style={styles.mealPickerScroll} showsVerticalScrollIndicator={false}>
            <View style={styles.customMealSection}>
              <Text style={styles.customMealLabel}>Add your own meal</Text>
              <TextInput
                style={styles.customMealInput}
                placeholder="e.g. 3 eggs and 2 bread, or 1 cup rice"
                placeholderTextColor="#64748b"
                value={customQuery}
                onChangeText={setCustomQuery}
                editable={!loading}
              />
              <TouchableOpacity
                style={[styles.customMealBtn, loading && { opacity: 0.6 }]}
                onPress={handleFetchMacros}
                disabled={loading || !customQuery.trim()}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.customMealBtnText}>🔍 Look up macros</Text>
                )}
              </TouchableOpacity>
              {(!apiKey || apiKey === '') && (
                <>
                  {showKeyInput ? (
                    <View style={{ marginTop: 8 }}>
                      <Text style={[styles.customMealLabel, { fontSize: 11, color: '#64748b' }]}>Groq API key (free at console.groq.com)</Text>
                      <TextInput
                        style={[styles.customMealInput, { marginTop: 4, fontSize: 12 }]}
                        placeholder="gsk_..."
                        placeholderTextColor="#64748b"
                        value={apiKeyInput}
                        onChangeText={setApiKeyInput}
                        secureTextEntry
                        autoCapitalize="none"
                      />
                      <TouchableOpacity style={[styles.customMealBtn, { marginTop: 6 }]} onPress={handleSaveApiKey} disabled={!apiKeyInput.trim()}>
                        <Text style={styles.customMealBtnText}>Save & use</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={() => setShowKeyInput(true)} style={{ marginTop: 4 }}>
                      <Text style={[styles.customMealLabel, { fontSize: 11, color: '#7c3aed' }]}>Add Groq API key for lookup</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
              {(showManual || !apiKey || apiKey === '') && (
                <>
                  <Text style={[styles.customMealLabel, { marginTop: 16 }]}>Manual macros</Text>
                  <View style={styles.customMealRow}>
                    <TextInput style={styles.customMealField} placeholder="Cal" placeholderTextColor="#64748b" value={manualCal} onChangeText={setManualCal} keyboardType="numeric" />
                    <TextInput style={styles.customMealField} placeholder="P (g)" placeholderTextColor="#64748b" value={manualProtein} onChangeText={setManualProtein} keyboardType="numeric" />
                    <TextInput style={styles.customMealField} placeholder="C (g)" placeholderTextColor="#64748b" value={manualCarbs} onChangeText={setManualCarbs} keyboardType="numeric" />
                    <TextInput style={styles.customMealField} placeholder="F (g)" placeholderTextColor="#64748b" value={manualFats} onChangeText={setManualFats} keyboardType="numeric" />
                  </View>
                  <TouchableOpacity style={styles.customMealBtn} onPress={handleAddManual}>
                    <Text style={styles.customMealBtnText}>Add custom meal</Text>
                  </TouchableOpacity>
                </>
              )}
              {fetchedOption && (
                <TouchableOpacity style={[styles.mealOptionCard, { marginTop: 12, borderColor: '#7c3aed' }]} onPress={handleSelectCustom}>
                  <Text style={styles.mealOptionLabel}>✓ {fetchedOption.label}</Text>
                  <View style={styles.mealOptionMacros}>
                    <View style={[styles.macroChip, { backgroundColor: 'rgba(249,115,22,0.15)' }]}><Text style={[styles.macroChipText, { color: '#f97316' }]}>🔥 {fetchedOption.macros.calories}</Text></View>
                    <View style={[styles.macroChip, { backgroundColor: 'rgba(239,68,68,0.15)' }]}><Text style={[styles.macroChipText, { color: '#ef4444' }]}>P {fetchedOption.macros.protein}g</Text></View>
                    <View style={[styles.macroChip, { backgroundColor: 'rgba(59,130,246,0.15)' }]}><Text style={[styles.macroChipText, { color: '#3b82f6' }]}>C {fetchedOption.macros.carbs}g</Text></View>
                    <View style={[styles.macroChip, { backgroundColor: 'rgba(234,179,8,0.15)' }]}><Text style={[styles.macroChipText, { color: '#eab308' }]}>F {fetchedOption.macros.fats}g</Text></View>
                  </View>
                  <Text style={[styles.customMealLabel, { marginTop: 8, fontSize: 11 }]}>Tap to confirm</Text>
                </TouchableOpacity>
              )}
            </View>

            <Text style={[styles.customMealLabel, { marginTop: 16, marginBottom: 8 }]}>Or select from list</Text>
            {pendingId && options.map((option, i) => (
              <TouchableOpacity
                key={i}
                style={styles.mealOptionCard}
                onPress={() => { onSelect(pendingId, option); handleClose(); }}
              >
                <Text style={styles.mealOptionLabel}>{option.label}</Text>
                {option.macros.calories > 0 && (
                  <View style={styles.mealOptionMacros}>
                    <View style={[styles.macroChip, { backgroundColor: 'rgba(249,115,22,0.15)' }]}>
                      <Text style={[styles.macroChipText, { color: '#f97316' }]}>🔥 {option.macros.calories}</Text>
                    </View>
                    <View style={[styles.macroChip, { backgroundColor: 'rgba(239,68,68,0.15)' }]}>
                      <Text style={[styles.macroChipText, { color: '#ef4444' }]}>P {option.macros.protein}g</Text>
                    </View>
                    <View style={[styles.macroChip, { backgroundColor: 'rgba(59,130,246,0.15)' }]}>
                      <Text style={[styles.macroChipText, { color: '#3b82f6' }]}>C {option.macros.carbs}g</Text>
                    </View>
                    <View style={[styles.macroChip, { backgroundColor: 'rgba(234,179,8,0.15)' }]}>
                      <Text style={[styles.macroChipText, { color: '#eab308' }]}>F {option.macros.fats}g</Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.modalCloseBtn} onPress={handleClose}>
            <Text style={styles.modalCloseBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
