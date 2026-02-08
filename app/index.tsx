import { SupportModal } from '@/components/modals/SupportModal';
import { ResumeData } from '@/constants/types';
import { useResumeStore } from '@/store/resumeStore';
import { useUIStore } from '@/store/uiStore';
import { generateCVHtml, templates } from '@/utils/htmlGenerator';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowRight, Check, Heart, Play, Settings, X } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Dimensions, FlatList, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

// Premium Grid Dimensions
const COLUMN_COUNT = 2;
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - (CARD_MARGIN * (COLUMN_COUNT + 1))) / COLUMN_COUNT;
const CARD_HEIGHT = CARD_WIDTH * 1.5; // Aspect ratio for A4-ish look

const PRO_COLORS = [
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#10b981', // Green
    '#F59E0B', // Amber
    '#8b5cf6', // Purple
    '#d946ef', // Magenta
    '#be123c', // Crimson
    '#000000', // Black
    '#1a365d', // Navy
    '#57534e', // Stone
    '#d4af37', // Gold
];

import { Language, translations } from '@/constants/translations';

// Real HTML Preview Component (Optimized for Grid)
const RealTemplatePreview = ({ templateId, data, language }: { templateId: string, data: ResumeData, language: Language }) => {
    const htmlContent = generateCVHtml(data, templateId, language);

    // Optimized scale for grid view (smaller cards)
    const scaledHtml = htmlContent.replace(
        '<head>',
        `<head><meta name="viewport" content="width=device-width, initial-scale=0.25, maximum-scale=0.25, user-scalable=no" />`
    );

    return (
        <View className="flex-1 bg-white relative pointer-events-none">
            <WebView
                originWhitelist={['*']}
                source={{ html: scaledHtml }}
                style={{ flex: 1, backgroundColor: 'white' }}
                scrollEnabled={false}
                pointerEvents="none"
                // Android perf optimization
                androidLayerType="hardware"
                // Decrease resource usage if possible
                javaScriptEnabled={true}
            />
            {/* Overlay to prevent interaction */}
            <View className="absolute inset-0 z-10" />
        </View>
    );
};

export default function HomeScreen() {
    const router = useRouter();
    const { resumeData, setTemplate, setThemeColor, resetResume, selectedLanguage, setLanguage } = useResumeStore();
    const { isTemplateUnlocked, unlockTemplate, unlockedTemplateIds } = useUIStore();
    const { selectedTemplate, themeColor: storedThemeColor } = resumeData;
    const insets = useSafeAreaInsets();
    const t = translations[selectedLanguage];

    const [previewModalVisible, setPreviewModalVisible] = useState(false);
    const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);
    const [supportModalVisible, setSupportModalVisible] = useState(false);
    const [pendingUnlockId, setPendingUnlockId] = useState<string | null>(null);

    // Global Preview Color (Defaults to stored or Blue)
    const [previewColor, setPreviewColor] = useState<string>(storedThemeColor || '#3b82f6');

    const hasData = !!(resumeData.personalInfo && resumeData.personalInfo.fullName);

    // PRO Placeholder Data
    const previewData = hasData ? { ...resumeData, themeColor: previewColor } : {
        ...resumeData,
        themeColor: previewColor,
        personalInfo: {
            ...resumeData.personalInfo,
            fullName: "Alexandra Vogue",
            jobTitle: "Art Director",
            photoUri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=400&h=400",
            email: "alexandra@studio.com",
            phone: "+1 555 0199 283",
            address: "Milan, Italy",
            about: "Visionary Art Director with a passion for minimalism. Transforming brands into fashion statements."
        },
        education: [
            { id: '1', school: 'Istituto Marangoni', degree: 'Master in Fashion', startDate: '2018', endDate: '2020', city: 'Milan' }
        ],
        experience: [
            { id: '1', company: 'Vogue Italia', position: 'Senior Layout Designer', startDate: '2020', endDate: 'Present', description: 'Leading the editorial design team for the digital edition.' }
        ],
        skills: [{ id: '1', name: 'Editorial Design' }, { id: '2', name: 'Typography' }, { id: '3', name: 'Creative Direction' }],
        languages: [{ id: '1', name: 'English', proficiency: 'Native' }]
    };

    const handleStart = () => {
        router.push('/editor/personal');
    };

    const confirmSelection = (id: string) => {
        if (!isTemplateUnlocked(id)) {
            setPreviewModalVisible(false);
            setPendingUnlockId(id);
            setSupportModalVisible(true);
            return;
        }

        setTemplate(id);
        setThemeColor(previewColor);
        setPreviewModalVisible(false);

        Alert.alert("Mükemmel Seçim", "Bu şablon seçildi. Düzenlemeye devam etmek ister misin?", [
            { text: "Şablonlara Bak", style: "cancel" },
            { text: "Düzenle", onPress: () => router.push('/editor/personal') }
        ]);
    };

    const openPreview = (item: typeof templates[0]) => {
        setPreviewTemplateId(item.id);
        // We keep the current previewColor as the basis for the full screen preview too
        setPreviewModalVisible(true);
    };

    const renderItem = ({ item }: { item: typeof templates[0] }) => {
        const isSelected = selectedTemplate === item.id;

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => openPreview(item)}
                style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    marginBottom: 20,
                    marginHorizontal: CARD_MARGIN / 2,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    elevation: 5,
                }}
                className={`bg-white rounded-2xl overflow-hidden relative border-2 ${isSelected ? 'border-green-500' : 'border-transparent'}`}
            >
                <RealTemplatePreview templateId={item.id} data={{ ...previewData, themeColor: previewColor }} language={selectedLanguage} />

                {/* LOCKED (BUT FREE) PILL ONLY */}
                {!isTemplateUnlocked(item.id) && (
                    <View className="absolute inset-0 items-center justify-center z-20 pointer-events-none">
                        <View className="bg-emerald-500/90 px-3 py-1.5 rounded-full backdrop-blur-md flex-row items-center gap-1.5 shadow-lg shadow-emerald-500/50">
                            <Play size={14} color="white" fill="white" />
                            <Text className="text-white font-extrabold text-[10px] tracking-wide">
                                {selectedLanguage === 'tr' ? 'ÜCRETSİZ AÇ' : 'UNLOCK FREE'}
                            </Text>
                        </View>
                    </View>
                )}



                {/* Minimal Overlay for Name */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={{ position: 'absolute', bottom: 0, width: '100%', padding: 10, paddingTop: 40 }}
                >
                    <View className="flex-row items-center justify-between">
                        <Text className="text-white font-serif text-sm font-semibold">{item.name}</Text>
                        {item.isPremium && !isTemplateUnlocked(item.id) && (
                            <View className="bg-amber-500 px-2 py-0.5 rounded text-[10px]">
                                <Text className="text-[9px] font-bold text-black">PRO</Text>
                            </View>
                        )}
                    </View>

                    {isSelected && (
                        <View className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                            <Check size={12} color="white" />
                        </View>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-[#09090b]">
            <StatusBar style="light" />

            {/* Radiant Background Glow */}
            <View className="absolute top-[-20%] left-[-20%] w-[140%] h-[60%] bg-blue-900/20 blur-[100px] rounded-full pointer-events-none" />

            <SafeAreaView className="flex-1">
                {/* FREE BANNER */}
                <View className="bg-emerald-500 py-1.5 px-4 flex-row items-center justify-center mb-1 shadow-sm">
                    <Text className="text-white font-bold text-[10px] text-center tracking-wide">
                        🎁 {selectedLanguage === 'tr' ? 'MÜJDE! TÜM ŞABLONLAR ARTIK ÜCRETSİZ!' : 'GREAT NEWS! ALL TEMPLATES ARE NOW FREE!'}
                    </Text>
                </View>
                {/* Header */}
                <View className="px-6 pt-2 pb-6">
                    <View className="flex-row items-center justify-between mb-6">
                        <View>
                            <Text className="text-white font-serif text-4xl italic tracking-tight">CVMaker.</Text>
                            <Text className="text-neutral-400 text-xs tracking-[3px] uppercase mt-1">Premium Designs</Text>
                        </View>

                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => router.push('/settings')}
                                className="bg-white/10 w-10 h-10 rounded-full border border-white/10 items-center justify-center"
                                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                            >
                                <Settings size={20} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleStart}
                                className="bg-white/10 px-5 py-2.5 rounded-full border border-white/10 flex-row items-center gap-2"
                            >
                                <Text className="text-white font-bold text-xs tracking-widest uppercase">
                                    {hasData ? 'Editor' : 'Create'}
                                </Text>
                                <ArrowRight size={12} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Global Color Selector */}
                    <View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 12, paddingRight: 20 }}
                        >
                            <TouchableOpacity
                                onPress={() => setPreviewColor(storedThemeColor || '#3b82f6')}
                                className="items-center justify-center mr-2"
                            >
                                <View className="w-10 h-10 rounded-full border-2 border-white/20 items-center justify-center bg-white/5">
                                    <View className="w-4 h-4 rounded-full bg-white ml-[1px]" />
                                </View>
                                <Text className="text-neutral-500 text-[10px] mt-1 font-bold">RESET</Text>
                            </TouchableOpacity>

                            {PRO_COLORS.map((color) => (
                                <TouchableOpacity
                                    key={color}
                                    onPress={() => setPreviewColor(color)}
                                    className="items-center"
                                >
                                    <View
                                        style={{
                                            backgroundColor: color,
                                            borderColor: previewColor === color ? 'white' : 'transparent',
                                            borderWidth: 2,
                                            shadowColor: color,
                                            shadowOpacity: 0.5,
                                            shadowRadius: 10,
                                        }}
                                        className="w-10 h-10 rounded-full items-center justify-center"
                                    >
                                        {previewColor === color && <Check size={16} color="white" />}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/* Grid Feed */}
                <FlatList
                    data={templates}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={unlockedTemplateIds}
                    numColumns={2}
                    contentContainerStyle={{
                        paddingHorizontal: CARD_MARGIN / 2,
                        paddingTop: 20,
                        paddingBottom: insets.bottom + 20,
                    }}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                    }}
                />

                {/* FULL SCREEN PREVIEW MODAL */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={previewModalVisible}
                    onRequestClose={() => setPreviewModalVisible(false)}
                >
                    <View className="flex-1 bg-black">
                        <SafeAreaView className="flex-1">
                            {/* Header */}
                            <View className="px-4 py-3 flex-row justify-between items-center bg-black/50">
                                <TouchableOpacity
                                    onPress={() => setPreviewModalVisible(false)}
                                    className="w-12 h-12 rounded-full bg-neutral-800 items-center justify-center border border-white/10"
                                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                                >
                                    <X size={24} color="white" />
                                </TouchableOpacity>

                                <Text className="text-white font-serif text-lg italic tracking-wider">
                                    {templates.find(t => t.id === previewTemplateId)?.name}
                                </Text>

                                <TouchableOpacity
                                    onPress={() => {
                                        if (previewTemplateId) confirmSelection(previewTemplateId);
                                    }}
                                    className={`px-6 py-3 rounded-full flex-row items-center gap-2 ${previewTemplateId && !unlockedTemplateIds.includes(previewTemplateId) ? 'bg-rose-600' : 'bg-green-600'}`}
                                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                                >
                                    {previewTemplateId && !unlockedTemplateIds.includes(previewTemplateId) ? (
                                        <>
                                            <Heart size={16} color="white" fill="white" />
                                            <Text className="text-white font-bold text-xs tracking-widest uppercase">
                                                {t.unlock}
                                            </Text>
                                        </>
                                    ) : (
                                        <Text className="text-white font-bold text-xs tracking-widest uppercase">
                                            {t.select}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>

                            {/* WebView Container (Flex-1 fills remaining space) */}
                            <View className="flex-1 bg-white overflow-hidden">
                                {previewTemplateId && (
                                    <WebView
                                        source={{ html: generateCVHtml(previewData, previewTemplateId, selectedLanguage) }}
                                        style={{ flex: 1, backgroundColor: '#fff' }}
                                        containerStyle={{ flex: 1 }}
                                        showsVerticalScrollIndicator={false}
                                    />
                                )}

                                {/* Full Screen Preview Lock Overlay */}
                                {previewTemplateId && !isTemplateUnlocked(previewTemplateId) && (
                                    <View
                                        className="absolute inset-0 pointer-events-none sticky z-50 flex items-center justify-center top-0 left-0 w-full h-full"
                                        pointerEvents="none"
                                        style={{ zIndex: 999, elevation: 999 }}
                                    >
                                        <View
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                zIndex: 999,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: 'transparent'
                                            }}
                                            pointerEvents="none"
                                        >
                                            <Text
                                                className="text-6xl font-extrabold text-black opacity-15 text-center"
                                                style={{ transform: [{ rotate: '-45deg' }], width: '150%' }}
                                            >
                                                ÜCRETSİZ{'\n'}KİLİT AÇ
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            </View>

                            {/* Footer Color Picker */}
                            <View className="bg-black/90 py-5">
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
                                >
                                    {PRO_COLORS.map((color) => (
                                        <TouchableOpacity
                                            key={color}
                                            onPress={() => setPreviewColor(color)}
                                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                            style={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: 22,
                                                backgroundColor: color,
                                                borderWidth: 2,
                                                borderColor: previewColor === color ? 'white' : 'transparent',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {previewColor === color && <Check size={22} color={'white'} strokeWidth={3} />}
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </SafeAreaView>
                    </View>
                </Modal>
            </SafeAreaView>

            <SupportModal
                visible={supportModalVisible}
                onClose={() => {
                    setSupportModalVisible(false);
                    setPendingUnlockId(null);
                }}
                templateId={pendingUnlockId}
            />
        </View >
    );
}
