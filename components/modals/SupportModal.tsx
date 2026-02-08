import { translations } from '@/constants/translations';
import { useResumeStore } from '@/store/resumeStore';
import { useUIStore } from '@/store/uiStore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Only import mobile ads on native platforms
let RewardedAd: any, RewardedAdEventType: any, TestIds: any;
if (Platform.OS !== 'web') {
    const mobileAds = require('react-native-google-mobile-ads');
    RewardedAd = mobileAds.RewardedAd;
    RewardedAdEventType = mobileAds.RewardedAdEventType;
    TestIds = mobileAds.TestIds;
}

interface SupportModalProps {
    visible: boolean;
    onClose: () => void;
    templateId?: string | null;
}

// Ad Unit ID - Test ID in development, real ID in production
const adUnitId = Platform.OS === 'web' ? '' : (__DEV__
    ? TestIds.REWARDED
    : Platform.select({
        ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx',
        android: 'ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx',
    }) || TestIds.REWARDED);



export const SupportModal = ({ visible, onClose, templateId }: SupportModalProps) => {
    const { selectedLanguage } = useResumeStore();
    const { unlockTemplate } = useUIStore();
    const t = translations[selectedLanguage];

    const [loaded, setLoaded] = useState(false);
    const [rewardedAd, setRewardedAd] = useState<any | null>(null);

    useEffect(() => {
        if (!visible || Platform.OS === 'web') return;

        console.log('📱 Modal opened, creating new ad instance...');
        setLoaded(false);

        // Create a new ad instance for this session
        const ad = RewardedAd.createForAdRequest(adUnitId, {
            requestNonPersonalizedAdsOnly: true,
        });
        setRewardedAd(ad);

        // Subscribe to ad events
        const unsubscribeLoaded = ad.addAdEventListener(
            RewardedAdEventType.LOADED,
            () => {
                console.log('✅ Ad loaded successfully');
                setLoaded(true);
            }
        );

        const unsubscribeEarned = ad.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            (reward: any) => {
                console.log('🎁 Reward earned:', reward);
                if (templateId) {
                    console.log('🔓 Unlocking template:', templateId);
                    unlockTemplate(templateId);
                }
                onClose();
            }
        );

        // Load the ad
        console.log('📡 Loading ad...');
        ad.load();

        // Cleanup on unmount or when modal closes
        return () => {
            console.log('🧹 Cleaning up ad listeners');
            unsubscribeLoaded();
            unsubscribeEarned();
            setLoaded(false);
            setRewardedAd(null);
        };
    }, [visible, templateId]);

    const handleWatch = () => {
        console.log('🔘 Watch button pressed, loaded:', loaded);
        if (loaded && rewardedAd) {
            try {
                console.log('🎬 Calling rewarded.show()...');
                rewardedAd.show();
                console.log('✅ rewarded.show() called successfully');
            } catch (error) {
                console.error('❌ Error calling rewarded.show():', error);
                alert(`Hata: ${error}`);
            }
        } else {
            console.log('⏳ Ad not ready yet');
            alert('Reklam henüz hazır değil. Lütfen birkaç saniye bekleyin.');
        }
    };

    const handleClose = () => {
        console.log('❌ Close button pressed');
        setLoaded(false);
        onClose();
    };

    if (!visible) return null;

    return (
        <View style={styles.overlay} pointerEvents="box-none">
            <View style={styles.backdrop} />
            <View style={styles.container} pointerEvents="auto">
                <View style={styles.header}>
                    <Text style={styles.title}>{t.supportTitle}</Text>
                    <TouchableOpacity
                        onPress={handleClose}
                        style={styles.closeButton}
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    >
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.body}>{t.supportBody}</Text>

                <TouchableOpacity
                    onPress={handleWatch}
                    disabled={!loaded}
                    style={[styles.primaryButton, !loaded && styles.buttonDisabled]}
                    activeOpacity={0.8}
                >
                    {!loaded ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator color="white" size="small" />
                            <Text style={styles.loadingText}>Yükleniyor...</Text>
                        </View>
                    ) : (
                        <Text style={styles.primaryButtonText}>{t.watchAd}</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleClose}
                    style={styles.secondaryButton}
                    activeOpacity={0.8}
                >
                    <Text style={styles.secondaryButtonText}>{t.noThanks}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999999,
        elevation: 999999,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        width: '85%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111',
        flex: 1,
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        fontSize: 20,
        color: '#666',
        fontWeight: 'bold',
    },
    body: {
        fontSize: 15,
        color: '#666',
        lineHeight: 22,
        marginBottom: 24,
    },
    primaryButton: {
        backgroundColor: '#e11d48',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    loadingText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButton: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#666',
        fontSize: 15,
        fontWeight: '600',
    },
});
