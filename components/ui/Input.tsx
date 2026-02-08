import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerClassName?: string;
}

export function Input({
    label,
    error,
    containerClassName,
    className,
    ...props
}: InputProps) {
    return (
        <View className={twMerge("mb-4", containerClassName)}>
            {label && (
                <Text className="text-gray-700 font-medium mb-1.5 ml-1">
                    {label}
                </Text>
            )}
            <TextInput
                className={twMerge(
                    "bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-xl px-4 py-3",
                    "focus:border-blue-500 focus:bg-white",
                    error && "border-red-500",
                    className
                )}
                placeholderTextColor="#9ca3af"
                {...props}
            />
            {error && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                    {error}
                </Text>
            )}
        </View>
    );
}
