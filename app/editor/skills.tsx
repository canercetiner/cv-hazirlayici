import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { translations } from '@/constants/translations';
import { useResumeStore } from '@/store/resumeStore';
import { uuid } from '@/utils/uuid';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SkillsScreen() {
    const router = useRouter();
    const { resumeData, addSkill, removeSkill, selectedLanguage } = useResumeStore();
    const { skills } = resumeData;
    const t = translations[selectedLanguage];
    const [newSkill, setNewSkill] = useState('');

    const handleAdd = () => {
        if (!newSkill.trim()) return;
        addSkill({
            id: uuid(),
            name: newSkill.trim()
        });
        setNewSkill('');
    };

    return (
        <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
            <ScrollView className="flex-1 px-6 pt-4">
                <View className="mb-6">
                    <Text className="text-2xl font-bold text-gray-900">{t.skillTitle}</Text>
                    <Text className="text-gray-500 mt-1">
                        {t.skillsSubtitle}
                    </Text>
                </View>

                <View className="flex-row gap-2 items-end mb-6">
                    <Input
                        placeholder={t.skillPlaceholder}
                        value={newSkill}
                        onChangeText={setNewSkill}
                        containerClassName="flex-1 mb-0"
                        className="mb-0"
                        onSubmitEditing={handleAdd}
                    />
                    <Button label={t.add} onPress={handleAdd} size="md" className="mb-0" />
                </View>

                <View className="flex-row flex-wrap gap-2">
                    {skills.map((skill) => (
                        <View key={skill.id} className="bg-blue-50 border border-blue-100 px-3 py-2 rounded-full flex-row items-center">
                            <Text className="text-blue-700 font-medium mr-2">{skill.name}</Text>
                            <TouchableOpacity onPress={() => removeSkill(skill.id)}>
                                <X size={16} color="#2563eb" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {skills.length === 0 && (
                    <Text className="text-gray-400 text-center mt-8">{t.noSkills}</Text>
                )}

            </ScrollView>

            <View className="p-4 border-t border-gray-100 bg-white shadow-lg">
                <View className="flex-row gap-3">
                    <Button
                        label={t.back}
                        variant="secondary"
                        className="flex-1"
                        onPress={() => router.back()}
                    />
                    <Button
                        label={`${t.next}: ${t.projects}`}
                        onPress={() => router.push('/editor/projects')}
                        className="flex-[2]"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
