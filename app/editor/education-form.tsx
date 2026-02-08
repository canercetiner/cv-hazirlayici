import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { translations } from '@/constants/translations';
import { Education } from '@/constants/types';
import { useResumeStore } from '@/store/resumeStore';
import { uuid } from '@/utils/uuid';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EducationFormScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { resumeData, addEducation, updateEducation, selectedLanguage } = useResumeStore();
    const t = translations[selectedLanguage];

    const [form, setForm] = useState<Education>({
        id: '',
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
        city: ''
    });

    useEffect(() => {
        if (id) {
            const existing = resumeData.education.find(e => e.id === id);
            if (existing) {
                setForm(existing);
            }
        } else {
            setForm(prev => ({ ...prev, id: uuid() }));
        }
    }, [id, resumeData.education]);

    const handleSave = () => {
        if (!form.school || !form.degree) {
            Alert.alert("Eksik Bilgi", "Lütfen okul ve derece/bölüm alanlarını doldurun.");
            return;
        }

        if (id) {
            updateEducation(id, form);
        } else {
            addEducation(form);
        }
        router.back();
    };

    const handleChange = (field: keyof Education, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
                keyboardVerticalOffset={100}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView className="flex-1 px-6 pt-4">
                        <View className="mb-6">
                            <Text className="text-xl font-bold text-gray-900">
                                {id ? t.eduTitleEdit : t.eduTitleAdd}
                            </Text>
                        </View>

                        <Input
                            label={t.schoolLabel}
                            placeholder="Örn: İstanbul Üniversitesi"
                            value={form.school}
                            onChangeText={(t) => handleChange('school', t)}
                        />

                        <Input
                            label={t.degreeLabel}
                            placeholder="Örn: Bilgisayar Mühendisliği Lisans"
                            value={form.degree}
                            onChangeText={(t) => handleChange('degree', t)}
                        />

                        <View className="flex-row gap-4">
                            <Input
                                label={t.startDate}
                                placeholder="Örn: 2018"
                                value={form.startDate}
                                onChangeText={(t) => handleChange('startDate', t)}
                                containerClassName="flex-1"
                            />
                            <Input
                                label={t.endDate}
                                placeholder="Örn: 2022"
                                value={form.endDate}
                                onChangeText={(t) => handleChange('endDate', t)}
                                containerClassName="flex-1"
                            />
                        </View>

                        <Input
                            label={t.city}
                            placeholder="Örn: İstanbul"
                            value={form.city}
                            onChangeText={(t) => handleChange('city', t)}
                        />

                    </ScrollView>
                </TouchableWithoutFeedback>
                <View className="p-4 border-t border-gray-100 bg-white">
                    <Button label={t.save} onPress={handleSave} />
                    <Button label={t.cancel} variant="ghost" onPress={() => router.back()} className="mt-2" />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
