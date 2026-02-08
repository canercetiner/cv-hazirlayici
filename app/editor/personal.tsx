import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { translations } from '@/constants/translations';
import { useResumeStore } from '@/store/resumeStore';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Camera, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PersonalInfoScreen() {
    const router = useRouter();
    const { resumeData, setPersonalInfo, selectedLanguage } = useResumeStore();
    const t = translations[selectedLanguage];
    const [formData, setFormData] = useState(resumeData.personalInfo);
    // Ensure social links object exists if it was undefined initially
    const [socials, setSocials] = useState(resumeData.personalInfo.socialLinks || { linkedin: '', github: '', website: '' });

    const pickImage = async () => {
        // Request permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('İzin Gerekli', 'Fotoğraf seçmek için galeri izni vermelisin.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            base64: true,
        });

        if (!result.canceled) {
            const base64Img = `data:image/jpeg;base64,${result.assets[0].base64}`;
            const newData = { ...formData, photoUri: base64Img };
            setFormData(newData);
        }
    };

    const removeImage = () => {
        setFormData({ ...formData, photoUri: undefined });
    };

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSocialChange = (field: keyof typeof socials, value: string) => {
        setSocials({ ...socials, [field]: value });
    };

    const handleNext = () => {
        if (!formData.fullName) {
            alert("Lütfen en azından adınızı giriniz.");
            return;
        }
        // Combine regular data with social links
        setPersonalInfo({
            ...formData,
            socialLinks: socials
        });
        router.push('/editor/education');
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
                            <Text className="text-2xl font-bold text-gray-900">{t.personalTitle}</Text>
                            <Text className="text-gray-500 mt-1">
                                {t.personalSubtitle}
                            </Text>
                        </View>

                        {/* Photo Upload Area */}
                        <View className="items-center mb-8">
                            <TouchableOpacity onPress={pickImage} className="relative">
                                {formData.photoUri ? (
                                    <Image
                                        source={{ uri: formData.photoUri }}
                                        className="w-32 h-32 rounded-full border-4 border-gray-100"
                                    />
                                ) : (
                                    <View className="w-32 h-32 rounded-full bg-gray-100 items-center justify-center border-2 border-dashed border-gray-300">
                                        <Camera size={32} color="#9ca3af" />
                                        <Text className="text-gray-400 text-xs mt-1">{t.addPhoto}</Text>
                                    </View>
                                )}

                                {formData.photoUri && (
                                    <TouchableOpacity
                                        onPress={removeImage}
                                        className="absolute bottom-0 right-0 bg-red-100 p-2 rounded-full border border-white"
                                    >
                                        <Trash2 size={16} color="#ef4444" />
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
                        </View>

                        <Input
                            label={t.namePlaceholder}
                            placeholder="Örn: Ahmet Yılmaz"
                            value={formData.fullName}
                            onChangeText={(text) => handleChange('fullName', text)}
                            autoCapitalize="words"
                        />

                        <Input
                            label={t.jobPlaceholder}
                            placeholder="Örn: Yazılım Mühendisi"
                            value={formData.jobTitle}
                            onChangeText={(text) => handleChange('jobTitle', text)}
                        />

                        <Input
                            label={t.email}
                            placeholder="ornek@email.com"
                            value={formData.email}
                            onChangeText={(text) => handleChange('email', text)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Input
                            label={t.phone}
                            placeholder="0555 123 45 67"
                            value={formData.phone}
                            onChangeText={(text) => handleChange('phone', text)}
                            keyboardType="phone-pad"
                        />

                        <Input
                            label={t.address}
                            placeholder="Şehir / Ülke"
                            value={formData.address}
                            onChangeText={(text) => handleChange('address', text)}
                        />

                        {/* Extra Personal Details */}
                        <View className="flex-row gap-4">
                            <View className="flex-1">
                                <Input
                                    label={t.birthDate}
                                    placeholder="GG.AA.YYYY"
                                    value={formData.birthDate}
                                    onChangeText={(text) => handleChange('birthDate', text)}
                                />
                            </View>
                            <View className="flex-1">
                                <Input
                                    label={t.birthPlace}
                                    placeholder="İstanbul"
                                    value={formData.birthPlace}
                                    onChangeText={(text) => handleChange('birthPlace', text)}
                                />
                            </View>
                        </View>

                        <View className="flex-row gap-4">
                            <View className="flex-1">
                                <Input
                                    label={t.military}
                                    placeholder="Yapıldı / Muaf / Yok (Kadın)"
                                    value={formData.militaryStatus}
                                    onChangeText={(text) => handleChange('militaryStatus', text)}
                                />
                            </View>
                            <View className="flex-1">
                                <Input
                                    label={t.license}
                                    placeholder="B Sınıfı"
                                    value={formData.drivingLicense}
                                    onChangeText={(text) => handleChange('drivingLicense', text)}
                                />
                            </View>
                        </View>

                        <Input
                            label={t.marital}
                            placeholder="Bekar / Evli"
                            value={formData.maritalStatus}
                            onChangeText={(text) => handleChange('maritalStatus', text)}
                        />

                        {/* Social Links Section */}
                        <View className="mt-2 mb-2">
                            <Text className="text-gray-900 font-bold text-lg mb-3 flex-row items-center">
                                {t.socialLabel}
                            </Text>

                            <Input
                                label="LinkedIn"
                                placeholder="linkedin.com/in/..."
                                value={socials.linkedin}
                                onChangeText={(text) => handleSocialChange('linkedin', text)}
                                autoCapitalize="none"
                            />

                            <Input
                                label="GitHub"
                                placeholder="github.com/..."
                                value={socials.github}
                                onChangeText={(text) => handleSocialChange('github', text)}
                                autoCapitalize="none"
                            />

                            <Input
                                label="Web Sitesi / Portfolyo"
                                placeholder="www.websiteniz.com"
                                value={socials.website}
                                onChangeText={(text) => handleSocialChange('website', text)}
                                autoCapitalize="none"
                            />
                        </View>

                        <Input
                            label={t.aboutLabel}
                            placeholder={t.aboutPlaceholder}
                            value={formData.about}
                            onChangeText={(text) => handleChange('about', text)}
                            multiline
                            numberOfLines={4}
                            className="h-32 text-top pt-3"
                            textAlignVertical="top"
                        />

                        <View className="h-20" />
                    </ScrollView>
                </TouchableWithoutFeedback>

                <View className="p-4 border-t border-gray-100 bg-white shadow-lg">
                    <Button label={`${t.next}: ${t.education}`} onPress={handleNext} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
