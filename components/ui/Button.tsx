import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends TouchableOpacityProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    label: string;
    loading?: boolean;
    icon?: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    label,
    loading,
    className,
    disabled,
    icon,
    ...props
}: ButtonProps) {

    const baseStyles = "flex-row items-center justify-center rounded-xl font-medium";

    const variants = {
        primary: "bg-blue-600 active:bg-blue-700",
        secondary: "bg-gray-100 active:bg-gray-200",
        outline: "border-2 border-blue-600 bg-transparent active:bg-blue-50",
        ghost: "bg-transparent active:bg-gray-100",
    };

    const textVariants = {
        primary: "text-white",
        secondary: "text-gray-900",
        outline: "text-blue-600",
        ghost: "text-gray-700",
    };

    const sizes = {
        sm: "px-4 py-2",
        md: "px-6 py-3",
        lg: "px-8 py-4",
    };

    const textSizes = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
    };

    return (
        <TouchableOpacity
            className={twMerge(
                baseStyles,
                variants[variant],
                sizes[size],
                disabled && "opacity-50",
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? 'white' : '#2563eb'} />
            ) : (
                <>
                    {icon && <View className="mr-2">{icon}</View>}
                    <Text className={twMerge("font-semibold", textVariants[variant], textSizes[size])}>
                        {label}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}
