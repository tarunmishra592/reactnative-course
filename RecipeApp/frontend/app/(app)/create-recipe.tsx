import { useRouter } from "expo-router";
import { Button, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {RecipeFormSchema} from '../../schema/form'
import { useState } from "react";
import Toast from 'react-native-toast-message';

import { CreateRecipeCall } from '../../services/recipe.service'

export default function CreateRecipe(){

    const router = useRouter()

    const { control, handleSubmit, formState:{ errors } } = useForm({
        resolver: zodResolver(RecipeFormSchema),
        defaultValues: { 
            title: '',
            ingredients: [],
            instructions: '',
            imageUrl: ''
        },
        mode: 'onChange'
    })

    const { 
        fields,
        append,
        remove
    } = useFieldArray({ control, name: 'ingredients', shouldUnregister: true })

    const [inputChip, setInputChip] = useState('')


    const tryAppend = async (text: string) => {
        const trimmed = text.trim();
        if (trimmed && !fields.some(f => f.value === trimmed)) {
          append({ value: trimmed });
          setInputChip('');
          
        }
    };

    const onSubmit = async(data: any) => {
        const payload = {
            title: data.title,
            ingredients: fields.map(f => f.value),
            instructions: data.instructions,
            imageUrl: data.imageUrl
        }

        console.log(payload)

        const res = await CreateRecipeCall(payload)

        if(res){
            Toast.show({ type: 'success', text1: 'Created', text2: 'Recipe Created' });
            router.back()
            router.push('/my-recipes')
        }

    }


    return(
        <Animated.View entering={FadeIn.duration(200)} className="flex-1 justify-center bg-black bg-opacity-50">
            <Toast/>
            
            <View className="m-5 p-4 bg-white rounded-lg">
                <SafeAreaView className="flex flex-row justify-between items-center">
                    <Text className="text-lg font-bold">Create Recipe</Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text className="p-8">x</Text>
                    </TouchableOpacity>
                </SafeAreaView>

                <ScrollView className="py-4">
                    <Text className="mt-3 mb-1 font-semibold">Title</Text>
                    <Controller 
                        control={control} 
                        name="title" render={({field: {value, onChange}}) => (
                            <>
                                <TextInput 
                                    placeholder="Please enter title" 
                                    value={value} 
                                    className="border border-red-500 rounded-sm p-2"
                                    onChangeText={onChange}/>
                            </>
                        )}/>

                <Text className="mt-3 mb-1 font-semibold">Ingredients</Text>
                <Controller
                    control={control}
                    name="ingredients"
                    render={() => (
                    <>
                        <View className="flex flex-row flex-wrap items-center">
                        {fields.map((field, i) => (
                            <View key={field.id} className="flex-row bg-[#eeeeee] rounded-[16px] px-2 py-1 m-1">
                            <Text className="mr-4">{field.value}</Text>
                            <TouchableOpacity
                                onPress={async () => {
                                remove(i);
                                }}
                            >
                                <Text className="font-bold">×</Text>
                            </TouchableOpacity>
                            </View>
                        ))}

                        <TextInput
                            placeholder="Add ingredient…"
                            className={`
                                border border-gray-300 rounded p-2
                                w-full mt-1
                                ${errors.ingredients ? 'border-red-500' : ''}
                            `}
                            value={inputChip}
                            onChangeText={text => {
                            setInputChip(text);
                            if (text.endsWith(',')) {
                                tryAppend(text.slice(0, -1));
                            }
                            }}
                            onEndEditing={() => inputChip.trim() && tryAppend(inputChip)}
                            blurOnSubmit={false}
                            returnKeyType="done"
                        />
                        </View>
                        {errors.ingredients && <Text className="mt-1 text-red-500">{errors.ingredients.message}</Text>}
                    </>
                    )}
                />

                <Text className="mt-3 mb-1 font-semibold">Instructions</Text>
                <Controller
                control={control}
                name="instructions"
                render={({ field: { value, onChange } }) => (
                    <>
                    <TextInput
                        placeholder="Instructions"
                        multiline
                        value={value}
                        onChangeText={onChange}
                        className={`
                        border border-gray-300 rounded p-2
                        ${errors.instructions ? 'border-red-500' : ''}
                        h-[100px]
                        `}
                    />
                    {errors.instructions && (
                        <Text className="mt-1 text-red-500">{errors.instructions.message}</Text>
                    )}
                    </>
                )}
                />

                <Text className="mt-3 mb-1 font-semibold">Image URL</Text>
                <Controller
                control={control}
                name="imageUrl"
                render={({ field: { value, onChange } }) => (
                    <>
                    <TextInput
                        placeholder="Image URL"
                        value={value}
                        onChangeText={onChange}
                        className={`
                        border border-gray-300 rounded p-2
                        ${errors.imageUrl ? 'border-red-500' : ''}
                        `}
                    />
                    {errors.imageUrl && (
                        <Text className="mt-1 text-red-500">{errors.imageUrl.message}</Text>
                    )}
                    </>
                )}
                />

                <Button title="Submit Recipe" onPress={handleSubmit(onSubmit)} />
                </ScrollView>
            </View>

        </Animated.View>
    )
}