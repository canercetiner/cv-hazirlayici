import { Button } from '@/components/ui/Button';
import { useResumeStore } from '@/store/resumeStore';
import { useRouter } from 'expo-router';
import { Briefcase, Edit2, Trash2 } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExperienceScreen() {
    const router = useRouter();
    const { resumeData, removeExperience } = useResumeStore();
    const { experience } = resumeData;

    const handleEdit = (id: string) => {
        router.push({ pathname: '/editor/experience-form', params: { id } });
    };

    const handleAdd = () => {
        router.push('/editor/experience-form');
    };

    return (
        <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
            <ScrollView className="flex-1 px-6 pt-4">
                <View className="mb-6">
                    <Text className="text-2xl font-bold text-gray-900">İş Deneyimi</Text>
                    <Text className="text-gray-500 mt-1">
                        Daha önce çalıştığın yerleri ve pozisyonlarını ekle.
                    </Text>
                </View>

                {experience.length === 0 ? (
                    <View className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 items-center justify-center mb-6">
                        <Briefcase size={48} color="#9ca3af" className="mb-4" />
                        <Text className="text-gray-500 text-center mb-4">
                            Henüz iş deneyimi eklemedin.
                        </Text>
                        <Button label="Deneyim Ekle" onPress={handleAdd} variant="secondary" size="sm" />
                    </View>
                ) : (
                    <View className="gap-y-4 mb-6">
                        {experience.map((exp) => (
                            <View key={exp.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                <View className="flex-row justify-between items-start mb-2">
                                    <View className="flex-1 mr-2">
                                        <Text className="font-bold text-gray-900 text-lg">{exp.position}</Text>
                                        <Text className="text-gray-700 font-medium">{exp.company}</Text>
                                    </View>
                                    <View className="flex-row gap-2">
                                        <TouchableOpacity onPress={() => handleEdit(exp.id)} className="p-2 bg-blue-50 rounded-lg">
                                            <Edit2 size={16} color="#2563eb" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => removeExperience(exp.id)} className="p-2 bg-red-50 rounded-lg">
                                            <Trash2 size={16} color="#ef4444" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text className="text-gray-500 text-sm">{exp.startDate} - {exp.endDate}</Text>
                                <Text className="text-gray-600 mt-2 text-sm" numberOfLines={2}>{exp.description}</Text>
                            </View>
                        ))}
                        <Button
                            label="+ Başka Bir Deneyim Ekle"
                            variant="ghost"
                            onPress={handleAdd}
                            className="mt-2"
                        />
                    </View>
                )}

            </ScrollView>

            <View className="p-4 border-t border-gray-100 bg-white shadow-lg">
                <Button label="Sonraki: Yetenekler" onPress={() => router.push('/editor/skills')} />
            </View>
        </SafeAreaView>
    );
}
