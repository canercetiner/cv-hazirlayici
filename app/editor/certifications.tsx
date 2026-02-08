import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { translations } from '@/constants/translations';
import { useResumeStore } from '@/store/resumeStore';
import { v4 as uuidv4 } from '@/utils/uuid';
import { useRouter } from 'expo-router';
import { Award, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CertificationsScreen() {
    const router = useRouter();
    const { resumeData, addCertification, removeCertification, selectedLanguage } = useResumeStore();
    const t = translations[selectedLanguage];
    const certs = resumeData.certifications || [];

    const [name, setName] = useState('');
    const [issuer, setIssuer] = useState('');
    const [date, setDate] = useState('');

    const handleAdd = () => {
        if (!name.trim()) return;
        addCertification({
            id: uuidv4(),
            name: name.trim(),
            issuer: issuer.trim(),
            date: date.trim()
        });
        setName('');
        setIssuer('');
        setDate('');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                <ScrollView className="flex-1 p-6">
                    <Text className="text-2xl font-bold text-gray-900 mb-2">{t.cv_certifications}</Text>
                    <Text className="text-gray-500 mb-6">{t.certSubtitle}</Text>

                    <View className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
                        <Input placeholder={t.certName} value={name} onChangeText={setName} containerClassName="mb-3" />
                        <Input placeholder={t.certIssuer} value={issuer} onChangeText={setIssuer} containerClassName="mb-3" />
                        <Input placeholder={t.certDate} value={date} onChangeText={setDate} containerClassName="mb-3" />
                        <Button label={t.add} onPress={handleAdd} disabled={!name.trim()} size="sm" variant="primary" />
                    </View>

                    <View className="gap-3 mb-20">
                        {certs.map(item => (
                            <View key={item.id} className="bg-white border border-gray-200 p-4 rounded-xl flex-row items-center justify-between shadow-sm">
                                <View className="flex-row items-center flex-1">
                                    <View className="bg-yellow-50 p-3 rounded-full mr-3">
                                        <Award size={20} color="#d97706" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-bold text-gray-900 text-base">{item.name}</Text>
                                        <Text className="text-gray-600 text-sm">{item.issuer}</Text>
                                        {item.date ? <Text className="text-gray-400 text-xs mt-1">{item.date}</Text> : null}
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => removeCertification(item.id)} className="p-2 bg-red-50 rounded-lg">
                                    <Trash2 size={18} color="#ef4444" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <View className="p-4 border-t border-gray-100 bg-white">
                    <View className="flex-row gap-3">
                        <Button label={t.back} variant="secondary" className="flex-1" onPress={() => router.back()} />
                        <Button label={`${t.next}: ${t.languages}`} className="flex-[2]" onPress={() => router.push('/editor/languages')} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
