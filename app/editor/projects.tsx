import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { translations } from '@/constants/translations';
import { useResumeStore } from '@/store/resumeStore';
import { v4 as uuidv4 } from '@/utils/uuid';
import { useRouter } from 'expo-router';
import { FolderGit2, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProjectsScreen() {
    const router = useRouter();
    const { resumeData, addProject, removeProject, selectedLanguage } = useResumeStore();
    const t = translations[selectedLanguage];
    const courses = resumeData.projects || []; // Safe fallback

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const handleAdd = () => {
        if (!name.trim()) return;
        addProject({
            id: uuidv4(),
            name: name.trim(),
            description: desc.trim(),
        });
        setName('');
        setDesc('');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                <ScrollView className="flex-1 p-6">
                    <Text className="text-2xl font-bold text-gray-900 mb-2">{t.cv_projects}</Text>
                    <Text className="text-gray-500 mb-6">{t.projSubtitle}</Text>

                    <View className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
                        <Input placeholder={t.projName} value={name} onChangeText={setName} containerClassName="mb-3" />
                        <Input placeholder={t.projDesc} value={desc} onChangeText={setDesc} containerClassName="mb-3" />
                        <Button label={t.add} onPress={handleAdd} disabled={!name.trim()} size="sm" variant="primary" />
                    </View>

                    <View className="gap-3 mb-20">
                        {courses.map(item => (
                            <View key={item.id} className="bg-white border border-gray-200 p-4 rounded-xl flex-row items-center justify-between shadow-sm">
                                <View className="flex-row items-center flex-1">
                                    <View className="bg-indigo-50 p-3 rounded-full mr-3">
                                        <FolderGit2 size={20} color="#4f46e5" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-bold text-gray-900 text-base">{item.name}</Text>
                                        {item.description ? <Text className="text-gray-500 text-sm mt-1">{item.description}</Text> : null}
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => removeProject(item.id)} className="p-2 bg-red-50 rounded-lg">
                                    <Trash2 size={18} color="#ef4444" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <View className="p-4 border-t border-gray-100 bg-white">
                    <View className="flex-row gap-3">
                        <Button label={t.back} variant="secondary" className="flex-1" onPress={() => router.back()} />
                        <Button label={`${t.next}: ${t.certifications}`} className="flex-[2]" onPress={() => router.push('/editor/certifications')} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
