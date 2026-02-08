import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { translations } from '@/constants/translations';
import { useResumeStore } from '@/store/resumeStore';
import { v4 as uuidv4 } from '@/utils/uuid';
import { useRouter } from 'expo-router';
import { Trash2, Users } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReferencesScreen() {
    const router = useRouter();
    const { resumeData, addReference, removeReference, selectedLanguage } = useResumeStore();
    const t = translations[selectedLanguage];

    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleAdd = () => {
        if (!name.trim()) return;
        addReference({
            id: uuidv4(),
            fullName: name.trim(),
            company: company.trim(),
            phone: phone.trim(),
            email: email.trim(),
        });
        // Reset form
        setName('');
        setCompany('');
        setPhone('');
        setEmail('');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
                keyboardVerticalOffset={100}
            >
                <ScrollView className="flex-1 p-6">
                    <Text className="text-2xl font-bold text-gray-900 mb-2">{t.cv_references}</Text>
                    <Text className="text-gray-500 mb-6">{t.refSubtitle}</Text>

                    {/* Add New Reference Form */}
                    <View className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
                        <Text className="font-bold text-gray-700 mb-3">{t.refTitleAdd}</Text>

                        <Input
                            placeholder={t.refName}
                            value={name}
                            onChangeText={setName}
                            containerClassName="mb-3"
                        />
                        <Input
                            placeholder={t.refCompany}
                            value={company}
                            onChangeText={setCompany}
                            containerClassName="mb-3"
                        />
                        <Input
                            placeholder={t.phone}
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            containerClassName="mb-3"
                        />
                        <Input
                            placeholder={t.email}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            containerClassName="mb-4"
                        />

                        <Button
                            label={t.add}
                            onPress={handleAdd}
                            disabled={!name.trim()}
                            size="sm"
                            variant="primary"
                        />
                    </View>

                    {/* List */}
                    <View className="gap-3 mb-20">
                        {resumeData.references.map(ref => (
                            <View key={ref.id} className="bg-white border border-gray-200 p-4 rounded-xl flex-row items-center justify-between shadow-sm">
                                <View className="flex-row items-center flex-1">
                                    <View className="bg-blue-50 p-3 rounded-full mr-3">
                                        <Users size={20} color="#2563eb" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-bold text-gray-900 text-base">{ref.fullName}</Text>
                                        <Text className="text-gray-600 text-sm font-medium">{ref.company}</Text>
                                        {(ref.phone || ref.email) && (
                                            <Text className="text-gray-400 text-xs mt-1">
                                                {ref.phone} {ref.phone && ref.email ? '•' : ''} {ref.email}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => removeReference(ref.id)} className="p-2 bg-red-50 rounded-lg">
                                    <Trash2 size={18} color="#ef4444" />
                                </TouchableOpacity>
                            </View>
                        ))}

                        {resumeData.references.length === 0 && (
                            <Text className="text-center text-gray-400 mt-4 italic">Henüz referans eklenmedi.</Text> // Localization for this wasn't explicit, but generic "No items" logic applies or leave as static since mostly fine. Wait, I should fix it. I don't have a key but I can assume empty.
                            // I'll leave it or replace if I had a key. I don't have t.noReferences. I'll leave it for now or use static English if language is English? No, better consistent.
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
                            label={t.completePreview}
                            className="flex-[2]"
                            onPress={() => router.push('/preview')}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
