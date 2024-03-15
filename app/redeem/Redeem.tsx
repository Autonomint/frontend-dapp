'use client';
import React, { useEffect, useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import Note from '@/components/CustomUI/Note';
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const formSchema = z.object({
    inputCollateral: z.string(),
    collateralAmount: z
        .number()
        .positive({ message: "Value must be positive" })
        .or(z.string())
        .pipe(
            z.coerce
                .number()
                .positive({ message: "Value must be positive" })
                .min(0.02)
        ),
    outputCollateral: z.string(),
});




export default function Redeem() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            inputCollateral: undefined,
            collateralAmount: 0,
            outputCollateral: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
    }

    return (
        <div className="justify-center px-5 py-5 align-middle ">

            <div className='text-3xl text-[#041A50] font-medium dark:text-[#90AFFF] mb-4'>
                Redeem
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full gap-4 ' action="#">
                    <FormField
                        control={form.control}
                        name="inputCollateral"
                        render={() => (
                            <FormItem>
                                <Controller
                                    control={form.control}
                                    name="inputCollateral"
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={(value) => {
                                                if (value === 'amint') {
                                                    form.setValue('outputCollateral', 'usdt');
                                                } else if (value === 'abond') {
                                                    form.setValue('outputCollateral', 'eth');
                                                }
                                                field.onChange(value)

                                            }}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose a Collateral" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Collateral</SelectLabel>
                                                    <SelectItem value="amint">AMINT</SelectItem>
                                                    <SelectItem value="abond">ABOND</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="collateralAmount"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={0.02}
                                        step={0.01}
                                        placeholder="Collateral Amount"
                                        {...field}
                                        value={Boolean(field.value) ? field.value : ""}

                                    ></Input>
                                </FormControl>
                                <FormMessage className="dark:text-[#B43939]" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="outputCollateral"
                        render={() => (
                            <FormItem>
                                <Controller
                                    control={form.control}
                                    name="outputCollateral"
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={(value) => {
                                                if (value === 'usdt') {
                                                    form.setValue('outputCollateral', 'amint');
                                                } else if (value === 'eth') {
                                                    form.setValue('outputCollateral', 'abond');
                                                }
                                                field.onChange(value)
                                            }}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose a Collateral" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Collateral</SelectLabel>
                                                    <SelectItem value="usdt">USDT</SelectItem>
                                                    <SelectItem value="eth">ETH</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Note
                        note="Note: A withdrawal Fee of 2% will be applied."
                    />
                    <Button
                        type="submit"
                        variant={"primary"}
                        className="text-white"
                    >
                        Redeem
                    </Button>
                </form>
            </Form>

        </div>

    )
}
