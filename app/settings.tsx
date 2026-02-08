import { translations } from '@/constants/translations';
import { useResumeStore } from '@/store/resumeStore';
import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronRight, FileText, Globe, Mail, Shield } from 'lucide-react-native';
import React from 'react';
import { Alert, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
    const router = useRouter();
    const { selectedLanguage, setLanguage } = useResumeStore();
    const t = translations[selectedLanguage];

    const handleContact = () => {
        Linking.openURL('mailto:caner.cetiner@icloud.com?subject=Destek Talebi');
    };

    const handlePrivacy = () => {
        Linking.openURL('https://ayaztech.com.tr/legal_docs/privacy.html');
    };

    const handleTerms = () => {
        Linking.openURL('https://ayaztech.com.tr/legal_docs/terms.html');
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="px-6 py-4 bg-white border-b border-gray-200 flex-row items-center gap-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                >
                    <ArrowLeft size={20} color="#374151" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">{t.settingsTitle}</Text>
            </View>

            <ScrollView className="flex-1 p-6">

                {/* Language Section */}
                <View className="mb-8">
                    <Text className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{t.languageSection}</Text>
                    <View className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <TouchableOpacity
                            onPress={() => setLanguage('tr')}
                            className={`flex-row items-center justify-between p-4 border-b border-gray-100 ${selectedLanguage === 'tr' ? 'bg-blue-50' : ''}`}
                        >
                            <View className="flex-row items-center gap-3">
                                <Globe size={20} color={selectedLanguage === 'tr' ? '#2563eb' : '#6b7280'} />
                                <Text className={`font-medium ${selectedLanguage === 'tr' ? 'text-blue-600' : 'text-gray-700'}`}>Türkçe</Text>
                            </View>
                            {selectedLanguage === 'tr' && <View className="w-3 h-3 rounded-full bg-blue-600" />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setLanguage('en')}
                            className={`flex-row items-center justify-between p-4 ${selectedLanguage === 'en' ? 'bg-blue-50' : ''}`}
                        >
                            <View className="flex-row items-center gap-3">
                                <Globe size={20} color={selectedLanguage === 'en' ? '#2563eb' : '#6b7280'} />
                                <Text className={`font-medium ${selectedLanguage === 'en' ? 'text-blue-600' : 'text-gray-700'}`}>English</Text>
                            </View>
                            {selectedLanguage === 'en' && <View className="w-3 h-3 rounded-full bg-blue-600" />}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Data Management */}
                <View className="mb-8">
                    <Text className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                        {selectedLanguage === 'tr' ? 'Veri Yönetimi' : 'Data Management'}
                    </Text>
                    <View className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                    selectedLanguage === 'tr' ? 'Örnek Veri' : 'Example Data',
                                    selectedLanguage === 'tr'
                                        ? 'Mevcut verileriniz silinecek ve örnek veri yüklenecektir. Emin misiniz?'
                                        : 'Your current data will be replaced with example data. Are you sure?',
                                    [
                                        { text: selectedLanguage === 'tr' ? 'İptal' : 'Cancel', style: 'cancel' },
                                        {
                                            text: selectedLanguage === 'tr' ? 'Yükle' : 'Load',
                                            style: 'destructive',
                                            onPress: () => {
                                                useResumeStore.getState().loadExampleData();
                                                router.replace('/');
                                            }
                                        }
                                    ]
                                );
                            }}
                            className="flex-row items-center justify-between p-4 border-b border-gray-100"
                        >
                            <View className="flex-row items-center gap-3">
                                <FileText size={20} color="#6b7280" />
                                <Text className="font-medium text-gray-700">
                                    {selectedLanguage === 'tr' ? 'Örnek CV Doldur' : 'Load Example CV'}
                                </Text>
                            </View>
                            <ChevronRight size={16} color="#9ca3af" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                    t.resetResume || 'Sıfırla',
                                    t.resetConfirm || 'Tüm veriler silinecek, emin misiniz?',
                                    [
                                        { text: t.cancel || 'İptal', style: 'cancel' },
                                        {
                                            text: t.reset || 'Sıfırla',
                                            style: 'destructive',
                                            onPress: () => {
                                                useResumeStore.getState().resetResume();
                                                router.replace('/');
                                            }
                                        }
                                    ]
                                );
                            }}
                            className="flex-row items-center justify-between p-4"
                        >
                            <View className="flex-row items-center gap-3">
                                <Shield size={20} color="#ef4444" />
                                <Text className="font-medium text-red-600">{t.resetResume || 'CV Sıfırla'}</Text>
                            </View>
                            <ChevronRight size={16} color="#9ca3af" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Legal Section */}
                <View className="mb-8">
                    <Text className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{t.legalSection}</Text>
                    <View className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <TouchableOpacity onPress={handlePrivacy} className="flex-row items-center justify-between p-4 border-b border-gray-100">
                            <View className="flex-row items-center gap-3">
                                <Shield size={20} color="#6b7280" />
                                <Text className="font-medium text-gray-700">{t.privacy}</Text>
                            </View>
                            <ChevronRight size={18} color="#9ca3af" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleTerms} className="flex-row items-center justify-between p-4 border-b border-gray-100">
                            <View className="flex-row items-center gap-3">
                                <FileText size={20} color="#6b7280" />
                                <Text className="font-medium text-gray-700">{t.terms}</Text>
                            </View>
                            <ChevronRight size={18} color="#9ca3af" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleContact} className="flex-row items-center justify-between p-4">
                            <View className="flex-row items-center gap-3">
                                <Mail size={20} color="#6b7280" />
                                <Text className="font-medium text-gray-700">{t.contact}</Text>
                            </View>
                            <ChevronRight size={18} color="#9ca3af" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="items-center mt-4">
                    <Text className="text-gray-400 text-xs">CVMaker v1.0.0 (Build 1)</Text>
                    <Text className="text-gray-300 text-[10px] mt-1">Powered by AyazTech</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
