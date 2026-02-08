import { Button } from '@/components/ui/Button';
import { translations } from '@/constants/translations';
import { useResumeStore } from '@/store/resumeStore';
import { generateCVHtml, setIsExportMode } from '@/utils/htmlGenerator';
import * as Print from 'expo-print';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { Alert, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function PreviewScreen() {
    const router = useRouter();
    const { resumeData, setTemplate, selectedLanguage } = useResumeStore();
    const t = translations[selectedLanguage];
    const [loading, setLoading] = useState(false);

    // Generate HTML based on current state for the specific template
    // Default is PREVIEW mode (zoom 1.0)
    setIsExportMode(false);
    const currentHtml = generateCVHtml(resumeData, resumeData.selectedTemplate, selectedLanguage);

    const handleExport = async () => {
        setLoading(true);
        try {
            // 1. Switch to Export Mode (Aggressive Zoom)
            setIsExportMode(true);

            // 2. Regenerate HTML with new mode
            const exportHtml = generateCVHtml(resumeData, resumeData.selectedTemplate, selectedLanguage);

            // DEBUG: Log HTML length and first/last 500 chars
            console.log('📄 PDF HTML Length:', exportHtml.length);
            console.log('📄 HTML Start:', exportHtml.substring(0, 500));
            console.log('📄 HTML End:', exportHtml.substring(exportHtml.length - 500));

            // 3. Generate PDF with iOS-specific parameters
            const pdfOptions: any = {
                html: exportHtml,
                base64: false,
                margins: { top: 0, bottom: 0, left: 0, right: 0 }
            };

            // iOS-specific: Force exact A4 dimensions to prevent second page
            if (Platform.OS === 'ios') {
                pdfOptions.width = 595;  // A4 width in points
                pdfOptions.height = 842; // A4 height in points
            }

            const { uri } = await Print.printToFileAsync(pdfOptions);

            console.log('✅ PDF Generated:', uri);

            // 4. Switch back to Preview Mode
            setIsExportMode(false);

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
            } else {
                Alert.alert(t.shareErrorTitle, t.shareErrorMessage);
            }
        } catch (error) {
            console.error(error);
            Alert.alert(t.errorTitle, t.pdfError);
            setIsExportMode(false); // Ensure we reset on error
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">

            {/* Live Preview (WebView) */}
            <View className="flex-1 w-full relative">
                <WebView
                    originWhitelist={['*']}
                    source={{ html: currentHtml }}
                    className="flex-1 bg-white ml-2 mr-2 shadow-sm rounded-lg"
                    showsVerticalScrollIndicator={false}
                />


            </View>

            {/* Footer Actions */}
            <View className="p-4 bg-white border-t border-gray-200">
                <Button
                    label={t.download}
                    onPress={handleExport}
                    loading={loading}
                    className="w-full mb-2"
                />
                <Button
                    label={t.backToEditor}
                    variant="ghost"
                    onPress={() => router.back()}
                    className="w-full"
                    size="sm"
                />
            </View>

        </SafeAreaView>
    );
}
