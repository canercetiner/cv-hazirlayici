import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { translations } from '@/constants/translations';
import { useResumeStore } from '@/store/resumeStore';
import { v4 as uuidv4 } from '@/utils/uuid';
import { useRouter } from 'expo-router';
import { Languages, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LanguagesScreen() {
    const router = useRouter();
    const { resumeData, addLanguage, removeLanguage, selectedLanguage } = useResumeStore();
    const t = translations[selectedLanguage];
    const proficiencyLevels = t.proficiencies;
    const [newLang, setNewLang] = useState('');
    const [level, setLevel] = useState(proficiencyLevels[1]);

    const handleAdd = () => {
        if (!newLang.trim()) return;
        addLanguage({
            id: uuidv4(),
            name: newLang.trim(),
            proficiency: level
        });
        setNewLang('');
        setLevel('Orta');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 p-6">
                <Text className="text-2xl font-bold text-gray-900 mb-2">{t.langTitle}</Text>
                <Text className="text-gray-500 mb-6">{t.langSubtitle}</Text>

                {/* Add New Language Form */}
                <View className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
                    <Input
                        label={t.languages} // "Diller" as label? Maybe generic "Language"? let's use t.languages which is "Diller" or "Languages" which is close enough. Actually "Language" is better. Let's use t.langTitle for now.
                        placeholder={t.langPlaceholder}
                        value={newLang}
                        onChangeText={setNewLang}
                        containerClassName="mb-3"
                    />

                    <Text className="text-gray-700 font-medium mb-2 ml-1">{t.langLevel}</Text>
                    <ScrollView horizontal className="flex-row gap-2 mb-4" showsHorizontalScrollIndicator={false}>
                        {proficiencyLevels.map(l => (
                            <TouchableOpacity
                                key={l}
                                onPress={() => setLevel(l)}
                                className={`px-4 py-2 rounded-lg border ${level === l ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-200'}`}
                            >
                                <Text className={level === l ? 'text-white font-medium' : 'text-gray-600'}>{l}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <Button
                        label={t.add}
                        onPress={handleAdd}
                        disabled={!newLang.trim()}
                        size="sm"
                        className="mt-2"
                    />
                </View>

                {/* List */}
                <View className="gap-3 mb-20">
                    {resumeData.languages.map(lang => (
                        <View key={lang.id} className="bg-white border border-gray-200 p-4 rounded-xl flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <View className="bg-blue-50 p-2 rounded-lg mr-3">
                                    <Languages size={20} color="#2563eb" />
                                </View>
                                <View>
                                    <Text className="font-bold text-gray-900 text-lg">{lang.name}</Text>
                                    <Text className="text-gray-500">{lang.proficiency}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => removeLanguage(lang.id)} className="p-2">
                                <Trash2 size={20} color="#ef4444" />
                            </TouchableOpacity>
                        </View>
                    ))}

                    {resumeData.languages.length === 0 && (
                        <Text className="text-center text-gray-400 mt-4">{t.noLangs}</Text>
                    )}
                </View>

            </ScrollView>

            <View className="p-4 border-t border-gray-100 bg-white">
                <View className="flex-row gap-3">
                    <Button
                        label={t.back}
                        variant="secondary"
                        className="flex-1"
                        onPress={() => router.back()}
                    />
                    <Button
                        label={`${t.next}: ${t.references}`}
                        className="flex-[2]"
                        onPress={() => router.push('/editor/references')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
