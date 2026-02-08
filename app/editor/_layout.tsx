import { Stack } from 'expo-router';

export default function EditorLayout() {
    return (
        <Stack
            screenOptions={{
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerBackTitleVisible: false,
                headerTintColor: '#2563eb',
                contentStyle: { backgroundColor: '#fff' },
            }}
        >
            <Stack.Screen
                name="personal"
                options={{ title: 'Kişisel Bilgiler' }}
            />
            <Stack.Screen
                name="education"
                options={{ title: 'Eğitim Bilgileri' }}
            />
            <Stack.Screen
                name="education-form"
                options={{ title: 'Eğitim', presentation: 'modal' }}
            />
            <Stack.Screen
                name="experience"
                options={{ title: 'İş Deneyimi' }}
            />
            <Stack.Screen
                name="experience-form"
                options={{ title: 'Deneyim', presentation: 'modal' }}
            />
            <Stack.Screen
                name="skills"
                options={{ title: 'Yetenekler' }}
            />
            <Stack.Screen
                name="languages"
                options={{ title: 'Diller' }}
            />
            <Stack.Screen
                name="references"
                options={{ title: 'Referanslar' }}
            />
        </Stack>
    );
}
