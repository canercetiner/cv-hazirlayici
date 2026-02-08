import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { translations } from '@/constants/translations';
import { Experience } from '@/constants/types';
import { useResumeStore } from '@/store/resumeStore';
import { uuid } from '@/utils/uuid';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExperienceFormScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { resumeData, addExperience, updateExperience, selectedLanguage } = useResumeStore();
    const t = translations[selectedLanguage];

    const [form, setForm] = useState<Experience>({
        id: '',
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
    });

    useEffect(() => {
        if (id) {
            const existing = resumeData.experience.find(e => e.id === id);
            if (existing) {
                setForm(existing);
            }
        } else {
            setForm(prev => ({ ...prev, id: uuid() }));
        }
    }, [id, resumeData.experience]);

    const handleSave = () => {
        if (!form.company || !form.position) {
            Alert.alert("Eksik Bilgi", "Lütfen şirket ve pozisyon alanlarını doldurun.");
            return;
        }

        if (id) {
            updateExperience(id, form);
        } else {
            addExperience(form);
        }
        router.back();
    };

    const handleChange = (field: keyof Experience, value: string) => {
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
                                {id ? t.expTitleEdit : t.expTitleAdd}
                            </Text>
                        </View>

                        <Input
                            label={t.companyLabel}
                            placeholder="Örn: Google"
                            value={form.company}
                            onChangeText={(t) => handleChange('company', t)}
                        />

                        <Input
                            label={t.positionLabel}
                            placeholder="Örn: Kıdemli Yazılım Geliştirici"
                            value={form.position}
                            onChangeText={(t) => handleChange('position', t)}
                        />

                        <View className="flex-row gap-4">
                            <Input
                                label={t.startDate}
                                placeholder="Örn: 2020"
                                value={form.startDate}
                                onChangeText={(t) => handleChange('startDate', t)}
                                containerClassName="flex-1"
                            />
                            <Input
                                label={t.endDate}
                                placeholder="Örn: Devam"
                                value={form.endDate}
                                onChangeText={(t) => handleChange('endDate', t)}
                                containerClassName="flex-1"
                            />
                        </View>

                        <Input
                            label={t.descLabel}
                            placeholder="Neler yaptınız? Başarılarınız..."
                            value={form.description}
                            onChangeText={(t) => handleChange('description', t)}
                            multiline
                            numberOfLines={4}
                            className="h-32 text-top pt-3"
                            textAlignVertical="top"
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
